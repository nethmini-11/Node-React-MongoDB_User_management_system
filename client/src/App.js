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
import AddGroup from "./components/AddUser";


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
          <UnPrivateRoute path="/login" component={Login} />
          <UnPrivateRoute path="/register" component={Register} />
          
      </Router>
    </div>
  );
}

export default App;
