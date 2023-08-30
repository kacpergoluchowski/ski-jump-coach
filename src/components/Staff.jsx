import React, { useEffect } from "react";
import '../index.css';
import Person from '../images/man (9).png';
import { Link } from "react-router-dom";

export default function Staff(props) {
    useEffect(() => {
        console.log(props.data.headCoach)
    })

    return (
        <div className="staff">
            <div className="staff-card">
                <img src = {props.data.headCoachProfile} className="staff-person-image"/>
                <div>
                    <h1> Trener główny:  {props.data.headCoach}  </h1>
                    <h1> Nardowość: <img src = {props.data.headCoachFlag}/> {props.data.headCoachCountry} </h1>
                    <h1> Wiek: {props.data.headCoachAge} </h1>
                </div>
            </div>
            <div className="staff-card">
                <img src = {props.data.assistantProfile} className="staff-person-image"/>
                <div>
                    <h1> Asystent: {props.data.assistant}  </h1>
                    <h1> Nardowość: <img src = {props.data.assistantFlag}/> {props.data.assistantCountry} </h1>
                    <h1> Wiek: {props.data.assistantAge} </h1>
                </div>
            </div>
            <div className="staff-card">
                <img src = {props.data.physiotherapistProfile} className="staff-person-image"/>
                <div>
                    <h1> Fizjoterapeuta: {props.data.physiotherapist}</h1>
                    <h1> Nardowość: <img src = {props.data.physiotherapistFlag}/> {props.data.physiotherapistCountry} </h1>
                    <h1> Wiek: {props.data.physiotherapistAge} </h1>
                </div>
            </div>
        </div>
        
    )
}