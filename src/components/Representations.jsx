import React from "react";
import '../index.css'
import Image from '../images/gf-tMsb-nXvt-YpTg_skoki-narciarskie-2019-2020-transmisja-tvp-i-eurosport-na-caly-sezon-kiedy-gdzie-i-o-ktorej-ogladac-1920x1080-nocrop 1.png'
import { Link } from "react-router-dom";

export default function Representations() {
    return (
        <div className="rep-wrapper">
            <img src = {Image}/>
            <div className="rep--bg-wrapper">
                <div className="rep--content-wrapper"> 
                    <h1> REPREZENTACJE </h1>
                    <p> Witaj w sekcji 'Reprezentacje', gdzie przeniesiesz się w świat największych skoków narciarskich na całym globie. Tutaj znajdziesz pełen 
                        przegląd kadr narciarskich z różnych państw, w tym informacje o ich zawodnikach, osiągnięciach i rekordach.</p>
                    <Link to = '/countries'> <button> REPREZENTACJE </button> </Link>
                </div>
            </div>
        </div>
    )
}