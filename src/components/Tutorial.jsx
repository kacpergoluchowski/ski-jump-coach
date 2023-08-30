import React from "react";
import '../index.css';
import LogoPage from "./LogoPage";
import BookTuto from '../images/tutorial 1.png'
import star from '../images/snowflake 1.png'

export default function Tutorial() {
    return (
        <div className="tutorial-wrapper">
            <img src = {star} id='star-1'/>
            <img src = {star} id='star-2'/>
            <img src = {star} id='star-3'/>
            <img src = {star} id='star-4'/>
            <LogoPage/>
            <div className="wrapper-t">
                <img src = {BookTuto} className="book-tuto"/>
                <div className="tuto-section">
                    <h1> Mistrzowski Poradnik Skoków Narciarskich </h1>
                    <p> Witaj w sekcji Poradnik, gdzie znajdziesz cenne wskazówki i porady dotyczące tego menadżera skoków narciarskich. Zajrzyj tu, jeśli jesteś początkującym graczem. </p>
                    <button> PORADNIK </button>
                </div>
            </div>
        </div>
    )
}