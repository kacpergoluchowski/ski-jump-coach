import React from "react";
import '../index.css';
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import SportsEvents from "../components/SportsEvents";
import Footer from '../components/Footer'

export default function Competitions() {
    return (
        <div>
            <Hero heroClassName = 'hero-competitions'/>
            <Navbar/>
            <SportsEvents/>
            <Footer footerClassName = 'dark-footer'/>
        </div>
    )
}