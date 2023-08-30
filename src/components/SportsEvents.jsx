import React, { useEffect, useState, useRef } from "react";
import '../index.css';
import Loader from "./Loader";
import Person from '../images/man (9).png'

export default function SportsEvents() {
    const [sportEventsDisplay, setSportEventsDisplay] = useState(true);
    const [worldCupDisplay, setWorldCupDisplay] = useState(false);
    const [reportCompetitorsSectDisplay, setReportCompetitorsSectDisplay] = useState(false);

    return (
        <div>
            { sportEventsDisplay && (
                <div className="sports-events">
                    <div className="world-cup-section" onClick={() => {setSportEventsDisplay(false); setWorldCupDisplay(true)}}>
                        <div className="event-info">
                            <h1> PUCHAR ŚWIATA </h1>
                            <h3> 1  / 38  (KUUSAMO HS142) </h3>
                        </div>
                    </div>
                    <div className="continental-cup-section">
                        <div className="event-info">
                            <h1> PUCHAR KONTYNENTALNY </h1>
                            <h3> 1  / 28  (LILLEHAMMER HS140) </h3>
                        </div>
                    </div>
                    <div className="fis-cup-section">
                        <div className="event-info">
                            <h1> FIS CUP </h1>
                            <h3> 1  / 20  (SZCZYRK HS104) </h3>
                        </div>
                    </div>
                </div>
            )}
            { worldCupDisplay && (
                <WorldCup WCState = {setWorldCupDisplay} RCState = {setReportCompetitorsSectDisplay}/>
            )}
            { reportCompetitorsSectDisplay && (
                <ReportCompetitors place = "Kuusamo"/>
            )}
        </div>
        
    )
}

function WorldCup(props) {
    return (
        <div className="world-cup-competitions">
            <div className="next-competition">
                <div className="event-info">
                    <h1> KUUSAMO HS142 (1  /  38) </h1>
                    <button onClick={() => {props.WCState(false); props.RCState(true)}}> ZGŁOŚ ZAWODNIKÓW </button>
                </div>
            </div>
        </div>
    )
}

function ReportCompetitors(props) {
    const markCountry = useRef(0);

    const [competitorsData, setCompetitorsData] = useState(null)
    const [loaderDisplay, setLoaderDisplay] = useState(false);

    async function fetchData(country) {
        try {
            setLoaderDisplay(true);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getCompetitors`, {
                method: "POST",
                body: JSON.stringify({ country: country }),
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
        finally {
            setLoaderDisplay(false);
        }
    }

    return (
        <div className="reporting-competitors-section">
            <div>
                <select ref={markCountry} >
                    <option> Austria </option>
                    <option> Bułgaria </option>
                    <option> Polska </option>
                </select>
                <button onClick={() => {fetchData(markCountry.current.value)}}> WYŚWIETL ZAWODNIKÓW </button>
            </div>
            {loaderDisplay && (
                <Loader/>
            )}
            {competitorsData && (
                <Competitors data = {competitorsData} country = {markCountry.current.value}/>
            )}
        </div>
    )   
}

function Competitors(props) {
    async function reportCompetitor(name, surname, skill, country) {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/reportCompetitor`, {
            method: "POST",
            body: JSON.stringify({name: name, surname: surname, country: country, skill: skill}),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    return (
        <div className="competitors"> 
        {
            props.data.map(item => {
                return (
                    <div className="competitor-card">
                        <img src = {Person}/>
                        <div>
                            <h1> {item.name} {item.surname} </h1>
                            <h3> WIEK: {item.age} </h3>
                            <h3> UMIEJĘTNOŚCI: {item.skill} </h3>
                            <h3> STATUS: {item.status} </h3>
                            <h3> KONIEC STATUSU: {item.endOfStatus} </h3>
                            {item.status == 'brak' && (
                                <button onClick={() => reportCompetitor(item.name, item.surname, item.skill, props.country)}> ZGŁOŚ {item.name} {item.surname} </button>
                            )}
                        </div>
                    </div>
                )
            })
        }
        </div>
    )
}