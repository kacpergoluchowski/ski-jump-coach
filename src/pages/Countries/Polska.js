import React, { useEffect, useState }  from "react";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";
import CountryChangeNavbar from "../../components/CountryNavbar";
import Footer from "../../components/Footer";
import Staff from "../../components/Staff";
import Competitors from "../../components/Competitors";
import HillTraining from "../../components/HillTraining";
import Camps from "../../components/Camps";
import Loader from "../../components/Loader";

const Polska = (props) => {
    const [countriesData, setCountriesData] = useState(null);
    const [staffData, setStaffData] = useState(null);
    const [changeSectDisplay, setChangeSectDisplay] = useState(true);
    const [staffSectDisplay, setStaffSectDisplay] = useState(false);
    const [competitorsSectDisplay, setCompetitorsSectDisplay] = useState(false);
    const [competitorsData, setCompetitorsData] = useState(null);
    const [trainingSectDisplay, setTrainingSectDisplay] = useState(false);
    const [hillTrainingSectDisplay, setHillTrainingSectDisplay] = useState(false);
    const [campSectDisplay, setCampSectDisplay] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}getFlag`, {
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
        async function fetchData() {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}getStaff`, {
                    method: "POST",
                    body: JSON.stringify({ country: props.country }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if(response.ok) {
                    const data = await response.json();
                    setStaffData(data);
                }
                else 
                    console.log("Nie udało sie pobrać danych: ", response.status);
            }
            catch(err) {
                console.log("Wystąpił błąd: ", err);
            }
        }

        fetchData();
    }, [staffSectDisplay])

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
                            <button onClick={() => {setChangeSectDisplay(false); setStaffSectDisplay(true)}}> SZTAB </button>
                            <button onClick={() => {setChangeSectDisplay(false); setCompetitorsSectDisplay(true)}}> ZAWODNICY </button>
                            <button> SKOCZNIE </button>
                            <button onClick={() => {setChangeSectDisplay(false); setTrainingSectDisplay(true)}}> TRENING </button>
                        </div>
                    )}
                    { staffSectDisplay && (
                        <Staff data = {staffData}/>
                    )}
                    { competitorsSectDisplay && (
                        <Competitors data = {competitorsData}/>
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

export default Polska;