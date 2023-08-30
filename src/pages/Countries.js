import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import CountriesData from "../components/CountriesData";

const Countries = () => {
    return (
        <>
            <Hero heroClassName = 'hero-countries'/>
            <Navbar navClassName = 'navbar'/>
            <CountriesData/>
        </>
    )
}

export default Countries;