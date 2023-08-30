require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const url = process.env.MONGO_URL;
const bp = require('body-parser');

const app = express();
const port = 3737;

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

app.listen(port, () => {
    console.log("App started!");
});

app.get('/getCountries', async (req, res) => {
    try {
        const data = await showAllCountries();
        console.log(data);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

async function showAllCountries() {
    const client = new MongoClient(url); 

    try {
        await client.connect(); 
        const database = client.db("ski-jump-coach");
        const countries = database.collection("countries");

        const documents = await countries.find({}).toArray(); 
        return documents;

    } finally {
        await client.close(); 
    }
}

app.post('/getFlag', async (req, res) => {
    const client = new MongoClient(url);

    try {
        await client.connect();
        const database = client.db("ski-jump-coach");
        const countries = database.collection("countries");

        const query = { country: req.body.query};
        const country = await countries.findOne(query);
        res.json(country);
    }
    catch(err) {
        console.log("Błąd: ", err);
    }
    finally {
        await client.close();
    }
})

showAllCountries().catch(console.dir);

app.post('/getStaff', async (req, res) => {
    const client = new MongoClient(url);

    try {
        await client.connect();
        const database = client.db('ski-jump-coach');
        const countriesData = database.collection('countries-data');

        const query = { country: req.body.country };
        const data = await countriesData.findOne(query);
        res.json(data);
    }
    catch(err) {
        console.log("Błąd", err)
}})

app.post('/getCompetitors', async (req, res) => {
    const client = new MongoClient(url);

    try {
        const clusterConnect = `${req.body.country}-ski-jumpers`
        await client.connect();
        const database = client.db('ski-jump-coach');
        const skiJumpers = database.collection(clusterConnect);
        
        const documents = await skiJumpers.find({}).toArray(); 
        res.json(documents);
    }
    catch(err) {
        console.log("Wystąpił błąd: ", err);
    }
    finally {
        client.close();
    }
})

app.post('/sendCompetitorToTraining', async (req, res) => {
    const client = new MongoClient(url);
    try {
        const clusterConnect = `${req.body.country}-ski-jumpers`;

        const database = client.db('ski-jump-coach')
        const skiJumpers = database.collection(clusterConnect)
    
        const query = { name: req.body.name, surname: req.body.surname };
        const options = { upsert: true };
        const skiJumper = await skiJumpers.findOne(query);
        
        let newExperience = skiJumper.experience + req.body.experience;
        if(newExperience>500) {
            var newSkill = skiJumper.skill + 1;
            newExperience = newExperience - 500;
        }
        else   
            var newSkill = skiJumper.skill;

        const doc = {
            $set: {
                experience: newExperience,
                skill: newSkill
            }
        }

        const result = await skiJumpers.updateOne(query, doc, options)
        console.log("Dokument zeedytowany!", result.matchedCount);
    }
    catch(err) {
        console.log("Błąd: ", err);
    }
    finally {
        client.close();
    }
    
})

app.post('/sendCompetitorToCamp', async (req, res) => {
    const client = new MongoClient(url);
    try {
        const clusterConnect = `${req.body.country}-ski-jumpers`;

        const database = client.db('ski-jump-coach');
        const skiJumpers = database.collection(clusterConnect);
        const query = {name: req.body.name, surname: req.body.surname};
        const options = { upsert: true };
        const skiJumper = await skiJumpers.findOne(query);
        let newExperience = skiJumper.experience = req.body.experience;
        let newSkill = skiJumper.skill;
        while(newExperience>500) {
            newExperience = newExperience - 500;
            newSkill +=1;
        }
        const doc = {
            $set: {
                experience: newExperience,
                skill: newSkill,
                status: `7 DNI PRZERWY (${req.body.place})`,
                endOfStatus: req.body.date
            }
        }

        const result = await skiJumpers.updateOne(query, doc, options)
        console.log("Dokument zeedytowany!", result.matchedCount);
    }
    catch(err) {
        console.log("BLAD: ", err);
    }
    finally {
        client.close();
    }
})

app.post('/reportCompetitor', async (req, res) => {
    const client = new MongoClient(url);
    try {
        const database = client.db('ski-jump-coach');
        const reportedCompetitors = database.collection('reported-competitors');
        const doc = {
            name: req.body.name,
            surname: req.body.surname,
            skill: req.body.skill,
            country: req.body.country
        }
        const result = await reportedCompetitors.insertOne(doc);

        console.log("ZAWODNIK ZOSTAŁ ZGŁOSZONY!", result.insertedId);

        const clusterConnect = `${req.body.country}-ski-jumpers`
        const skiJumpers = database.collection(clusterConnect);
        const query = { name: req.body.name, surname: req.body.surname };
        const options = { upsert: true };

        const updateDoc = {
            $set: {
                status: "PUCHAR ŚWIATA (KUUSAMO)",
                endOfStatus: "30.08.2023"
            }
        }

        const updatedDoc = await skiJumpers.updateOne(query, updateDoc, options);

        console.log("DANE ZAWODNIKA ZOSTAŁY ZAAKTUALIZOWANE!", updatedDoc.matchedCount);
    }
    catch(err) {
        console.log("BŁAD: ", err);
    }
    finally {
        await client.close();
    }
   
})

async function checkStatus() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const database = client.db('ski-jump-coach');
        const countries = ["Austria", "Bułgaria"];

        for (let i = 0; i < countries.length; i++) {
            const clusterConnect = `${countries[i]}-ski-jumpers`;
            const skiJumpers = database.collection(clusterConnect);
            const documents = await skiJumpers.find({}).toArray();
            const todayDate = generateDate();
            documents.forEach(document => {
                if(todayDate==document.endOfStatus) 
                    resetStatus(countries[i], document.name, document.surname)
                else
                    console.log("STATUS JEST AKTUALNY")
            });
        }
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    } finally {
        client.close();
    }
}

setInterval(checkStatus, 60000);

function generateDate() {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate());

    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = futureDate.toLocaleDateString('pl-PL', options);

    return formattedDate;
}

async function resetStatus(country, name, surname) {
    const client = new MongoClient(url);
    await client.connect();
    try {
        const clusterConnect = `${country}-ski-jumpers`;

        const database = client.db('ski-jump-coach');
        const skiJumpers = database.collection(clusterConnect);
        const query = {name: name, surname: surname};
        const options = { upsert: true };
        const skiJumper = await skiJumpers.findOne(query);
        const doc = {
            $set: {
                status: 'brak',
                endOfStatus: 'brak'
            }
        }

        const result = await skiJumpers.updateOne(query, doc, options)
        console.log("Dokument zeedytowany!", result.matchedCount);
    }
    catch(err) {
        console.log("BLAD: ", err);
    }
    finally {
        client.close();
    }
}