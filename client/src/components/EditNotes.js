import React, { Component } from 'react'
import Container  from "react-bootstrap/Container";
import axios from 'axios';

export default class EditNotes extends Component {

    constructor(props){
        super(props);
        this.state={
            title:"",
            description:"",
            
        }
    }

    handleInput = (e) => {
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const id = this.props.match.params.id;

        const {title,description} = this.state;
        const data = {
            title:title,
            description:description
        }
        console.log(data);

        axios.put(`http://localhost:5000/StudentNote/update/${id}` ,data).then((res) => {
            if(res.data.success){
                alert("StudentNote Updated Successfully!")
                this.setState(
                    {
                        title:"",
                        description:""
                        
                    }
                )
            }
        })
    }

    componentDidMount(){
        const id = this.props.match.params.id;

        axios.get(`http://localhost:5000/StudentNote/${id}`).then((res) => {
            if(res.data.success){
                this.setState({
                    title:res.data.StudentNote.title,
                    description:res.data.StudentNote.description
                });
                console.log(this.state.StudentNote);
            }
        });
    }

    render() {
        return (
            <Container>
                <br></br><br></br><h4>Add New Note</h4><br></br><hr></hr><br></br>
            <form className="row g-3">

                    

                    <div className="col-md-6">
                        <label className="form-label">Add Title</label>
                        <input type="text" className="form-control" name="title" placeholder="Enter note title..."
                            value={this.state.title}
                            onChange={this.handleInput} />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Write Description</label>
                        <input type="text" className="form-control" name="description" placeholder="Write your note..."
                            value={this.state.description}
                            onChange={this.handleInput} />
                    </div>

                    <br/><br/>
                    <hr/>
                    <br></br><br></br>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Update Note</button>
                        <a href="/allnotes" className="btn btn-danger my-2">
            View My Notes
        </a>
                    </div>
            </form>
            
            <br/><br/><br/><br/>
            </Container>
            
        )
    }
}