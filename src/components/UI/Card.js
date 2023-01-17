import React from "react";
import "./Card.css"

function Card(props) {
    return (
    <div className= {`card-box ${props.className}`}>
        {props.children}
    </div>
    )
};

export default Card;