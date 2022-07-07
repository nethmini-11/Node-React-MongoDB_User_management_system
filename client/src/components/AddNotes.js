import React, { Component } from 'react'
import Container  from "react-bootstrap/Container";
import axios from 'axios';

export default class Adduser extends Component {

    constructor(props){
        super(props);
        this.state={
            title:"",
            description:""
            
        }
    }

    handleInputChange = (e) => {
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {title,description} = this.state;
        const data = {
            title:title,
            description:description
        }
        console.log(data);

        axios.post("http://localhost:5000/StudentNote/add",data).then((res) => {
            if(res.data.success){
                alert("StudentNote Added Successfully!")
                this.setState(
                    {
                        title:"",
                        description:""
                        
                    }
                )
            }
        })
    }

    render() {
        return (
            <Container>
                <div class="row">
            <div class="col">
    <img className="img2" src="img2.png" alt=''/>
        </div>
        <div class="col">
                <br></br><br></br><h4>Add New Note</h4><br></br><hr></hr><br></br>
            <form className="row g-3">

                    <div className="col-md-6">
                        <label className="form-label">Add Title</label>
                        <input type="text" className="form-control" name="title" placeholder="Enter note title..."
                            value={this.state.title}
                            onChange={this.handleInputChange} />
                    </div><br></br><br></br>

                    <div className="col-md-6">
                        <label className="form-label">Write Description</label>
                        <input type="text" className="form-control" name="description" placeholder="Write your note..."
                            value={this.state.description}
                            onChange={this.handleInputChange} />
                    </div>

                    <br/><br/>
                    <hr/>
                    <br></br><br></br>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Add Note</button>
                        <a href="/allnotes" className="btn btn-danger my-2">
          View My Notes
        </a>
                    </div>
                    
            </form></div></div>
            
            <br/><br/><br/><br/>
            </Container>
            
        )
    }
}