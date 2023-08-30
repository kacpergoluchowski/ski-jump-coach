import React from "react";
import Hero from "../components/Hero";
import Navbar from '../components/Navbar'
import Tutorial from "../components/Tutorial";
import Representations from "../components/Representations";
import Competitions from "../components/Competitions";
import Workouts from '../components/Workouts'
import Hills from '../components/Hills'
import Footer from "../components/Footer";

const Home = () => {
    return (
        <>
            <Hero heroClassName = 'hero'/>
            <Navbar navClassName = 'navbar'/>
            <Tutorial/>
            <Representations/>
            <Competitions/>
            <Workouts/>
            <Hills/>
            <Footer/>
        </>
    )
}

export default Home;