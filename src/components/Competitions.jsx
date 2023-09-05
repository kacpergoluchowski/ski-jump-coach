import React from "react";
import '../index.css'
import Image from '../images/1504791797_Ski-Jumping-High-Definition-Wallpaper-23955 1.png'
import { Link } from "react-router-dom";

export default function Competitions() {
    return (
        <div className="comp-wrapper">
            <img src = {Image}/>
            <div className="comp--bg-wrapper">
                <div className="comp--content-wrapper"> 
                    <h1> ZAWODY </h1>
                    <p> W sekcji 'Zawody' przeniesiesz się na arenę emocjonujących zmagań skoków narciarskich. To tutaj znajdziesz najświeższe informacje o zbliżających się turniejach, wynikiach
                        ostatnich zawodów oraz kulisy rywalizacji skoczków z całego świata.
                    </p>
                    <Link to = '/competitions'> <button> ZAWODY </button> </Link>
                </div>
            </div>
        </div>
    )
}