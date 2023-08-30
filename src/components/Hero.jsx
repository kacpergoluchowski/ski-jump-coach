import React from "react";
import '../index.css';

export default function Hero(props) {
    return (
        <div className={props.heroClassName}>
            <img src = {props.image}/>
        </div>
    )
}

Hero.defaultProps = {
    image:  null
}