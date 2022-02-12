import React from "react";


const ResultPopUpComp =(props)=>{
    return(
        <div className="Results">
            <p>wait for the next letter</p>
            <p>text showned is {props.TextShow} and You have spelled {props.Prons}</p>
            <p> Your Score is {props.score}/{props.TillNow}  </p>
            <button className="NextButton" onClick={props.Nextletter} disabled={props.DisableCond}>Nextletter</button>
        </div>
    );
}

export default ResultPopUpComp;