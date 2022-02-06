import React from "react";



const SignIFormComp=()=>{
    return(
        <form className="Authform">
            <li><input placeholder="Enter Your EMail" type="email"></input></li>
            <li><input placeholder="Enter Your Password" type="password"></input></li>
            <li><a className="ForgetPass">Forget Password?</a></li>
            <li><button type="submit">Submit</button></li>
        </form>
    );
}

export default SignIFormComp;