import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import Logout from '../components/Logout';


function NavBar() {
    const {isAuth} = useContext(AuthContext)
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark container-xl">

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul class="nav justify-content-center">
                <div className="navbar-nav">
                    <NavLink to="/" exact className="btn btn-outline-success"> Home </NavLink>
                    <NavLink to="/register" exact className="btn btn-light">Add Users </NavLink>
                    <NavLink to="/allusers" exact className="btn btn-light"> All Users </NavLink>
                            <NavLink to="/addnote" exact className="btn btn-light"> Add Notes </NavLink>
                            <NavLink to="/allnotes" exact className="btn btn-light"> All Notes </NavLink>
                    {
                        isAuth ?
                        <Logout /> :
                        <div>
                            <NavLink to="/login">
                                <button className="btn btn-outline-success"> Log in </button> 
                            </NavLink>
                            
                        </div>
                    }
                </div></ul>
            </div>
        </nav>
    )
}

export default NavBar