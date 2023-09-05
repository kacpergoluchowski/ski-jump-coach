import React from "react";
import '../index.css';
import LogoPage from "./LogoPage";
import BookTuto from '../images/tutorial 1.png'
import Snowflake from '../images/snowflake 1.png'

export default function Tutorial() {
    return (
        <div className="tutorial-wrapper">
            <img src = {Snowflake} id='star-1'/>
            <img src = {Snowflake} id='star-2'/>
            <img src = {Snowflake} id='star-3'/>
            <img src = {Snowflake} id='star-4'/>
            <div className="wrapper-tutorial-content">
                <img src = {BookTuto} className="book-tuto"/>
                <div className="tutorial-content">
                    <h1> Mistrzowski Poradnik Skoków Narciarskich </h1>
                    <p> Witaj w sekcji Poradnik, gdzie znajdziesz cenne wskazówki i porady dotyczące tego menadżera skoków narciarskich. Zajrzyj tu, jeśli jesteś początkującym graczem. </p>
                    <button> PORADNIK </button>
                </div>
            </div>
        </div>
    )
}