import React from "react";
import '../index.css'
import Image from '../images/uid_58e7b16c6c014c19bb00859fcd60601f_width_1280_play_0_pos_0_gs_0_height_720_polscy-kibice-licza-szczegolnie-na-dawida-kubackiego-fot-papgrzegorz-momot 1.png'

export default function Representations() {
    return (
        <div className="workout-wrapper">
            <img src = {Image}/>
            <div className="workout--bg-wrapper">
                <div className="workout--content-wrapper"> 
                    <h1> TRENINGI </h1>
                    <p> W sekcji 'Treningi' odkryjesz kompleksowe narzędzia i zasoby, które pomogą Ci w doskonaleniu umiejętności twoich zawodników. Niezależnie od poziomu doświadczenia, 
                        nasze treningi oferują spersonalizowany program rozwoju, dostosowany do Twoich celów.
                    </p>
                    <button> TRENINGI </button>
                </div>
            </div>
        </div>
    )
}