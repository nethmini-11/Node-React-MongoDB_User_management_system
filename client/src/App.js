import NavBar from "./components/NavBar";
import {BrowserRouter as Router, Route} from "react-router-dom";
import PrivateRoute from "./higher_order_component/PrivateRoute";
import UnPrivateRoute from "./higher_order_component/UnPrivateRoute";
import Home from "./components/Home";
import Protect1 from "./components/Protect1";
import Protect2 from "./components/Protect2";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Register from "./components/Register";
import AddGroup from "./components/AddNotes";
import ViewNotes from "./components/ViewNotes";
import EditMarking from "./components/EditNotes";
import ViewUsers from "./components/ViewUsers";
import EditUsers from "./components/EditUsers";
function App() {
  return (
    <div className="container">
      <Router>
        <NavBar />  
        
          <Route exact path="/" component={Home}/>
          <PrivateRoute path="/protect1" role={["user", "admin"]} component={Protect1}/>
          <PrivateRoute path="/protect2" role={["user", "admin"]} component={Protect2}/>
          <PrivateRoute path="/admin" role={["admin"]} component={Admin}/>
          <PrivateRoute path="/addgroup" role={["admin"]} component={AddGroup}/>
          <PrivateRoute path="/allnotes" role={["admin"]} component={ViewNotes}/>
          <UnPrivateRoute path="/login" component={Login} />
          <UnPrivateRoute path="/register" component={Register} />
          <PrivateRoute path="/edit/:id" role={["admin"]} component={EditMarking}/>
          <PrivateRoute path="/allusers" role={["admin"]} component={ViewUsers}/>
          <PrivateRoute path="/editusers/:id" role={["admin"]} component={EditUsers}/>
         
      </Router>
    </div>
  );
}

export default App;
