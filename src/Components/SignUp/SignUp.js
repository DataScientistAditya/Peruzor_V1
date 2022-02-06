import React from "react";
import "./SignUp.css";
import SignUpFormComp from "../FormComps/SignUpForm";
import { useNavigate } from "react-router-dom";


const SignUpPage=()=>{

    let nav = useNavigate();
    return(
        <div id="Reg">
        <img id="Login_g" src="./Images/Login_g.png" srcSet="./Images/Login_g.png 1x, ./Images/Login_g@2x.png 2x"/>
        
        <div id="RegGroup">
                <div id="Sign_In">
                    <span>Sign Up</span>
                </div>
                <div className="AuthInputForm">
                    <ul>
                        <SignUpFormComp></SignUpFormComp>
                    </ul>
                    <hr></hr>
                    <ul>
                        <div className="AccountPasswordForget"> 
                                <h4>Have an Account?</h4>
                                <button className="SignUp" onClick={()=>nav("/login")}>SigIn</button>
                        </div>
                    </ul>
                </div>
        </div>
</div>
    );
}

export default SignUpPage;