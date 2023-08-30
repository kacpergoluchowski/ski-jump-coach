import React from "react";
import '../index.css';
import LogoPage from "./LogoPage";
import mailImage from '../images/envelope (2).png'

export default function Footer(props) {
    return (
        <footer className={props.footerClassName}>
            <div className="footer-div">
                <div>
                    <h1>MENU</h1>
                    <p>Kadra</p>
                    <p>Zawody</p>
                    <p>Treningi</p>
                </div>
                <div>
                    <h1>POMOC</h1>
                    <p> <img src = {mailImage}/> skijumpcoach@gmail.com </p>
                </div>
            </div>
            <LogoPage/>
        </footer>
    )
}

Footer.defaultProps = {
    footerClassName: null
}