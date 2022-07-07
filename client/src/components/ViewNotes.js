import React, { Component} from 'react';
import axios from "axios";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class ViewNotes extends Component {
    constructor(props){
        super(props);

        this.state={
            notes:[]
        };
    }
    
    componentDidMount() {
        this.retriveStudentNote();
    }
    
    retriveStudentNote(){
        axios.get("http://localhost:5000/StudentNote").then(res => {
            if(res.data.success){
                this.setState({
                    notes: res.data.existingStudentNote
                });
                console.log(this.state.notes);
            }
        });
    }
    
    onDelete = (id) => {
        axios.delete('http://localhost:5000/StudentNote/delete/' +id).then((res) => {
            alert("Marking Delete Successfully");
            this.retriveStudentNote();
        })
    }

    filterData(notes,searchKey){
        const result = notes.filter((note) => 
            note.title.includes(searchKey)
        )
        this.setState({notes:result})
    }

    handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;

        axios.get("http://localhost:5000/StudentNote").then(res => {
            if(res.data.success){
                this.filterData(res.data.existingStudentNote,searchKey)
            }
        });
    }
    
    render() {
        return (
        <Container>
            <br></br><br></br>
            <h4>MANAGE ALL NOTES</h4>
            <br></br><hr></hr>

            <div className="row">
                <div className="col-lg-3 mt-2 mb-2">
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Search"
                        name="searchQuery"
                        onChange={this.handleSearchArea}>
                    </input>
                </div>
            </div>

            <br></br>
            <div class="row">
            <div class="col">
    <img className="img1" src="img1.png" alt=''/>
        </div>
        <div class="col">
            <p>You Can See Your Notes Here</p>
            <div class="container1">
                  
                    {this.state.notes.map((notes)  => (
                      <tr
                        
                        
                      >
                        
                        <div className="form-group1" ># </div>
                        <div className="form-group2">Title: {notes.title}</div>
                        <div className="form-group2">Description : {notes.description}</div><br></br>
                        <Link className="btn btn-primary" to={`/edit/${notes._id}`}>
                         Update
                         </Link>
                                <a className="btn btn-danger" href="/delete-note" onClick={() => this.onDelete(notes._id)} >
                                    <i className="far fa-trash-alt"></i>&nbsp;Delete
                                </a>
                        <p>-----------------------------------------------------------</p><br></br><br></br>
                       
                      </tr>
                    ))}
                  </div></div></div>
            <br/>
            <hr></hr>

            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="submit" className="btn btn-outline-primary">
                    <Link to="/addnote">Add New Note</Link>
                </button>
            </div>


            <br></br><br/><br/>
        </Container>
        )
    }
}