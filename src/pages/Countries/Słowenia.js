import React, { useEffect, useState }  from "react";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";
import CountryChangeNavbar from "../../components/CountryNavbar";
import Footer from "../../components/Footer";
import Staff from "../../components/Staff";

const Slowenia = (props) => {
    const [countriesData, setCountriesData] = useState(null);
    const [staffData, setStaffData] = useState(null);
    const [staffSectDisplay, setStaffSectDisplay] = useState(false);
    const [changeSectDisplay, setChangeSectDisplay] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3737/getFlag', {
                    method: "POST",
                    body: JSON.stringify({ query: props.country }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json(); 
                    setCountriesData(data); 
                } else {
                    console.error("Nie udało się pobrać danych:", response.status);
                }
            } catch (error) {
                console.error("Wystąpił błąd:", error);
            }
        }

        fetchData();
    }, [props.country]); 

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3737/getStaff', {
                    method: "POST",
                    body: JSON.stringify({ country: props.country }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if(response.ok) {
                    const data = await response.json();
                    setStaffData(data);
                }
                else 
                    console.log("Nie udało sie pobrać danych: ", response.status);
            }
            catch(err) {
                console.log("Wystąpił błąd: ", err);
            }
        }

        fetchData();
    }, [staffSectDisplay])

    return (
        <div>
            {countriesData && (
                <div>
                    <Navbar navClassName = 'navbar country-navbar'/>
                    <Hero heroClassName = 'country-hero' image = {countriesData.flag} country = {countriesData.country}/>
                    {changeSectDisplay && (
                        <div className="country-change-navbar">
                            <button onClick={() => {setChangeSectDisplay(false); setStaffSectDisplay(true)}}> SZTAB </button>
                            <button> ZAWODNICY </button>
                            <button> SKOCZNIE </button>
                        </div>
                    )}
                    {
                        staffSectDisplay && (
                            <Staff data = {staffData}/>
                        )
                    }
                    <Footer footerClassName = 'country-change-footer'/>
                </div>
            )}
        </div>
    )
}

export default Slowenia;