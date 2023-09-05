import React, { useEffect, useState, useRef } from "react";
import '../index.css';
import Loader from "./Loader";
import Person from '../images/man (9).png'
import Kuusamo1Results from '../images/results/Zrzut ekranu (151).png'
import Kuusamo2Results from '../images/results/Zrzut ekranu (155).png'
import KuusamoImage from '../images/kuusamo.jpg'
import LillehammerImage from '../images/lillehammer.jpg'

export default function SportsEvents() {
    const [sportEventsDisplay, setSportEventsDisplay] = useState(true);
    const [worldCupDisplay, setWorldCupDisplay] = useState(false);
    const [reportCompetitorsSectDisplay, setReportCompetitorsSectDisplay] = useState(false);
    const [KuusamoCompetitonsDisplay1, setKuusamoCompetitionsDisplay1] = useState(false)
    const [KuusamoCompetitonsDisplay2, setKuusamoCompetitionsDisplay2] = useState(false);

    const stateFunction = [setKuusamoCompetitionsDisplay1, setKuusamoCompetitionsDisplay2, setWorldCupDisplay, setReportCompetitorsSectDisplay]

    return (
        <div>
            { worldCupDisplay && (
                <WorldCup data = {stateFunction}/>
            )}
            { reportCompetitorsSectDisplay && (
                <ReportCompetitors place = "Kuusamo"/>
            )}
            { KuusamoCompetitonsDisplay1 && (
                <ResultCompetitons place = "Kuusamo" number = '1' index = '0'/>
            )}
            { KuusamoCompetitonsDisplay2 && (
                <ResultCompetitons place = "Kuusamo" number = '2' index = '1'/>
            )}
            { sportEventsDisplay && (
                <div className="sports-events">
                    <div className="world-cup-section" onClick={() => {setSportEventsDisplay(false); setWorldCupDisplay(true)}}>
                        <div className="season-info">
                            <h1> TURNIEJ TESTOWY </h1>
                            <h3> 3  / 8  (LILLEHAMMER HS98) </h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
    )
}

function showCompetitions(wordCupDisplay, cardDisplay) {
    wordCupDisplay(false);
    cardDisplay(true)
}

function WorldCup(props) {
    return (
        <div className="world-cup-competitions">
            <div className="competition-card">
                <div className="event-info">
                    <h1> KUUSAMO HS142 (1  /  8) </h1>
                    <img src = {KuusamoImage}/>
                    <button onClick={() => showCompetitions(props.data[2], props.data[0])}> ZOBACZ WYNIKI </button>
                </div>
            </div>
            <div className="competition-card">
                <div className="event-info">
                    <h1> KUUSAMO HS142 (2  /  8) </h1>
                    <img src = {KuusamoImage}/> 
                    <button onClick={() => showCompetitions(props.data[2], props.data[1])}> ZOBACZ WYNIKI </button>
                </div>
            </div>
            <div className="competition-card">
                <div className="event-info">
                    <h1> LILLEAHAMMER HS98 (3  /  8), (4  /  8) </h1>
                    <img src = {LillehammerImage}/>
                    <button onClick={() => showCompetitions(props.data[2], props.data[3])}> ZGŁOŚ ZAWODNIKÓW </button>
                </div>
            </div>
        </div>
    )
}

function ReportCompetitors() {
    const markCountry = useRef(0);
    const [competitorsData, setCompetitorsData] = useState(null)
    const [loaderDisplay, setLoaderDisplay] = useState(false);

    async function fetchData(country) {
        try {
            setLoaderDisplay(true);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}getCompetitors`, {
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
                    <option> Czechy </option> 
                    <option> Finlandia </option> 
                    <option> Japonia </option> 
                    <option> Kanada </option> 
                    <option> Kazachstan </option> 
                    <option> Niemcy </option> 
                    <option> Norwegia </option> 
                    <option> Polska </option> 
                    <option> Słowenia </option>
                    <option> Turcja </option>
                    <option> Włochy </option>
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
        await fetch(`${process.env.REACT_APP_BACKEND_URL}reportCompetitor`, {
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

function ResultCompetitons(props) {
    const results = [Kuusamo1Results, Kuusamo2Results];
    return (
        <img src = {results[props.index]} className="results"/>
    )
}