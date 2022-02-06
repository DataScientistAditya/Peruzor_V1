import React,{useState} from "react";
import "./PopUp.css";

const PopUpcomp=(props)=>{
    return(
        <div className="Popup" style={props.Display}>
            <div className="TextPopUp">
                <h4>Are You Sure You want This to enter</h4>
            </div>
            <div className="PopUpButton">
                <button className="YesButton" onClick={props.YesClicked}>Yes</button>
                <button className="YesButton" onClick={props.NoClicked}>No</button>
            </div>
        </div>
    );
}

export default PopUpcomp;