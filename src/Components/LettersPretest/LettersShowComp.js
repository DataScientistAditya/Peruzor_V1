import React, { useState, useEffect ,useRef} from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import SpeechRecognitionsComp from "../SpeechRecognitionComp/SpeechRecognitions";
import PopUpcomp from "../Popups.js/Popups";
import ResultPopUpComp from "../Popups.js/ResultPopup";
import "./LettersShowComp.css";
import { useNavigate } from "react-router-dom";

const LetterShowComp=()=>{
    const [lettersShow,SetLettersShow] = useState("");
    const [IsDisabled,SetDisabled] = useState(""); 
    const [lettersSpelled,SetLettersSpeeled] = useState("");
    const [IsMicrophonPopUp,SetMicrophonePopUp] = useState(false);
    const [isInputConfirmed,SetInputConfirmed] = useState(false);
    const [isPopUpDisplay,SetDisplayPopUp] = useState({visibility:"hidden"});
    const [isSpeech,SetDisplaySpeech] = useState({visibility:"hidden"});
    const [isStartButton,SetStartButton] = useState({visibility:"visible"});
    //const [isResultPopup,SetIsResultpopup] = useState(false);
    const [ResultPopupDisplay,SetResultPopupDisplay] = useState({visibility:"hidden"});
    const [NavigateNextTest,SetNavigateNextTest] = useState(false);
    const [Ltters,SetLetters]=useState([]);
    const countRef = useRef(0);
    const {speak} = useSpeechSynthesis();


    let nav = useNavigate();
    //User Entryfrom Microphone Recieved
    let Score =0;
    function PassAudioText(data){
        SetDisplayPopUp({visibility:"visible"});
        if (isInputConfirmed) {
            if (String(lettersShow) === String(data).toUpperCase()) {
                console.log("Checking Resut");
                countRef.current++;
                console.log(countRef.current);
                SetLettersSpeeled(data);
                return Score = Score +1;
            };
            SetLettersSpeeled(data);
        };
    };
    //User Entryfrom Microphone Recieved End

    const Updatelist =(elems)=>{
        SetLetters(arr=>[...arr,elems])
    };

    let username = "aditya";
    //let letters= [];
    const NextClicked=()=>{
        //CheckingResult();
        //CheckingLenghtofList();
        let found = "";
        let ShowNextLetter = generateString(1);
        found = Ltters.find(element=> element === ShowNextLetter);
        if (Ltters.length<=9) {
            while (found !== undefined) {
                ShowNextLetter = generateString(1);
                found = Ltters.find(element=> element === ShowNextLetter);
                if (found === undefined) {
                    break;
                };
                return ShowNextLetter;
            };
            
            Updatelist(ShowNextLetter);
            //letters.push(ShowNextLetter); 
            SetResultPopupDisplay({visibility:"hidden"});
            SetLettersShow(ShowNextLetter);
            console.log(Ltters);
            console.log(lettersSpelled);
            console.log(found);
           
        }else{
            SetNavigateNextTest(true);
            console.log("Your Test is Finished")
        };
        
    };
    let RecordingPopUps=<p></p>;
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    //For Generating Random letters
    function generateString(length) {
        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    
        return result;
    };
    //Input Confirmed
    const InputConfirmed=()=>{
        SetInputConfirmed(true);
        SetDisplaySpeech({visibility:"hidden"});
        SetResultPopupDisplay({visibility:"visible"});
        return SetDisplayPopUp({visibility:"hidden"});
    };
    //End Input Confirmed
    //Input Cencelled
    const InputCanceled=()=>{
        SetInputConfirmed(false);
        SetDisplaySpeech({visibility:"hidden"});
        return SetDisplayPopUp({visibility:"hidden"});
    }
    //End Input Cancelled

    
    

    
    const AssigningLetters=()=>{
        SetStartButton({visibility:"hidden"});
        let Showingletter =generateString(1);
        SetLettersShow(Showingletter);
        //letters.push(Showingletter); 
        
    };

  
    //Setting Microphone Popup
    const RecordingPopup=()=>{
        SetMicrophonePopUp(true);
        return SetDisplaySpeech({visibility:"visible"});
    };
    if (IsMicrophonPopUp) {
        RecordingPopUps = <SpeechRecognitionsComp SubmitText={PassAudioText}></SpeechRecognitionsComp>;
        
    };
    //End Microphone Popup

    if (NavigateNextTest) {
        
        setInterval(() => {
            nav("/Sentencetest/" + username);
         }, 2000);
        
    };
    
    return(
        <div className="LettersShow" >
            <div className="PopUpResult" style={ResultPopupDisplay}>
                <ResultPopUpComp   Prons={lettersSpelled.toUpperCase()} TextShow={lettersShow} score={countRef.current} TillNow={Ltters.length} Nextletter={NextClicked}></ResultPopUpComp>
            </div>
            <div className="StartScreen" style={isStartButton}>
                <p style={{color:"green",fontSize:"12px"}}>Note:You will be showned 11 letters back to back with span of 30 secs,</p>
                <p style={{color:"green",fontSize:"12px"}}>out of 11, first one will be a dummy one where score will not be counted.</p>
                <p style={{color:"green",fontSize:"12px"}}>based on your pronunciation for rest of the 10 letters you will have a score.</p>
                
                <p>Please click on the button to start the test</p>
                <button onClick={AssigningLetters} >Start</button>
            </div>
            <div className="Speechcontainer" style={isSpeech}>
                <PopUpcomp YesClicked={InputConfirmed} NoClicked={InputCanceled} Display={isPopUpDisplay}> </PopUpcomp>
                {RecordingPopUps}
            </div>
            <p>Spell Letters as Apeared Below using Microphone</p>
            <div className="lettercontainer">
                
                <ul className="lettersUl"><div className="letters"><h4>{lettersShow}</h4></div></ul>
                <ul className="speakerul"><div className="SpeakerContainer">
                <button onClick={()=>speak({text:lettersShow })} className="SpeakerButtonbtn"><i className="fas fa-volume-up"></i></button>
                </div></ul>
            </div>
            <div className="MicroPhoneContainer">
                <button className="Microphone" onClick={RecordingPopup} disabled={IsDisabled}><i className="fas fa-microphone" ></i></button>
            </div>
        </div>
    );
}

export default LetterShowComp