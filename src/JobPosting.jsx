import React, { Component } from 'react';
import { callApi } from './api';
import './JobPosting.css';

class JobPosting extends Component {
    constructor()
    {
        super();
        this.state = { id : "", title : "", company : "", location : "", jobtype : "", salary : "", description : "" };
        this.state = { jobsList : []};
        this.readResponse = this.readResponse.bind(this);
        this.updateResponse = this.updateResponse.bind(this);
        this.saveResponse = this.saveResponse.bind(this);
    }

    componentDidMount()
    {
        callApi("GET", "http://localhost:8081/jobs/read", "", this.readResponse);
    }

    readResponse(response)
    {
        if(response.includes("404::"))
        {
            alert(response.split("::")[1]);
            return;
        }
        let data = JSON.parse(response);
        this.setState({jobsList : data});
    }
    showpopup(headings)
    {
        let h = document.getElementById("heading");        
        h.textContent = headings;
        jppopup.style.display = "block";
    }

    closepopup()
    {
        jppopup.style.display = "none";
        this.setState({ id : "", title : "", company : "", location : "", jobtype : "", salary : "", description : "" });
    }

    loadInputChange(event)
    {
        this.setState({[event.target.name] : event.target.value})
    }

    saveData()
    {
        var data = JSON.stringify(this.state);
        if(this.state.id === "")
            callApi("POST", "http://localhost:8081/jobs/createjobs", data, this.saveResponse);
        else
            callApi("PUT", "http://localhost:8081/jobs/update", data, this.saveResponse );
    }

    saveResponse(res)
    {
        let resData = res.split("::");
        alert(resData[1]);
        this.componentDidMount();
        this.closepopup();
    }

    updateData(id)
    {
        callApi("GET", "http://localhost:8081/jobs/getdata/" + id, "", this.updateResponse);
    }
    updateResponse(res)
    {
        if(res.includes("404::"))
        {
            alert(res.split("::")[1]);
            return;
        }

        let data = JSON.parse(res);
        this.setState({
            id : data.id, title : data.title, company : data.company, location : data.location, jobtype : data.jobtype, salary : data.salary, description : data.description
        });
        
        this.showpopup("EDIT JOB DETAIL");
    }

    deleteData(id)
    {
        let res = confirm('Click "OK" to Delete this JOB');
        if(res === false)            
            return;
                   
        callApi("DELETE", "http://localhost:8081/jobs/delete/" + id, "", this.saveResponse);
    }


    render() {

        const {id, title, company, location, jobtype, salary, description} = this.state;
        const {jobsList} = this.state;
        return (
            <div className='jpcontainer'>
                <div id='jppopup' className='popup'>
                    <div className='popupwindow'>
                        <div className='popupheader'>
                            <label id='heading'>CREATE NEW JOB</label>
                            <span onClick={()=>this.closepopup()}>&times;</span>
                        </div>
                        <div className='popupcontent'>
                            <label>Job Title</label>
                            <input type='text' id='T1' name='title' value={title} onChange={(event)=>this.loadInputChange(event)}></input>
                            <label>Company Name</label>
                            <input type='text' id='T2' name='company' value={company} onChange={(event)=>this.loadInputChange(event)}></input>
                            <label>Location</label>
                            <input type='text' id='T3' name='location' value={location} onChange={(event)=>this.loadInputChange(event)}></input>
                            <label>Job Type</label>
                            <select id='T4' name='jobtype' value={jobtype} onChange={(event)=>this.loadInputChange(event)}>
                                <option value="0"></option>
                                <option value="1">Full-time</option>
                                <option value="2">Part-time</option>
                            </select>
                            <label>Salary</label>
                            <input type='text' id='T5' name='salary' value={salary} onChange={(event)=>this.loadInputChange(event)}></input>
                            <label>Job Description</label>
                            <textarea id='T6' rows="5" name='description' value={description} onChange={(event)=>this.loadInputChange(event)}></textarea>
                            <button onClick={()=>this.saveData()}>Save</button>
                        </div>
                        <div className='popupfooter'></div>
                    </div>
                </div>

                <div className='header'>
                    <label>All Jobs</label>
                </div>
                <div className='content'>
                    {jobsList.map((row)=>(
                        <div className='result'>
                            <div className='div1'>
                                <label>{row.title}</label>
                                <span>{row.salary}</span>
                                <img src="/delete.png" alt="" onClick={()=>this.deleteData(row.id)} />
                                <img src="edit.png" alt="" onClick={()=>this.updateData(row.id)} />
                            </div>
                            <div className='div2'>
                                {row.company} | {row.location} | {row.jobtype == "1" ? "Full-Time" : "Part-Time"}
                            </div>
                            <div className='div3'>
                                {row.description}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='footer'>
                    <button onClick={()=>this.showpopup("CREATE NEW JOB")}>Add New Job</button>
                </div>                
            </div>
        );
    }
}

export default JobPosting;