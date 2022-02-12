import React,{ useState } from "react";
import "./Signin.css";
import SignIFormComp from "../FormComps/SiginForm";
import { useNavigate } from "react-router-dom";

const SigninPage=()=>{

    const [email,SetEmail]= useState("");
    const [password,SetPassword] = useState("");

    let nav = useNavigate();
    let username = "aditya";

    const EmailInputHandler=(event)=>{
        SetEmail(event.target.value);
        console.log(email);
    };
    const PassInputHandler=(event)=>{
        SetPassword(event.target.value);
    };
    return(
        <div id="Login">
            <img id="Login_g" src="./Images/Login_g.png" srcSet="./Images/Login_g.png 1x, ./Images/Login_g@2x.png 2x"/>
            
            <div id="LoginGroup">
                    <div id="Sign_In">
                        <span>Sign In</span>
                    </div>
                    <div className="AuthInputForm">
                        <ul>
                            <SignIFormComp GotoPretest={()=>nav("/pretest/"+username)} EmailInput={EmailInputHandler} PassInput={PassInputHandler}></SignIFormComp>
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