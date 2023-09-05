import React, { useEffect, useState }  from "react";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Budget from "../../components/Budget";
import Competitors from "../../components/Competitors";
import HillTraining from "../../components/HillTraining";
import Camps from "../../components/Camps";
import Loader from "../../components/Loader";


const Turcja = (props) => {
    const [countriesData, setCountriesData] = useState(null);
    const [staffData, setStaffData] = useState(null);
    const [changeSectDisplay, setChangeSectDisplay] = useState(true);
    const [budgetSectDisplay, setBudgetSectDisplay] = useState(false);
    const [budgetData, setBudgetData] = useState(null);
    const [competitorsSectDisplay, setCompetitorsSectDisplay] = useState(false);
    const [competitorsData, setCompetitorsData] = useState(null);
    const [trainingSectDisplay, setTrainingSectDisplay] = useState(false);
    const [hillTrainingSectDisplay, setHillTrainingSectDisplay] = useState(false);
    const [campSectDisplay, setCampSectDisplay] = useState(false);
    const [hillsSectDisplay, setHillsSectDisplay] = useState(false);
    const [hillsData, setHillsData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://127.0.0.1:3737/getFlag`, {
                    method: "POST",
                    body: JSON.stringify({ query: props.country }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json(); 
                    setCountriesData(data); 
                } else {
                    console.error("Nie udało się pobrać danych:", response.status);
                }
            } catch (error) {
                console.error("Wystąpił błąd:", error);
            }
        }

        fetchData();
    }, [props.country]); 

    useEffect(() => {
        async function getBudget() {
            const response = await fetch('http://127.0.0.1:3737/getBudget', {
                method: "POST",
                body: JSON.stringify({ country: props.country }),
                headers: {
                    "Content-type": "application/json"
                }
            }) 
            
            if(response.ok) {
                const data = await response.json();
                setBudgetData(data);
            }
        }

        getBudget();
    }, [budgetSectDisplay])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}getCompetitors`, {
                    method: "POST",
                    body: JSON.stringify({ country: props.country }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if(response.ok) {
                    const data = await response.json();
                    setCompetitorsData(data);
                }
                else
                    console.log("Nie udało się pobrać danych: ", response.status);
            }
            catch(err) {
                console.log("Wystąpił błąd: ", err);
            }
        }

        fetchData();
    }, [competitorsSectDisplay])

    useEffect(() => {
        async function fetchHills() {
            const response = await fetch('http://127.0.0.1:3737/getHills', {
                method: "POST",
                body: JSON.stringify({country: props.country}),
                headers: {
                    "Content-type":'application/json'
                }
            })

            if(response.ok) {
                const data = await response.json();
                setHillsData(data);
            }
        }

        fetchHills();
    }, [hillsSectDisplay])

    useEffect(() => {
        console.log(hillsData)
    }, [hillsData])

    if(!countriesData) 
        return <Loader/>
        
    return (
        <div>
            {countriesData && (
                <div>
                    <Navbar navClassName = 'navbar country-navbar'/>
                    <Hero heroClassName = 'country-hero' image = {countriesData.flag} country = {countriesData.country}/>
                    { changeSectDisplay && (
                        <div className="country-change-navbar">
                            <button onClick={() => {setChangeSectDisplay(false); setBudgetSectDisplay(true)}}> FINANSE </button>
                            <button onClick={() => {setChangeSectDisplay(false); setCompetitorsSectDisplay(true)}}> ZAWODNICY </button>
                            <button onClick={() => {setChangeSectDisplay(false); setHillsSectDisplay(true)}}> SKOCZNIE </button>
                            <button onClick={() => {setChangeSectDisplay(false); setTrainingSectDisplay(true)}}> TRENING </button>
                        </div>
                    )}
                    { budgetSectDisplay && (
                        <Budget data = {budgetData}/>
                    )}
                    { competitorsSectDisplay && (
                        <Competitors data = {competitorsData}/>
                    )}
                    { hillsSectDisplay && (
                        <div className="hills-section">
                        {
                            hillsData.map(item => {return <HillCard image = {item.image} name = {item.name} pointK = {item.pointK} pointHS = {item.pointHS} record = {item.record} owner = {item.owner} igliite = {item.igliite}/>})
                        }
                        </div>
                    )}
                    { trainingSectDisplay && (
                        <div className="training-section">
                            <div className="ski-jumping-training" onClick={() => {setTrainingSectDisplay(false); setHillTrainingSectDisplay(true)}}> </div>
                            <div className="training-camp" onClick={() => {setTrainingSectDisplay(false); setCampSectDisplay(true)}}> </div>
                        </div>
                    )}
                    { hillTrainingSectDisplay && (
                        <HillTraining data = {competitorsData} country = {props.country}/>
                    )}
                    { campSectDisplay && (
                        <Camps country = {props.country}/>
                    )
                    }

                    <Footer footerClassName = 'country-change-footer'/>
                </div>
            )}
        </div>
    )
}

function HillCard(props) {
    return (
        <div className="hill-card">
            <img src = {props.image}/>
            <div className="hill-info">
                <h1> {props.name} </h1>
                <h2> PUNKT K: {props.pointK} </h2>
                <h2> PUNKT HS: {props.pointHS} </h2>
                <h2> REKORD: {props.record} ({props.owner})</h2>
                <h2> IGIELIT: {props.igliite} </h2>
                <button> MODERNIZUJ </button>
            </div>
        </div>
    )
}

export default Turcja;