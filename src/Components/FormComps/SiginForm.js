import React from "react";



const SignIFormComp=(props)=>{
    return(
        <form className="Authform" onSubmit={props.GotoPretest}>
            <li><input placeholder="Enter Your EMail" type="email" onChange={props.EmailInput}></input></li>
            <li><input placeholder="Enter Your Password" type="password" onChange={props.PassInput}></input></li>
            <li><a className="ForgetPass">Forget Password?</a></li>
            <li><button type="submit">Submit</button></li>
        </form>
    );
}

export default SignIFormComp;