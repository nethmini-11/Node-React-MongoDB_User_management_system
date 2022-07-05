import React, { Component } from 'react'
import Container  from "react-bootstrap/Container";
import axios from 'axios';

export default class EditUsers extends Component {

    constructor(props){
        super(props);
        this.state={
            uid:"",
            firstName:"",
            lastName:"",
            email:"",
            dateOfBirth:"",
            mobile:"",
            status:"",
            password:"",
            password1:"",
            role:"",
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

        const {uid,firstName,lastName,email,dateOfBirth,mobile,status,password,password1,role} = this.state;
        const data = {
            uid:uid,
            firstName:firstName,
            lastName:lastName,
            email:email,
            dateOfBirth:dateOfBirth,
            mobile:mobile,
            status:status,
            password:password,
            password1:password1,
            role:role,
        }
        console.log(data);

        axios.put(`http://localhost:5000/ManageUsers/update/${id}` ,data).then((res) => {
            if(res.data.success){
                alert("User Details Updated Successfully!")
                this.setState(
                    {
                        uid:"",
                        firstName:"",
                        lastName:"",
                        email:"",
                        dateOfBirth:"",
                        mobile:"",
                        status:"",
                        password:"",
                        password1:"",
                        role:"",
                    }
                )
            }
        })
    }

    componentDidMount(){
        const id = this.props.match.params.id;

        axios.get(`http://localhost:5000/ManageUsers/${id}`).then((res) => {
            if(res.data.success){
                this.setState({


                    uid:res.data.uid,
                    firstName:res.data.firstName,
                    lastName:res.data.lastName,
                    email:res.data.email,
                    dateOfBirth:res.data.dateOfBirth,
                    mobile:res.data.mobile,
                    status:res.data.status,
                    password:res.data.password,
                    password1:res.data.password1,
                    role:res.data.role,
                });
                console.log(this.state.ManageUsers);
            }
        });
    }

    render() {
        return (
            <Container>
                <br></br><br></br><h4>Edit Marking Schema</h4><br></br><hr></hr><br></br>
            <form >
            <br></br>
            <h3>Register...</h3>
            <div className="form-group">
                <input id="uid" type="number" onChange={this.handleInput} className="form-control" value={this.state.uid} placeholder="User ID"/>
            </div>
            <div className="form-group">
                <input id="firstName" type="text" onChange={this.handleInput} className="form-control" value={this.state.firstName} placeholder="First Name"/>
            </div>
            <div className="form-group">
                <input id="lastName" type="text" onChange={this.handleInput} className="form-control" placeholder="Last Name"/>
            </div>
            <div className="form-group">
                <input id="email" type="text" onChange={this.handleInput} className="form-control" placeholder="Email"/>
            </div>
            <div className="form-group">
                <input id="dateOfBirth" type="Date" onChange={this.handleInput} className="form-control" placeholder="Date Of Birth"/>
            </div>
            <div className="form-group">
                <input id="mobile" type="text" onChange={this.handleInput} className="form-control" placeholder="Valid mobile number"/>
            </div>
            <div className="form-group">
                <input id="status" type="text" onChange={this.handleInput} className="form-control" placeholder="verified / Not verified"/>
            </div>
            <div className="form-group">
                <input id="password" type="password" onChange={this.handleInput} className="form-control" placeholder="Password"/>
            </div>
            <div className="form-group">
                <input id="password1" type="password" onChange={this.handleInput} className="form-control" placeholder="Re enter your Password"/>
            </div>
            <div className="form-group">
                <input id="role" type="text" onChange={this.handleInput} className="form-control" placeholder="Role(admin or user)"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
            <br/><br/><br/><br/>
            <a href="/allmarking" className="btn btn-danger my-2">
          Reload Contact
        </a>
            </Container>
            
        )
    }
}