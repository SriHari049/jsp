import React, { Component } from 'react';
import { callApi, getSession, setSession } from './api';
import './Dashboard.css';
import JobPosting from './JobPosting';
import JobSearch from './JobSearch';
import Menubar from './Menubar';
import MyProfile from './Profile';

class Dashboard extends Component {

    constructor(props)
    {
        super(props);
        this.state = {fullname : "",activeComponents:""};
        this.showFullname=this.showFullname.bind(this);
        this.logout=this.logout.bind(this);
        this.loadComponents= this.loadComponents.bind(this);
            
    }
    componentDidMount()
    {
        
        let csr = getSession("csrid");
        if(csr === "")
        {
           this.logout;
        }       
       
        var data = JSON.stringify({csrid : csr});
        
        callApi("POST", "http://localhost:8081/users/getfullname", data, this.showFullname);
    }
    showFullname(response)
    {
        this.setState({fullname : response});
    }
    logout()
    {
        setSession("csrid","", -1);
        window.location.replace("/");
    }
    loadComponents(mid){
        let components={
            "1" :<JobPosting/>,
            "2" :<JobSearch/>,
            "3" :<MyProfile/>      
    };
      this.setState({activeComponents : components[mid]});
}

        render() {
        const {fullname,activeComponents} = this.state;
        
       
        return (
            <div className='Dashboard'> 
            <div className='header'>
                <img className="logo" src="/logo.png" alt=""/>
                <div className='headerText'> <span>Job</span> Portal</div>
                <img className='signoutLogo' src="/logout.jpg" alt=""onClick={this.logout}/>
                <div className='signoutText'>{fullname}</div>
            </div>
            <div className='menu'> <Menubar onMenuClick={this.loadComponents}></Menubar> </div>
            <div className='outlet'>{activeComponents}</div>
            
            </div>

        );
    }
}

export default Dashboard;