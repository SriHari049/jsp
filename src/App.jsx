import React, { Component } from 'react';
import './App.css';
import { callApi, setSession } from './api.js';

class App extends Component {

    constructor()
    {
        super();
        this.userRegistration = this.userRegistration.bind(this);
        this.signIn = this.signIn.bind(this);
        
    }

    showSignin(){
        let popup = document.getElementById("popup");
        popup.style.display = "block";
        let signin = document.getElementById("signin");
        signin.style.display = "block";
        let signup = document.getElementById("signup");
        signup.style.display = "none";
        let popupHeader = document.getElementById("popupHeader");
        popupHeader.innerHTML = "Log In";
        username.value = "";
        password.value = "";
        div1.innerHTML = "";
        
    }
    closeSignin(event){
        if(event.target.id === 'popup')
        {
            let popup = document.getElementById("popup");
            popup.style.display = "none";
        }       
    }

    showSignup(){
        let popup = document.getElementById("popup");
        popup.style.display = "block";
        let signin = document.getElementById("signin");
        signin.style.display = "none";
        let signup = document.getElementById("signup");
        signup.style.display = "block";
        let popupHeader = document.getElementById("popupHeader");
        popupHeader.innerHTML = "Create New Account";



    }

    userRegistration()
    {
        let fullName = document.getElementById("userFullname");
        let email = document.getElementById("email");
        let role = document.getElementById("role");
        let password = document.getElementById("signupPassword");
        let confirmPassword = document.getElementById("confirmPassword");

        if(fullName.value === "")
        {
            fullName.style.border = "1px solid red";
            fullName.focus();
            return;
        }
        if(email.value === "")
        {
            email.style.border = "1px solid red";
            email.focus();
            return;
        }
       
        if(role.value === "")
        {
            role.style.border = "1px solid red";
            role.focus();
            return;
        }
        if(password.value === "")
        {
            password.style.border = "1px solid red";
            password.focus();
            return;
        }
        if(confirmPassword.value === "")
        {
            confirmPassword.style.border = "1px solid red";
            confirmPassword.focus();
            return;
        }
        if(signupPassword.value != confirmPassword.value)
        {
            signupPassword.style.border = "1px solid red" ;
            signupPassword.focus();
            alert("password and confirm password should be same");
            return;
        }

        var data = JSON.stringify({
            fullname : fullName.value,
            email : email.value,
            role : role.value,
            password : password.value
        });

        callApi("POST", "http://localhost:8081/users/insert", data, this.getResponse);
    }

    getResponse(res)
    {
        alert(res);
    }

    signIn()
    {
        if(username.value === "")
        {
            username.style.border = "1px solid red";
            username.focus();
            return;
        }
        if(password.value === "")
        {
            password.style.border = "1px solid red";
            password.focus();
            return;
        }
        var data = JSON.stringify({
            email : username.value,
            password : password.value
        });
        callApi("POST", "http://localhost:8081/users/signin", data, this.signinResponse);
    
    }
    signinResponse(resp)
    {
        let resdata = resp.split("::");
        if(resdata[0] == "200")
        {
            setSession("csrid", resdata[1], 1);
            window.location.replace("/dashboard");
        }
        else{
            div1.innerHTML = resdata[1];
        }


    }

    render() {
        return (
            <div id='container'>
                <div id='popup' onClick={this.closeSignin}>
                    <div id='popupWindow'>
                        <div id='popupHeader'>Log In</div>
                        <div id='signin'>
                            <label id='usernameLabel'>User Name*</label>
                            <input type='text' id='username'></input>
                            <label id='passwordLabel'>Password*</label>
                            <input type='password' id='password'></input>
                            <div id='forgotPassword'>Forgot<span> Password?</span></div>
                            <button id='signinButton' onClick={this.signIn}>Sign In</button>
                            <div id='div1'></div>
                            <div id='div2'>Don't have an account?<span onClick={this.showSignup}>SIGN UP NOW</span></div>
                        </div> 
                        <div id='signup'>
                            <label id='fullnameLabel'>User Full Name</label>
                            <input id='userFullname' type='text'></input>
                            <label id='emailLabel'>Email Id</label>
                            <input id='email' type='text'></input>
                            <label id='roleLabel'>Select Role</label>
                            <select id='role'>
                                <option value="0"></option>
                                <option value="1">Admin</option>
                                <option value="2">Employer</option>
                                <option value="3">Seeker</option>
                            </select>
                            <label id='passwordLabel'>Password</label>
                            <input id='signupPassword' type='password'></input>
                            <label id='confirmPasswordLabel'>Confirm Password</label>
                            <input id='confirmPassword' type='password'></input>
                            <button id='signupButton' onClick={this.userRegistration}>Register</button>
                            <div id='div3'>Already have an account?<span onClick={this.showSignin}>Log In</span></div>

                        </div>                       
                    </div>
                </div>

                <div id='header'>
                    <img className='logo' src="/logo.png" alt="" />
                    <div className='headerText'><span>Job </span>Portal</div>
                    <img   className='signinLogo' src="/user.png" alt="" onClick={this.showSignin}/>
                    <div className='signinText' onClick={this.showSignin}>Sign In</div>
                </div>
                
                
                <div id='content'>
                    <div className='text1'>INDIA'S #1 JOB PLATFORM</div>
                    <div className='text2'>Your job search ends here</div>
                    <div className='text3'>Dicover career opertunities</div>
                    <div className='searchBar'>
                        <input type='text' id='searchText' placeholder='Search jobs by "Skill"'></input>
                        <input type='text' id='searchLocation' placeholder='Search jobs by "Location"'></input>
                        <button id='searchButton'>Search Jobs</button>
                    </div>
                </div>

                <div id='footer'>
                    <div className='copyrightText'>Copyright @2024 All rights reserved</div> 
                    <img className='socialmediaIcon' src='/facebook.png'></img>
                    <img className='socialmediaIcon' src='/twitter.png'></img>
                    <img className='socialmediaIcon' src='/linkedin.png'></img>
                </div>
            </div>
        );
    }
}

export default App;
