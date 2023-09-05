import React, { useRef } from "react";
import '../index.css';
import LogoPage from "./LogoPage";
import { Link } from "react-router-dom";
import menuImage from "../images/more.png"

export default function Navbar(props) {
    const menuDisplay = useRef(0);
    function showMobilemMenu() {
        menuDisplay.current.style = 'display:flex'
    }
    return (
        <div className={props.navClassName}>
            <LogoPage/>
            <nav ref={menuDisplay}>
                <Link to = '/' onClick={() => menuDisplay.current.style = 'display: none'}> <h1> STRONA GŁÓWNA </h1> </Link>
                <Link to = '/competitions' onClick={() => menuDisplay.current.style = 'display: none'}> <h1> ZAWODY </h1> </Link>
                <Link to = '/countries' onClick={() => menuDisplay.current.style = 'display: none'}> <h1> KADRY </h1> </Link>
            </nav>
            <img src = {menuImage} className="more" onClick={showMobilemMenu}/>
        </div>
    )
}

Navbar.defaultProps = {
    navClassName: 'navbar'
}