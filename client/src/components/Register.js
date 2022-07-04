import React, {useState, useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import AuthService from '../services/AuthService';


export default function Register(props) {
    const {setUser, setIsAuth} = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(null);

    function handleInput(event) {
        setUserInfo({...userInfo, [event.target.id]: event.target.value})
    }

    function handleRegister(event) {
        event.preventDefault();
        AuthService.register(userInfo).then(jsonData => {
            if(!jsonData.error) {
                setUser(jsonData.user);
                setIsAuth(jsonData.isAuthenticated);
                props.history.replace("/")
            }   
            else {
                console.log("...register error...", jsonData)
            }
        })
    }

    return (
        <form onSubmit={handleRegister}>
            <br></br>
            <h3>Register...</h3>
            <div className="form-group">
                <input id="uid" type="number" onChange={handleInput} className="form-control" placeholder="User ID"/>
            </div>
            <div className="form-group">
                <input id="firstName" type="text" onChange={handleInput} className="form-control" placeholder="First Name"/>
            </div>
            <div className="form-group">
                <input id="lastName" type="text" onChange={handleInput} className="form-control" placeholder="Last Name"/>
            </div>
            <div className="form-group">
                <input id="email" type="text" onChange={handleInput} className="form-control" placeholder="Email"/>
            </div>
            <div className="form-group">
                <input id="dateOfBirth" type="Date" onChange={handleInput} className="form-control" placeholder="Date Of Birth"/>
            </div>
            <div className="form-group">
                <input id="mobile" type="text" onChange={handleInput} className="form-control" placeholder="Valid mobile number"/>
            </div>
            <div className="form-group">
                <input id="status" type="text" onChange={handleInput} className="form-control" placeholder="verified / Not verified"/>
            </div>
            <div className="form-group">
                <input id="password" type="password" onChange={handleInput} className="form-control" placeholder="Password"/>
            </div>
            <div className="form-group">
                <input id="password1" type="password" onChange={handleInput} className="form-control" placeholder="Re enter your Password"/>
            </div>
            <div className="form-group">
                <input id="role" type="text" onChange={handleInput} className="form-control" placeholder="Role(admin or user)"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
