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
                    <NavLink to="/" exact className="nav-item nav-link"> Home </NavLink>
                    <NavLink to="/admin" exact className="nav-item nav-link"> Admin </NavLink>
                    <NavLink to="/addnote" exact className="nav-item nav-link"> Add Notes </NavLink>
                    <NavLink to="/allusers" exact className="nav-item nav-link"> All Users </NavLink>
                    <NavLink to="/register">
                                <button className="nav-item btn btn-dark"> Add Users </button>
                            </NavLink>
                            <NavLink to="/allnotes" exact className="nav-item nav-link"> All Notes </NavLink>
                    {
                        isAuth ?
                        <Logout /> :
                        <div>
                            <NavLink to="/login">
                                <button className="nav-item btn btn-dark"> Log in </button> 
                            </NavLink>
                            
                        </div>
                    }
                </div></ul>
            </div>
        </nav>
    )
}

export default NavBar