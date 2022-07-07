import React, {useState, useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import AuthService from '../services/AuthService';


export default function Login(props) {
    const {setUser, setIsAuth} = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(null);

    function handleInput(event) {
        setUserInfo({...userInfo, [event.target.id]: event.target.value})
    }

    function handleLogin(event) {
        event.preventDefault();
        AuthService.login(userInfo).then(jsonData => {
            const {isAuthenticated, user} = jsonData;
            setUser(user);
            setIsAuth(isAuthenticated);

            if(isAuthenticated){
                if (props.location.state)
                    props.history.replace(props.location.state.from.pathname)
                else
                    props.history.replace("/")
            }   
                
        })
    }

    return (
        <form onSubmit={handleLogin}>
            <br></br><br></br><br></br>
            <div class="row">
            <div class="col">
    <img className="img4" src="login.jpg" alt=''/>
        </div>
        <div class="col">
            <h3>Login...</h3>
            <div className="form-group">
                <input id="email" type="text" onChange={handleInput} className="form-control" placeholder="Email"/>
            </div>
            <br></br><br></br>
            <div className="form-group">
                <input id="password" type="password" onChange={handleInput} className="form-control" placeholder="Password"/>
            </div>
            <br></br><br></br>
            <button type="submit" className="btn btn-primary">Submit</button>
       </div></div> </form>
    )
}
