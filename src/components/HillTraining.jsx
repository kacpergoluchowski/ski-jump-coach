import React, { useEffect, useState } from "react";
import '../index.css';
import Person from '../images/man (9).png'
import tick from '../images/tick.png'

function CompetitorsCard(props) {
    const [announcementDisplay, setAnnouncementDisplay] = useState(false);
    let buttonRender = false;
    if(props.status=='brak')
        buttonRender = true;
    return (
        <div className='competitor-card'>
            <img src = {Person}/>
            <div>
                <h1> {props.name} {props.surname} </h1>
                <h2> DOŚWIADCZENIE: {props.experience} </h2>
                <h2> STATUS: {props.status} </h2>
                <h2> ZAKOŃCZENIE STATUSU: {props.endOfStatus} </h2>
                { buttonRender && (
                    <button onClick={() => {training(props.name, props.surname, props.country, props.skill); setAnnouncementDisplay(true)}}> TRENING </button>
                )}
                { announcementDisplay && (
                    <TrainingAnnouncement name = {props.name} surname = {props.surname} skill = {props.skill}/>
                )
                
                }
            </div>
        </div>
    )
}

function training(name, surname, country, skill) {
    const experience = Math.floor(generateDistance(skill));
    async function sendResultToBackend() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/sendCompetitorToTraining`, {
            method: "POST",
            body: JSON.stringify({country: country, name:name, surname:surname, experience: experience}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    sendResultToBackend();
}

function TrainingAnnouncement(props) {
    const [announcementDisplay, setAnnouncementDisplay] = useState(true);
    const distance = generateDistance(props.skill);
    return (
        <div>
            {announcementDisplay && (
                <div className="training-announcement">
                    <img src = {tick}/>
                    <h1> {props.name} {props.surname} uzyskał {distance} m </h1>
                    <button onClick={() => {setAnnouncementDisplay(false)}}> Zamknij komunikat </button>
                </div>
            )}
        </div>
    )
}

function generateDistance(skill) {
    const s = `0.${skill}`
    const heistation = Math.floor(Math.random() * 6) - 3;
    let distance = 90+(50*Number(s));
    if(heistation>0) 
        distance += heistation
    else
        distance -= heistation;
    return distance;

}

export default function HillTraining(props) {
    return (
        <div className="hill-training-section">
            {props.data.map(item => {
                return <CompetitorsCard name = {item.name} surname = {item.surname} status = {item.status} endOfStatus = {item.endOfStatus} skill = {item.skill} country = {props.country} experience = {item.experience}/>
            })}
        </div>
        
    )
}