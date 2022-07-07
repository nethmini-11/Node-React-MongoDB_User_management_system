import React, { Component} from 'react';
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class ViewUsers extends Component {
    constructor(props){
        super(props);

        this.state={
            users:[]
        };
    }
    
    componentDidMount() {
        this.retriveUsers();
    }
    
    retriveUsers(){
        axios.get("http://localhost:5000/ManageUsers").then(res => {
            if(res.data.success){
                this.setState({
                    users: res.data.existingManageUsers
                });
                console.log(this.state.users);
            }
        });
    }
    
    onDelete = (id) => {
        axios.delete('http://localhost:5000/ManageUsers/delete/' +id).then((res) => {
            alert("Marking Delete Successfully");
            this.retriveUsers();
        })
    }

    filterData(users,searchKey){
        const result = users.filter((user) => 
            //user.uid.includes(searchKey)||
            user.firstName.toLowerCase().includes(searchKey)||
            user.email.toLowerCase().includes(searchKey)
        )
        this.setState({users:result})
    }

    handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;

        axios.get("http://localhost:5000/ManageUsers").then(res => {
            if(res.data.success){
                this.filterData(res.data.existingManageUsers,searchKey)
            }
        });
    }
    
    render() {
        return (
        <Container>
            <br></br><br></br>
            <h4>MANAGE ALL USERS</h4>
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
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Date Of Birth</th>
                        <th>Mobile number</th>
                        <th>Status</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.users.map((users) => (
                        <tr key={users}>
                            <td>{users.uid}</td>
                            <td>
                                <a href={'/marking/view/'+users._id} style={{ textDecoration: 'none' }}>
                                {users.firstName}
                                </a>
                            </td>
                            <td>{users.lastName}</td>
                            <td>{users.email}</td>
                            <td>{users.dateOfBirth}</td>
                            <td>{users.mobile}</td>
                            <td>{users.status}</td>
                            <td>{users.password1}</td>
                            <td>{users.role}</td>
                            <td>
                                
                        

        <Link className="btn btn-success" to={`/editusers/${users._id}`}>
            Update
          </Link><br></br><br></br>
                                <a className="btn btn-danger " href="/delete-user" onClick={() => this.onDelete(users._id)} >
                                    <i className="far fa-trash-alt"></i>&nbsp;Delete
                                </a>
                            </td>
                        </tr> 
                    ))}
                </tbody>
            </Table>
            <br/>
            <hr></hr>

            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="submit" className="btn btn-outline-dark">
                    <Link to="/register">Add New User</Link>
                </button>
            </div>


            <br></br><br/><br/>
        </Container>
        )
    }
}