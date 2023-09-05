require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3737;
const mongoURL = process.env.MONGO_URL;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log("App started on port:", port);
});

app.get('/getCountries', async (req, res) => {
    try {
        const countryData = await getAllCountries();
        res.json(countryData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

async function getAllCountries() {
    const mongoClient = new MongoClient(mongoURL);

    try {
        await mongoClient.connect();
        const db = mongoClient.db("ski-jump-coach");
        const countriesCollection = db.collection("countries");

        const documents = await countriesCollection.find({}).toArray();
        return documents;
    } finally {
        await mongoClient.close();
    }
}

app.post('/getFlag', async (req, res) => {
    const mongoClient = new MongoClient(mongoURL);

    try {
        await mongoClient.connect();
        const db = mongoClient.db("ski-jump-coach");
        const countriesCollection = db.collection("countries");

        const query = { country: req.body.query };
        const country = await countriesCollection.findOne(query);
        res.json(country);
    } catch(err) {
        console.log("Error: ", err);
    } finally {
        await mongoClient.close();
    }
});

app.post('/getStaff', async (req, res) => {
    const mongoClient = new MongoClient(mongoURL);

    try {
        await mongoClient.connect();
        const db = mongoClient.db('ski-jump-coach');
        const countriesDataCollection = db.collection('countries-data');

        const query = { country: req.body.country };
        const data = await countriesDataCollection.findOne(query);
        res.json(data);
    } catch(err) {
        console.log("Error:", err);
    } finally {
        await mongoClient.close();
    }
});

app.post('/getCompetitors', async (req, res) => {
    const mongoClient = new MongoClient(mongoURL);

    try {
        const clusterConnect = `${req.body.country}-ski-jumpers`;
        await mongoClient.connect();
        const db = mongoClient.db('ski-jump-coach');
        const skiJumpersCollection = db.collection(clusterConnect);

        const documents = await skiJumpersCollection.find({}).toArray(); 
        res.json(documents);
    } catch(err) {
        console.log("An error occurred:", err);
    } finally {
        mongoClient.close();
    }
});

app.post('/sendCompetitorToTraining', async (req, res) => {
    const mongoClient = new MongoClient(mongoURL);
    
    try {
        let clusterConnect = `${req.body.country}-ski-jumpers`;
        await mongoClient.connect();
        const db = mongoClient.db('ski-jump-coach');
        const skiJumpersCollection = db.collection(clusterConnect);

        let query = { name: req.body.name, surname: req.body.surname };
        const options = { upsert: true };
        const skiJumper = await skiJumpersCollection.findOne(query);
        
        if(skiJumper.jumps < 3) {
            let newExperience = skiJumper.experience + req.body.experience;
            let newSkill = skiJumper.skill;
    
            if (newExperience > 500) {
                newSkill++;
                newExperience -= 500;
            }
    
            const doc = {
                $set: {
                    experience: newExperience,
                    skill: newSkill,
                    jumps: skiJumper.jumps + 1
                }
            }
    
            let result = await skiJumpersCollection.updateOne(query, doc, options);
            console.log("Document updated!", result.matchedCount);
    
            clusterConnect = `${req.body.country}-budget`;
            const budgetCollection = db.collection(clusterConnect);
    
            query = { type: 'accBalance' };
            const budget = await budgetCollection.findOne(query)
    
            const newBudget = {
                $set: {
                    accBalance: budget.accBalance - 1000
                }
            }
    
            const transition = {
                type: 'expenditure',
                sum: 1000,
                desc: `trening (${skiJumper.name} ${skiJumper.surname})`
            }
    
            result = await budgetCollection.updateOne(query, newBudget, options);
            result = await budgetCollection.insertOne(transition);
            console.log("Zmieniono!");
        }
        else {
            console.log("Zawodnik osiągnął już dzienny limit skoków!")
        }
        
    } catch(err) {
        console.log("Error: ", err);
    } finally {
        mongoClient.close();
    }
});

app.post('/sendCompetitorToCamp', async (req, res) => {
    const mongoClient = new MongoClient(mongoURL);

    try {
        let clusterConnect = `${req.body.country}-ski-jumpers`;
        await mongoClient.connect();
        const db = mongoClient.db('ski-jump-coach');
        const skiJumpersCollection = db.collection(clusterConnect);

        let query = { name: req.body.name, surname: req.body.surname };
        const options = { upsert: true };
        const skiJumper = await skiJumpersCollection.findOne(query);
        
        let newExperience = skiJumper.experience + req.body.experience;
        let newSkill = skiJumper.skill;

        while (newExperience > 500) {
            newExperience -= 500;
            newSkill++;
        }

        const date = generateDate(true);
        let doc = {
            $set: {
                experience: newExperience,
                skill: newSkill,
                status: `7 DNI PRZERWY (${req.body.place})`,
                endOfStatus: date
            }
        }

        let result = await skiJumpersCollection.updateOne(query, doc, options);

        query = { type: 'accBalance' }
        clusterConnect = `${req.body.country}-budget`;
        const budgetCountry = db.collection(clusterConnect);
        const budget = await budgetCountry.findOne(query);

        let cost = null;
        if(req.body.place == 'Szczyrk')
            cost = 24000;
        else if(req.body.place == 'Planica')
            cost = 29000;
        else if(req.body.place == 'Hinterzarten')
            cost = 26000;
        
        doc = {
            $set: {
                accBalance: budget.accBalance - cost
            }
        }
        
        result = await budgetCountry.updateOne(query, doc, options)

        const transition = {
            type: 'expenditure',
            sum: cost,
            desc: `obóz treningowy (${skiJumper.name} ${skiJumper.surname})`
        }

        result = await budgetCountry.insertOne(transition);

        console.log("Document updated!", result.matchedCount);
    } catch(err) {
        console.log("Error: ", err);
    } finally {
        mongoClient.close();
    }
});

app.post('/reportCompetitor', async (req, res) => {
    const mongoClient = new MongoClient(mongoURL);

    try {
        await mongoClient.connect();
        const db = mongoClient.db('ski-jump-coach');
        const reportedCompetitorsCollection = db.collection('reported-competitors');
        
        const doc = {
            name: req.body.name,
            surname: req.body.surname,
            skill: req.body.skill,
            country: req.body.country
        };

        const result = await reportedCompetitorsCollection.insertOne(doc);
        console.log("Competitor has been reported!", result.insertedId);

        const clusterConnect = `${req.body.country}-ski-jumpers`;
        const skiJumpersCollection = db.collection(clusterConnect);
        const query = { name: req.body.name, surname: req.body.surname };
        const options = { upsert: true };

        const updateDoc = {
            $set: {
                status: "WORLD CUP (LILLEHAMMER)",
                endOfStatus: "9/18/2023"
            }
        }

        const updatedDoc = await skiJumpersCollection.updateOne(query, updateDoc, options);
        console.log("Competitor data has been updated!", updatedDoc.matchedCount);
    } catch(err) {
        console.log("Error: ", err);
    } finally {
        await mongoClient.close();
    }
});

async function checkStatus() {
    const mongoClient = new MongoClient(mongoURL);

    try {
        await mongoClient.connect();
        const db = mongoClient.db('ski-jump-coach');
        const countries = ["Austria", "Bułgaria", "Czechy", "Finlandia", "Japonia", "Kanada", "Kazachstan", "Niemcy", "Norwegia", "Polska", "Słowenia", "Turcja", "Włochy"];

        for (let i = 0; i < countries.length; i++) {
            const clusterConnect = `${countries[i]}-ski-jumpers`;
            const skiJumpersCollection = db.collection(clusterConnect);
            const documents = await skiJumpersCollection.find({}).toArray();
            const todayDate = generateDate();

            documents.forEach(document => {
                if (todayDate === document.endOfStatus)
                    resetStatus(countries[i], document.name, document.surname);
            });
        }
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        mongoClient.close();
    }
}


function generateDate(camp) {
    const today = new Date();
    const futureDate = new Date(today);
    
    if(camp)
        futureDate.setDate(today.getDate() + 6);
    else
        futureDate.setDate(today.getDate());

    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = futureDate.toLocaleDateString('en-US', options);

    return formattedDate;
}

async function resetStatus(country, name, surname) {
    const mongoClient = new MongoClient(mongoURL);
    
    try {
        await mongoClient.connect();
        const db = mongoClient.db('ski-jump-coach');
        const clusterConnect = `${country}-ski-jumpers`;
        const skiJumpersCollection = db.collection(clusterConnect);

        const query = { name: name, surname: surname };
        const options = { upsert: true };
        const doc = {
            $set: {
                status: 'brak',
                endOfStatus: 'brak'
            }
        }

        const result = await skiJumpersCollection.updateOne(query, doc, options);
        console.log("Document updated!", result.matchedCount);
    } catch(err) {
        console.log("Error: ", err);
    } finally {
        await mongoClient.close();
    }
}

app.post('/getBudget', async (req, res) => {
    const mongoClient = new MongoClient(mongoURL);

    try {
        await mongoClient.connect();
        const db = mongoClient.db('ski-jump-coach');
        const clusterConnect = `${req.body.country}-budget`;
        const budgetCollection = db.collection(clusterConnect);

        const documents = await budgetCollection.find({}).toArray();
        res.json(documents);
    }
    catch(err) {
        console.log(err);
    }
    finally {
        mongoClient.close();
    }
})

async function resetJumps() {
    const data = new Date();
    const hour = data.getHours();

    const countries = ["Austria", "Bułgaria", "Czechy", "Finlandia", "Japonia", "Kanada", "Kazachstan", "Niemcy", "Norwegia", "Polska", "Słowenia", "Turcja", "Włochy"];

    const mongoClient = new MongoClient(mongoURL);

    try {
        await mongoClient.connect();
        const db = mongoClient.db('ski-jump-coach');
        for(let i = 0; i < countries.length; i++) {
            const clusterConnect = `${countries[i]}-ski-jumpers`;
            const skiJumpers = db.collection(clusterConnect);
            const documents = await skiJumpers.find({}).toArray();
            if(hour == 0) {
                documents.forEach(document => {
                    const query = { name: document.name, surname: document.surname };
                    const options = { upsert: true };
                    const doc = {
                        $set: {
                            jumps: 0
                        }
                    }
                    const result = skiJumpers.updateOne(query, doc, options);
                    console.log('zmieniono', result.matchedCount)
                });
            }
        }
    }
    catch(err) {
        console.log("BŁAD: ", err )
    }
    finally {
        mongoClient.close();
    }
}

setInterval(resetJumps, 60000);
setInterval(checkStatus, 60000);

app.post('/getHills', async (req, res) => {
    const mongoClient = new MongoClient(mongoURL)

    try {
        await mongoClient.connect();
        const db = mongoClient.db('ski-jump-coach')
        const clusterConnect = `${req.body.country}-hills`
        const hills = db.collection(clusterConnect);
        const documents = await hills.find({}).toArray();
        res.json(documents)
    }
    catch(err) {
        console.log("BŁAD: ", err)
    }
})

app.post('/getResults', async (req, res) => {
    const connectString = `${req.body.party}${req.body.place}${req.body.number}${req.body.year}`;
    console.log(connectString)

    const mongoClient = new MongoClient(mongoURL)

    try {
        await mongoClient.connect();
        const db = mongoClient.db('ski-jump-coach');
        const results = db.collection('competitions-results');
        const query = { date: req.body.date };
        const result = await results.findOne(query);

        res.json(result);
    }
    catch(err) {
        console.log(err);
    }
    finally {
        await mongoClient.close();
    }
})