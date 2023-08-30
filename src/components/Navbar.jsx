import React from "react";
import '../index.css';
import Logo from '../images/logo.png'
import { Link } from "react-router-dom";

export default function Navbar(props) {
    return (
        <div className={props.navClassName}>
            <div>
                <img src = {Logo}/>
                <h1> SKI JUMP COACH </h1>
            </div>
            <nav>
                <Link to = '/'> <h1> STRONA GŁÓWNA </h1> </Link>
                <Link to = '/competitions'> <h1> ZAWODY </h1> </Link>
                <Link to = '/countries'> <h1> KADRY </h1> </Link>
            </nav>
        </div>
    )
}

Navbar.defaultProps = {
    navClassName: 'navbar'
}