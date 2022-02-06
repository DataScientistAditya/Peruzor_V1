import react from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";
const LandingPage=()=>{
    
    //Using for Navigation
    let nav=useNavigate();
    return(
        <div id="LandingPageAISpeech">
            <img id="Background" src=".\Images\Background.png" srcSet=".\Images\Background.png 1x, .\Images\Background@2x.png 2x"/>
            <img id="BackGround_Mobile" src=".\Images\LandingMobile.jpg"  />
            <img id="BackGround_Small_Mobile" src=".\Images\414Screen.png"  />
            <img id="BackGround_bIG_Mobile" src=".\Images\BigSCREEN.png"  />
            <div className="Welcome">
                <div id="Welcome_to_Peruzor">
                    <span>Welcome to Peruzor</span>
                </div>
                <div id="Where_Transformation_meets_Rea">
                    <span>Where Transformation meets Reading</span>
                </div>
                <button className="GetStartedButton" onClick={()=>nav("/login")}>Get Started</button>
            </div>
        </div>
    );
}

export default LandingPage;