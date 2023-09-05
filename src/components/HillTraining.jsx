import React, { useEffect, useState } from "react";
import '../index.css';
import Person from '../images/man (9).png'
import tick from '../images/tick.png'
import generateDistance from './functions/generateDistance'

export default function HillTraining(props) {
    return (
        <div className="hill-training-section">
            {props.data.map(item => {
                return <CompetitorsCard name = {item.name} surname = {item.surname} status = {item.status} endOfStatus = {item.endOfStatus} skill = {item.skill} country = {props.country} experience = {item.experience} jumps = {item.jumps}/>
            })}
        </div>
    )
}

function CompetitorsCard(props) {
    const [announcementDisplay, setAnnouncementDisplay] = useState(false);

    return (
        <div className='competitor-card'>
            <img src = {Person}/>
            <div>
                <h1> {props.name} {props.surname} </h1>
                <h2> DOŚWIADCZENIE: {props.experience} </h2>
                <h2> ODDANE DZISIAJ SKOKI: {props.jumps} </h2>
                <h2> STATUS: {props.status} </h2>
                <h2> ZAKOŃCZENIE STATUSU: {props.endOfStatus} </h2>
                { props.status == 'brak' && (
                    <button onClick={() => {training(props.name, props.surname, props.country, props.skill); setAnnouncementDisplay(true)}}> TRENING </button>
                )}
                { announcementDisplay && (
                    <TrainingAnnouncement name = {props.name} surname = {props.surname} skill = {props.skill} country = {props.country} jumps = {props.jumps}/>
                )}
            </div>
        </div>
    )
}

function training(name, surname, country, skill) {
    const experience = Math.floor(generateDistance(skill));

    async function sendResultToBackend() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}sendCompetitorToTraining`, {
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
            {announcementDisplay && props.jumps<3 && (
                <div className="training-announcement">
                    <img src = {tick}/>
                    <h1> {props.name} {props.surname} uzyskał {distance} m </h1>
                    <h3> POBRANO 1000 EURO Z KONTA REPREZENTACJI {props.country} </h3>
                    <button onClick={() => {setAnnouncementDisplay(false)}}> Zamknij komunikat </button>
                </div>
            )}
            {announcementDisplay && props.jumps==3 && (
                <div className="training-alert">
                    <img src = {tick}/>
                    <h1> {props.name} {props.surname} osiągnął już dzienny limit skoków (3)!</h1>
                    <button onClick={() => props.setDisplay(false)}> Zamknij komunikat </button>
                </div>
            )}
        </div>
    )
}

