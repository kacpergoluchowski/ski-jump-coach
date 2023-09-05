import React from "react";
import '../index.css';

export default function Budget(props) {
    return (
        <div className="budget-section">
            <h1> STAN FINANSÓW </h1>
            <h3> STAN KONTA: {props.data[0].accBalance} euro </h3>
            <h3> SPONSOR: {props.data[0].sponsor} ({props.data[0].sponsorshipIncome} euro)</h3>
            <div className="balance-section">
                <div className="income">
                    <h1> Dochody </h1>
                    <div>
                    { 
                        props.data.map(item => {
                            return (
                                <div>
                                {item.type == 'income' && (
                                    <Transaction type = {item.type} sum = {item.sum} desc = {item.desc}/>
                                )}
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                <div className="expenditure">
                <h1> Wydatki </h1>
                    <div>
                    { 
                        props.data.map(item => {
                            return (
                                <div>
                                {item.type == 'expenditure' && (
                                    <Transaction type = {item.type} sum = {item.sum} desc = {item.desc}/>
                                )}
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}

function Transaction(props) {
    if(props.type == 'income') {
        return (
            <p> + {props.sum} euro ({props.desc})</p>
        )
    }
    else {
        return (
            <p> - {props.sum} euro ({props.desc}) </p>
        )
    }
}