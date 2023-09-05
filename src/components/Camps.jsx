import React, { useEffect, useState } from "react";
import '../index.css';
import Person from '../images/man (9).png'
import Tick from '../images/tick.png'
import Loader from "./Loader";
import generateExperience from "./functions/generateExperience";

export default function Camps(props) {
    const [campsDisplay, setCampsDisplay] = useState(true);
    const [szczyrkCampDisplay, setSzczyrkCampDisplay] = useState(false);
    const [planicaCampDisplay, setPlanicaCampDisplay] = useState(false);
    const [hinterzartenCampDisplay, setHinterzartenCampDisplay] = useState(false);
    
    function showCamp(showCamp) {
        setCampsDisplay(false);
        showCamp(true);
    }

    return (
        <div className="camp-section">
            {campsDisplay && (
                <div className="szczyrk-camp" onClick={() => showCamp(setSzczyrkCampDisplay)}>
                    <div className="camp-info">
                        <div>
                            <h1> SZCZYRK </h1>
                            <h4> ROZMIAR SKOCZNI: 104 m </h4>
                            <h4> KOSZT: 24 000 euro  /  1 zawodnik </h4>
                            <h4> CZAS TRWANIA: 7 dni </h4>
                        </div>
                        <button> WYŚLIJ ZAWODNIKÓW </button>
                    </div>
                </div>
            )}
            {campsDisplay && (
                <div className="planica-camp" onClick={() => showCamp(setPlanicaCampDisplay)}>
                    <div className="camp-info">
                        <div>
                            <h1> PLANICA </h1>
                            <h4> ROZMIAR SKOCZNI: 138 m </h4>
                            <h4> KOSZT: 29 000 euro  /  1 zawodnik</h4>
                            <h4> CZAS TRWANIA: 7 dni </h4>
                        </div>
                        <button> WYŚLIJ ZAWODNIKÓW </button>
                    </div>
                </div>
            )}
            {campsDisplay && (
                <div className="hinterzarten-camp" onClick={() => showCamp(setHinterzartenCampDisplay)}>
                    <div className="camp-info">
                        <div>
                            <h1> HINTERZARTEN </h1>
                            <h4> ROZMIAR SKOCZNI: 108 m </h4>
                            <h4> KOSZT: 26 000 euro  /  1 zawodnik </h4>
                            <h4> CZAS TRWANIA: 7 dni </h4>
                        </div>
                        <button> WYŚLIJ ZAWODNIKÓW </button>
                    </div>
                </div>
            )}
            
            {szczyrkCampDisplay && (
                <RenderCompetitors country = {props.country} place = "Szczyrk"/>
            )}
            {planicaCampDisplay && (
                <RenderCompetitors country = {props.country} place = "Planica"/>
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

    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const formattedDate = futureDate.toLocaleDateString('pl-PL', options);
    
    const [competitorsData, setCompetitorsData] = useState(null);
    const [announcementDisplay, setAnnouncementDisplay] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://127.0.0.1:3737/getCompetitors`, {
                    method: "POST",
                    body: JSON.stringify({ country: props.country }),
                    headers: {
                        "Content-Type": "application/json"
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

    if (!competitorsData) {
        return <Loader/>;
    }

    return (
        <div className="competitors"> 
        {
            competitorsData.map(item => {
                return (
                    <CompetitorCard name = {item.name} surname = {item.surname} status = {item.status} endOfStatus = {item.endOfStatus} place = {props.place} country = {props.country} date = {formattedDate} skill = {item.skill}/> 
                )
            }) 
        }
        { announcementDisplay && (
            <div className="training-announcement">
                <img src = {Tick}/>
                <h1> {props.name} {props.surname} został wysłany na obóz w {props.place}! </h1>
                <button onClick={() => {setAnnouncementDisplay(false)}}> Zamknij komunikat </button>
            </div>
        )}
        </div>
        
    )
}

function CompetitorCard(props) {
    return (
        <div className="competitor-card">
            <img src = {Person}/>
            <div>
                <h1> {props.name} {props.surname} </h1>
                <h2> STATUS: {props.status} </h2>
                <h2> ZAKOŃCZENIE STATUSU: {props.endOfStatus} </h2>
                {props.status == 'brak' && (
                    <button onClick={() => {sendCompetitorToCamp(props.name, props.surname, props.place, props.country, props.date, props.skill); alert(`${props.name} ${props.surname} został wysłany na obóż w ${props.place}`)}}> WYŚLIJ NA OBÓZ </button>
                )}
            </div>
        </div>
    )
} 



async function sendCompetitorToCamp(name, surname, place, country, date, skill) {
    const experience = generateExperience(skill);

    await fetch(`http://127.0.0.1:3737/sendCompetitorToCamp`, {
        method: "POST",
        body: JSON.stringify({name:name, surname: surname, place: place, country: country, date: date, experience: experience}),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

