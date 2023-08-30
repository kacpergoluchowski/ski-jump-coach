import React, { useEffect, useState } from "react";
import '../index.css';
import { Link } from "react-router-dom";
import Footer from "./Footer";
import star from '../images/star (1).png'
import Loader from "./Loader";

export default function CountriesData() {
    const [countriesData, setCountriesData] = useState(null);

    useEffect(() => {
        async function fetchData() { 
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}getCountries`); 
            const jsonData = await response.json();
            setCountriesData(jsonData);
        }

        fetchData();
    }, []);

    console.log("Render:", countriesData); 

    if(!countriesData) 
        return <Loader/>

    return (
        <>
            <div className="countries-data">
                {countriesData && (
                    <div>
                        {countriesData.map(item => (
                            <CountryCard image = {item.flag} country = {item.country} capital = {item.capital} rating = {item.rating} />
                        ))}
                    </div>
                )}
            </div>
            <Footer footerClassName = 'country-change-footer'/>
        </>
        
    )
}

function CountryCard(props) {;
    return (
        <div className="country-card">
            <img src = {props.image}/>
            <div>
                <h1> {props.country} </h1>
                <p> Stolica: {props.capital} </p>
                <p> Ocena: {props.rating} <img src = {star}/></p>
                <Link to = {props.country}> <button> Przejdź </button> </Link>
            </div>
        </div>
    )
}
