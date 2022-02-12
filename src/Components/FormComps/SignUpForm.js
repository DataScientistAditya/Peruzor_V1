import React from "react";



const SignUpFormComp=(props)=>{
    return(
        <form className="Authform" onSubmit={props.GotoPretest}>
            <li><input placeholder="Enter Your EMail" type="email"></input></li>
            <li><input placeholder="Enter Your Username" type="text"></input></li>
            <li><input placeholder="Enter Your Password" type="password"></input></li>
            <li><button type="submit">Sign Up</button></li>
        </form>
    );
}

export default SignUpFormComp;