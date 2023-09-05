import React from "react";
import '../index.css';
import Person from '../images/man (9).png'

function CompetitorCard(props) {
    return (
        <div className="competitor-card">
            <img src = {Person}/>
            <div>
                <h1> {props.name} {props.surname} </h1>
                <h2> Wiek: {props.age} </h2>
                <h2> Umiejętności: {props.skill}  /  100 </h2>
                <button> OSIĄGNIĘCIA </button>
            </div>
        </div>
    )
}

export default function Competitors(props) {
    return (
        <div>
            <div className="competitors"> 
            {
                props.data.map(item => {
                    return <CompetitorCard name = {item.name} surname = {item.surname} age = {item.age} skill = {item.skill}/>
                })
            }
            </div>
        </div>
    )
}