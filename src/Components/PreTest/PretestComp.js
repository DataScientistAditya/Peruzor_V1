import React, { useState } from "react";
import "./PretestComp.css";
import useRecorder from "../SpeechRecognitionComp/UseRecorder";
import SpeechRecognitionsComp from "../SpeechRecognitionComp/SpeechRecognitions";
import PopUpcomp from "../Popups.js/Popups";
import { useSpeechSynthesis } from 'react-speech-kit';
import { format } from "react-string-format";


const ComputerGeneratedProp=(props)=>{

    const [name,SetName] = useState("");
    const [country,SetCountry] = useState("");
    const [TextInput,SetTextInput] = useState("");
    const [SeconContentDispaly, SetSeconContentDispaly] = useState({visibility:"hidden"});
    const [ThirdContentDispaly, SetThirdContentDispaly] = useState({visibility:"hidden"});
    const [FourthContentDispaly, SetFourthContentDispaly] = useState({visibility:"hidden"});
    const [isThirdDisplay,SetThirdDisplay] = useState(false);
    const [FirstMicrophoneEntry, SetFirstMicroPhoneEntry] = useState("");
    const [SecondMicrophoneEntry, SetSecondMicroPhoneEntry] = useState("");
    const [IsMicrophonPopUp,SetMicrophonePopUp] = useState(false);
    const [isPopUpDisplay,SetDisplayPopUp] = useState({visibility:"hidden"});
    const [isSpeech,SetDisplaySpeech] = useState({visibility:"hidden"});
    const [isConfiremed,SetConfirmed] = useState(false);
    const [IsDiabled,SetButtonDisabled] = useState("");
    const [IsWarning, SetWarning] = useState({color:"yellow",visibility:"hidden"});
    const [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
    const [textcontent,SetTextContent] = useState("");
    const {speak} = useSpeechSynthesis();
    const TextInputHandler =(event)=>{
        SetTextInput(event.target.value);
    }

    const TakeTextInputs=(event)=>{
        event.preventDefault();
        if (TextInput != "" ) {
            if (name == "") {
                SetSeconContentDispaly({visibility:"visible"});
                return SetName(TextInput);
            };
            if (name != "") {
                SetThirdContentDispaly({visibility:"visible"});
                SetThirdDisplay(true);
                SetButtonDisabled("disabled");
                return SetCountry(TextInput);
            };
        }
    };

    if (isThirdDisplay) {
        setInterval(() => {
            SetFourthContentDispaly({visibility:"visible"});
          }, 1000);
    };

    let RecordingPopUps = <p></p>
    const RecordingPopup=()=>{
        SetMicrophonePopUp(true);
        SetDisplaySpeech({visibility:"visible"});
    };

    

    const InputConfirmed=()=>{
        SetConfirmed(true) ;
        SetDisplaySpeech({visibility:"hidden"});
        return SetDisplayPopUp({visibility:"hidden"});
    };

    const InputCanceled=()=>{
        SetConfirmed(false) ;
        SetDisplaySpeech({visibility:"hidden"});
        return SetDisplayPopUp({visibility:"hidden"});
    };

    let Warning =<p style={IsWarning}><i className="fas fa-exclamation-triangle" style={{color:"#FF8C00"}}></i> Didnt Come Up What You had Submited? please try with recording Audio and stop it before submitting or resubmit it</p>;
    function PassAudioText(data){
        alert("Did You Stop Recording?")
        SetDisplayPopUp({visibility:"visible"});
        SetWarning({color:"#FF8C00",visibility:"visible"});
        if (FirstMicrophoneEntry=="") {
            if (isConfiremed) {
                
                SetFirstMicroPhoneEntry(data);
                SetSeconContentDispaly({visibility:"visible"});
                return SetMicrophonePopUp(false);
            };
        }

        if (FirstMicrophoneEntry!="" && SecondMicrophoneEntry=="") {
            if (isConfiremed) {
                SetSecondMicroPhoneEntry(data);
                SetThirdContentDispaly({visibility:"visible"});
                SetThirdDisplay(true);
                SetButtonDisabled("disabled");
                return SetMicrophonePopUp(false);
            };
        }
        
        
        
    };

    if (IsMicrophonPopUp) {
        RecordingPopUps = <SpeechRecognitionsComp SubmitText={PassAudioText}></SpeechRecognitionsComp>;
        
    };  



    


    return(
        
        <div className="ComputerInteractionArea">
            <div className="Speech" style={isSpeech}>
                <PopUpcomp YesClicked={InputConfirmed} NoClicked={InputCanceled} Display={isPopUpDisplay}> </PopUpcomp>
                {RecordingPopUps}
            </div>
            <div className="ComputerGeneratedText">
                <ul className="TextOuts">
                    <li>{Warning}</li>
                    <li><h4>Bot:</h4></li>
                    <li><p>Hi, I am Alex. What is your name ?</p></li>
                    <li><h4 style={SeconContentDispaly}>{name}{FirstMicrophoneEntry}:</h4></li>
                    <li><h6 style={SeconContentDispaly}>I am {name} {FirstMicrophoneEntry}</h6></li>
                    <li><h4 style={SeconContentDispaly}>Bot:</h4></li>
                    <li><p style={SeconContentDispaly}>Hi {name} {FirstMicrophoneEntry} I am from Jamaica/ Barbados. Where are you from?</p></li>
                    <li><h4 style={ThirdContentDispaly}>{name} {FirstMicrophoneEntry}:</h4></li>
                    <li><h6 style={ThirdContentDispaly}>I am from {country}{SecondMicrophoneEntry}</h6></li>
                    <li><h4 style={FourthContentDispaly}>Bot:</h4></li>
                    <li><p style={FourthContentDispaly}>{name}{FirstMicrophoneEntry},You will be doing a Reading Assessment. That includes; identifying letter names and sounds, identifying sight words, reading one or more stories and then answering some questions.
                    This is not a pass or fail kind of test so relax and do your best. 
                    Thank you
                    </p></li>
                </ul>
                <ul className="ButtonsSpeak">
                    <button onClick={()=>speak({text:TextInput})} className="SpeakerButton"><i class="fas fa-volume-up"></i></button>
                </ul>
                
            </div>
            <form className="TextInputArea" onSubmit={TakeTextInputs}>
                <input type="text" placeholder="Please Enter Your Input Here" onChange={TextInputHandler} ></input>
                <button className="Microphone_Starts" onClick={RecordingPopup} disabled={IsDiabled}><i className="fas fa-microphone" ></i></button>
                <button className="SubmitButton" type="submit" disabled={IsDiabled}>Submit</button>
                
            </form>
        </div>
    );
}

export default ComputerGeneratedProp;