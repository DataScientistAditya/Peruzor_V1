import React from "react";



const SignUpFormComp=()=>{
    return(
        <form className="Authform">
            <li><input placeholder="Enter Your EMail" type="email"></input></li>
            <li><input placeholder="Enter Your Username" type="text"></input></li>
            <li><input placeholder="Enter Your Password" type="password"></input></li>
            <li><button type="submit">Sign Up</button></li>
        </form>
    );
}

export default SignUpFormComp;