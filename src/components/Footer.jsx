import React from "react";
import '../index.css';
import mailImage from '../images/envelope (2).png'

export default function Footer(props) {
    return (
        <footer className={props.footerClassName}>
            <div>
                <h1> MENU </h1>
                <h3> KADRY </h3>
                <h3> SPONSORZY </h3>
                <h3> SKOCZNIE </h3>
            </div>
            <div>
                <h1> POMOC </h1>
                <h3> FAQ </h3>
                <h3> PORADNIK </h3>
                <h3> <img src = {mailImage}/> skijumpcoach@gmail.com </h3>
            </div>
            <div>
                <h1> ZAWODY </h1>
                <h3> PUCHAR ŚWIATA </h3>
                <h3> PUCHAR KONTYNENTALNY </h3>
                <h3> FIS CUP </h3>
            </div>
        </footer>
    )
}

Footer.defaultProps = {
    footerClassName: null
}