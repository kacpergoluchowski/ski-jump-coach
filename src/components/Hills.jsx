import React from "react";
import '../index.css'
import Image from '../images/1549051210 1.png'

export default function Competitions() {
    return (
        <div className="hill-wrapper">
            <img src = {Image}/>
            <div className="hill--bg-wrapper">
                <div className="hill--content-wrapper"> 
                    <h1> SKOCZNIE </h1>
                    <p> W sekcji 'Skocznie' przewiozą Cię w świat różnorodnych aren skoków narciarskich, gdzie poznasz charakterystykę poszczególnych skoczni oraz ich wpływ na rywalizację. 
                        Tutaj zgłębisz wiedzę o tych legendarnych miejscach, które były świadkami historycznych momentów i niesamowitych skoków.
                    </p>
                    <button> SKOCZNIE </button>
                </div>
            </div>
        </div>
    )
}