import React, { useState, useEffect ,useRef} from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import SpeechRecognitionsComp from "../SpeechRecognitionComp/SpeechRecognitions";
import PopUpcomp from "../Popups.js/Popups";
import ResultPopUpComp from "../Popups.js/ResultPopup";
import "./SentencesShowComp.css";

const SentencesShowComp=()=>{
    const [SentenceShow,SetSentencesShow] = useState("");
    const [lettersSpelled,SetSentenceSpeeled] = useState("");
    const [SentenceDiffrence,SetSentenceDiffrence] = useState([]);
    const [IsMicrophonPopUp,SetMicrophonePopUp] = useState(false);
    const [isInputConfirmed,SetInputConfirmed] = useState(false);
    const [isPopUpDisplay,SetDisplayPopUp] = useState({visibility:"hidden"});
    const [isSpeech,SetDisplaySpeech] = useState({visibility:"hidden"});
    const [isStartButton,SetStartButton] = useState({visibility:"visible"});
    //const [isResultPopup,SetIsResultpopup] = useState(false);
    const [ResultPopupDisplay,SetResultPopupDisplay] = useState({visibility:"hidden"});
    const countRef = useRef(0);
    const IndexCounter = useRef(0);
    const {speak} = useSpeechSynthesis();

    const DispalySentences= ["I can play with the bat and ball here.","The three boys like to walk to the bus stop.",
    "We are sleeping. We woke up late and we are very tired.","Mother and father work from home. They help people and tell them what to do. Some of them left their houses very early.",
    "Sometimes we need to place animals into groups of same and different. Together, we must write the important ones on the same list."]

      //User Entryfrom Microphone Recieved
    async function SubmitHandler(Data){
        //event.preventDefault();
        const SentenceSubmitData={
            SpelledSentence: Data,
            index: IndexCounter.current
        };
        //console.log(FormSubmitData);
        const Response = await fetch('http://iamadityachakraborty.pythonanywhere.com/CompareSentences',{
            method:"POST",
            body: JSON.stringify(SentenceSubmitData),
            headers:{
                'Content-Type':'application/json',
            }
        });

        if (Response.ok) {
            
            const ResponseData =await Response.json().then((Resp)=>{
                SetSentenceDiffrence(Resp.Unmatched);
                console.log(SentenceDiffrence);
                if (SentenceDiffrence === "None") {
                  countRef.current++;  
                };
            });
            
        };
    };


    let Score =0;
    function PassAudioText(data){
        SetDisplayPopUp({visibility:"visible"});
        if (isInputConfirmed) {
            SubmitHandler(data);
            SetSentenceSpeeled(data);   
        };
    };
    //User Entryfrom Microphone Recieved End

    let ShowingSenctence = "" 
    const NextClicked=()=>{
        ShowingSenctence = DispalySentences[IndexCounter.current];
        if (IndexCounter.current<= DispalySentences.length) {
            SetSentencesShow(ShowingSenctence);
            SetResultPopupDisplay({visibility:"hidden"});
            IndexCounter.current ++;

        }else{
            console.log("Test is Over");
        };
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
        let ShowingDummySentence ="I like to listen to music";
        SetSentencesShow(ShowingDummySentence);
        //letters.push(Showingletter); 
        
    };

    let RecordingPopUps=<p></p>;
    //Setting Microphone Popup
    const RecordingPopup=()=>{
        SetMicrophonePopUp(true);
        return SetDisplaySpeech({visibility:"visible"});
    };
    if (IsMicrophonPopUp) {
        RecordingPopUps = <SpeechRecognitionsComp SubmitText={PassAudioText}></SpeechRecognitionsComp>;
        
    };
    //End Microphone Popup

  
    
    return(
        <div className="LettersShow" >
            <div className="PopUpResult" style={ResultPopupDisplay}>
                <ResultPopUpComp score={countRef.current} TillNow={DispalySentences.length} Nextletter={NextClicked}></ResultPopUpComp>
            </div>
            <div className="StartScreen" style={isStartButton}>
                <p style={{color:"green",fontSize:"12px"}}>Note:You will be showned 6 Sentences back to back,</p>
                <p style={{color:"green",fontSize:"12px"}}>out of 6, first one will be a dummy one where score will not be counted.</p>
                <p style={{color:"green",fontSize:"12px"}}>based on your pronunciation for rest of the 5 Sentences you will have a score.</p>
                
                <p>Please click on the button to start the test</p>
                <button onClick={AssigningLetters} >Start</button>
            </div>
            <div className="Speechcontainer" style={isSpeech}>
                <PopUpcomp YesClicked={InputConfirmed} NoClicked={InputCanceled} Display={isPopUpDisplay}> </PopUpcomp>
                {RecordingPopUps}
            </div>
            <p>Read Sentence as Apeared Below using Microphone</p>
            <div className="lettercontainer">
                
                <ul className="lettersUl"><div className="letters"><p style={{fontSize:"18px",fontFamily:"sans-serif"}}>{SentenceShow}</p></div></ul>
                <ul className="speakerul"><div className="SpeakerContainer">
                <button onClick={()=>speak({text:SentenceShow })} className="SpeakerButtonbtn"><i className="fas fa-volume-up"></i></button>
                </div></ul>
            </div>
            <div className="MicroPhoneContainer">
                <button className="Microphone" onClick={RecordingPopup} ><i className="fas fa-microphone" ></i></button>
            </div>
        </div>
    );
}

export default SentencesShowComp;