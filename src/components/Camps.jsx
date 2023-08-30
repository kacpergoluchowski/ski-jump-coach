import React, { useEffect, useState } from "react";
import '../index.css';
import Person from '../images/man (9).png'
import HillTraining from "./HillTraining";
import tick from '../images/tick.png'
import Loader from "./Loader";

export default function Camps(props) {
    const [campsDisplay, setCampsDisplay] = useState(true);
    const [szczyrkCampDisplay, setSzczyrkCampDisplay] = useState(false);
    const [planicaCampDisplay, setPlanicaCampDisplay] = useState(false);
    const [hinterzartenCampDisplay, setHinterzartenCampDisplay] = useState(false);

    return (
        <div className="camp-section">
            {campsDisplay && (
                <div className="szczyrk-camp" onClick={() => {setCampsDisplay(false); setSzczyrkCampDisplay(true)}}>
                    <div className="camp-info">
                        <div>
                            <h1> SZCZYRK </h1>
                            <h4> ROZMIAR SKOCZNI: 104 m </h4>
                            <h4> KOSZT: 24 000 euro  /  1 zawodnik </h4>
                            <h4> CZAS TRWANIA: 1 dzień </h4>
                        </div>
                        <button> WYŚLIJ ZAWODNIKÓW </button>
                    </div>
                </div>
            )}
            {campsDisplay && (
                <div className="planica-camp" onClick={() => {setCampsDisplay(false); setPlanicaCampDisplay(true)}}>
                    <div className="camp-info">
                        <div>
                            <h1> PLANICA </h1>
                            <h4> ROZMIAR SKOCZNI: 138 m </h4>
                            <h4> KOSZT: 29 000 euro  /  1 zawodnik</h4>
                            <h4> CZAS TRWANIA: 1 dzień </h4>
                        </div>
                        <button> WYŚLIJ ZAWODNIKÓW </button>
                    </div>
                </div>
            )}
            {campsDisplay && (
                <div className="hinterzarten-camp" onClick={() => {setCampsDisplay(false); setHinterzartenCampDisplay(true)}}>
                    <div className="camp-info">
                        <div>
                            <h1> HINTERZARTEN </h1>
                            <h4> ROZMIAR SKOCZNI: 108 m </h4>
                            <h4> KOSZT: 26 000 euro  /  1 zawodnik </h4>
                            <h4> CZAS TRWANIA: 1 dzień </h4>
                        </div>
                        <button> WYŚLIJ ZAWODNIKÓW </button>
                    </div>
                </div>
            )}
            

            {szczyrkCampDisplay && (
                <RenderCompetitors country = {props.country} place = 'Szczyrk'/>
            )}
            {planicaCampDisplay && (
                <RenderCompetitors country = {props.country} place = 'Planica'/>
            )}
            {hinterzartenCampDisplay && (
                <RenderCompetitors country = {props.country} place = "Hinterzarten"/>
            )

            }
        </div>
    );
}

function RenderCompetitors(props) {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 7);

    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = futureDate.toLocaleDateString('pl-PL', options);
    
    const [competitorsData, setCompetitorsData] = useState(null);
    const [announcementDisplay, setAnnouncementDisplay] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getCompetitors`, {
                    method: "POST",
                    body: JSON.stringify({ country: props.country }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setCompetitorsData(data);
                } else {
                    console.log("Nie udało się pobrać danych: ", response.status);
                }
            } catch (err) {
                console.log("Wystąpił błąd: ", err);
            }
        }

        fetchData();
    }, [props.country]);  

    useEffect(() => {
        if (competitorsData) {
            console.log(competitorsData.map(item => item.skill));
        }
    }, [competitorsData]);

    if (!competitorsData) {
        return <Loader/>;
    }

    return (
        <div className="competitors"> 
        {
            competitorsData.map(item => {return (
                <CompetitorCard name = {item.name} surname = {item.surname} status = {item.status} endOfStatus = {item.endOfStatus} place = {props.place} country = {props.country} date = {formattedDate} skill = {item.skill}/> 
            )}) 
        }
        { announcementDisplay && (
            <div className="training-announcement">
                <img src = {tick}/>
                <h1> {props.name} {props.surname} został wysłany na obóz w {props.place}! </h1>
                <button onClick={() => {setAnnouncementDisplay(false)}}> Zamknij komunikat </button>
            </div>
        )}
        </div>
        
    )
}

function CompetitorCard(props) {
    if(props.status=='brak')
        var renderButton = true;
    else
        var renderButton = false;
    return (
        <div className="competitor-card">
            <img src = {Person}/>
            <div>
                <h1> {props.name} {props.surname} </h1>
                <h2> STATUS: {props.status} </h2>
                <h2> ZAKOŃCZENIE STATUSU: {props.endOfStatus} </h2>
                {renderButton && (
                    <button onClick={() => {sendCompetitorToCamp(props.name, props.surname, props.place, props.country, props.date, props.skill); alert(`${props.name} ${props.surname} został wysłany na obóż w ${props.place}`)}}> WYŚLIJ NA OBÓZ </button>
                )}
            </div>
        </div>
    )
} 

async function sendCompetitorToCamp(n, s, p, c, d, skill) {
    let experience = 0;
    for(let i = 0; i < 21; i++) 
        experience += generateDistance(skill);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/sendCompetitorToCamp`, {
        method: "POST",
        body: JSON.stringify({name:n, surname: s, place: p, country: c, date: d, experience: experience}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function generateDistance(skill) {
    const s = `0.${skill}`
    const heistation = Math.floor(Math.random() * 8) - 4;
    let distance = 90+(50*Number(s));
    if(heistation>0) 
        distance += heistation
    else
        distance -= heistation;
    return distance;
}