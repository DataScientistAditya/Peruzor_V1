import React from "react";
import "./Sentences.css";
import SentencesShowComp from "./SentencesComp";


const SentencesPage=()=>{
    return(
        <div id="Pretest">
            
            <div id="Bg">
            </div>
            <div id="PretestGroup">
                <SentencesShowComp></SentencesShowComp>
            </div>
        </div>
    );
}

export default SentencesPage;