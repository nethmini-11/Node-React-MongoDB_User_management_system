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
                props.history.replace("/allusers")
            }   
            else {
                console.log("...register error...", jsonData)
            }
        })
    }
	return (
        
        
		<form onSubmit={handleRegister}>
            <br></br><br></br>
            <div class="container2">
            <h3>Create Users </h3>
            <div className="form-group">
                <input id="uid" type="number" onChange={handleInput}  className="form-control" placeholder="User ID"/>
            </div><br></br><br></br>
            <div className="form-group">
                <input id="firstName" type="text" onChange={handleInput} className="form-control" placeholder="First Name"/>
            </div><br></br><br></br>
            <div className="form-group">
                <input id="lastName" type="text" onChange={handleInput}  className="form-control" placeholder="Last Name"/>
            </div><br></br><br></br>
            <div className="form-group">
                <input id="email" type="text" onChange={handleInput}  className="form-control" placeholder="Email"/>
            </div><br></br><br></br>
            <div className="form-group">
                <input id="dateOfBirth" type="Date" onChange={handleInput}  className="form-control" placeholder="Date Of Birth"/>
            </div><br></br><br></br>
            <div className="form-group">
                <input id="mobile" type="text" onChange={handleInput}  className="form-control" placeholder="Valid mobile number"/>
            </div><br></br><br></br>
            <div className="form-group">
                <input id="status" type="text" onChange={handleInput}  className="form-control" placeholder="verified / Not verified"/>
            </div><br></br><br></br>
            <div className="form-group">
                <input id="password" type="password" onChange={handleInput}  className="form-control" placeholder="Password"/>
            </div><br></br><br></br>
            <div className="form-group">
                <input id="password1" type="password" onChange={handleInput}  className="form-control" placeholder="Re enter your Password"/>
            </div><br></br><br></br>
            <div className="form-group">
                <input id="role" type="text" onChange={handleInput}  className="form-control" placeholder="Role(admin or user)"/>
            </div><br></br><br></br>
    
            <button type="submit" className="btn btn-primary">Submit</button><br></br><br></br><br></br></div>
        </form>
	)
}

