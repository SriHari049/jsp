import React, { Component } from 'react';
import './App.css';
class App extends Component {
  render() {
    return (
      <div id = 'container'>
        <div id ='header'>
          <img className='logo' src="/logo.png" alt=""/>
          <div className='title'><span>Job </span>Portal</div>
          <img className='signinlogo' src="/user.png" alt=""/> 
          <div className='signintext'>signin</div></div>

        <div id ='content'>
          <div className='text1'>INDIA'S #1 JOB PLATFORM</div>
          <div className='text2'>Your job search ends here</div>
          <div className='text3'>Discover career opertunities</div>
          <div className='searchBar'>
            <input type='text' id='searchText' placeholder='Search jobs by "skill"'></input>
            <input type='text' id='searchlocation' placeholder='Search Jobs by "location"'></input>
            <button id='SearchButton'>Search Jobs</button>
          </div>
        </div>

        <div id ='footer'>
          <div className='copyrightText'>Copyright @2024 All rights are reserved</div>
          <img className='socialmedia' src="/twitter.png"></img>
          <img className='socialmedia' src="/facebook.png"></img>
          <img className='socialmedia' src="/linkedin.png"></img>
        </div>

        
      </div>
    );
  }
}

export default App;
