import React from "react";
import "./Signin.css";
import SignIFormComp from "../FormComps/SiginForm";
import { useNavigate } from "react-router-dom";

const SigninPage=()=>{

    let nav = useNavigate();
    return(
        <div id="Login">
            <img id="Login_g" src="./Images/Login_g.png" srcSet="./Images/Login_g.png 1x, ./Images/Login_g@2x.png 2x"/>
            
            <div id="LoginGroup">
                    <div id="Sign_In">
                        <span>Sign In</span>
                    </div>
                    <div className="AuthInputForm">
                        <ul>
                            <SignIFormComp></SignIFormComp>
                        </ul>
                        <hr></hr>
                        <ul>
                            <div className="AccountPasswordForget"> 
                                    <h4>Create Account?</h4>
                                    <button className="SignUp" onClick={()=>nav("/create-account")}>SignUp</button>
                            </div>
                        </ul>
                    </div>
            </div>
    </div>
    );
}
export default SigninPage;