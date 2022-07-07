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
            role:role
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
                        role:""
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


                    uid:res.data.ManageUsers.uid,
                    firstName:res.data.ManageUsers.firstName,
                    lastName:res.data.ManageUsers.lastName,
                    email:res.data.ManageUsers.email,
                    dateOfBirth:res.data.ManageUsers.dateOfBirth,
                    mobile:res.data.ManageUsers.mobile,
                    status:res.data.ManageUsers.status,
                    password:res.data.ManageUsers.password,
                    password1:res.data.ManageUsers.password1,
                    role:res.data.ManageUsers.role
                });
                console.log(this.state.ManageUsers);
            }
        });
    }

    render() {
        return (
            <Container>
                <br></br><br></br><h4>Edit User Details</h4><br></br><hr></hr><br></br>
            <form >
            
            <div className="form-group">
                <input name="uid" type="number" onChange={this.handleInput} className="form-control" value={this.state.uid} placeholder="User ID" disabled />
            </div><br></br><br></br>
            <div className="form-group">
                <input name="firstName" type="text" onChange={this.handleInput} className="form-control" value={this.state.firstName} placeholder="First Name"/>
            </div><br></br><br></br>
            <div className="form-group">
                <input name="lastName" type="text" onChange={this.handleInput} className="form-control"value={this.state.lastName} placeholder="Last Name"/>
            </div><br></br><br></br>
            <div className="form-group">
                <input name="email" type="text" onChange={this.handleInput} className="form-control" value={this.state.email} placeholder="Email"/>
            </div><br></br><br></br>
            <div className="form-group">
                <input name="dateOfBirth" type="Date" onChange={this.handleInput} className="form-control" value={this.state.dateOfBirth} placeholder="Date Of Birth"/>
            </div><br></br><br></br>
            <div className="form-group">
                <input name="mobile" type="text" onChange={this.handleInput} className="form-control" value={this.state.mobile} placeholder="Valid mobile number"/>
            </div><br></br><br></br>
            <div className="form-group">
                <input name="status" type="text" onChange={this.handleInput} className="form-control" value={this.state.status} placeholder="verified / Not verified"/>
            </div><br></br><br></br>
            <div className="form-group">
                <input name="password" type="password" onChange={this.handleInput} className="form-control" value={this.state.password} placeholder="Password" disabled/>
            </div><br></br><br></br>
            <div className="form-group">
                <input name="password1" type="password" onChange={this.handleInput} className="form-control" value={this.state.password1} placeholder="Re enter your Password" disabled/>
            </div><br></br><br></br>
            <div className="form-group">
                <input name="role" type="text" onChange={this.handleInput} className="form-control" value={this.state.role} placeholder="Role(admin or user)"/>
            </div><br></br><br></br>
           
            <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Update User</button>
            <a href="/allusers" className="btn btn-danger my-2">
           View All Users
        </a>
        </form>
            
            
            </Container>
            
        )
    }
}