import React, { Component } from 'react';
import Homepage from './Homepage';
import axios from 'axios';
import Loginpage from './Loginpage';
import Addbranch from './Addbranch';
import Showusers from './Showusers';
import Editdata from './Editdata';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import '../App.css';
//import config from "../config.json";
const AppNavbar = ({login})=> {
   console.log("login",login);
   const  logout=()=>{
          localStorage.removeItem("adminToken");
          console.log(login);
          login=undefined;
      }
 return (
            <Router>
            <Navbar className="color" expand="lg" variant="dark">

     <Navbar.Brand href="https://durvi-fitness.herokuapp.com" target="_blank" rel="noopener noreferrer"><img src="https://i.ibb.co/G5DGRn5/2.png" height={50} width={60} className="mx-2"/></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
   {login?<> <Nav className="me-auto">
      <Nav.Link href="/admin/home">Home</Nav.Link>
        <Nav.Link href="/admin/addbranch">Add New Branch</Nav.Link>
      </Nav>
      <Nav className="mr-auto">
      <Nav.Link href="/admin/login" onClick={logout}>Logout</Nav.Link>  
      </Nav></>:<Nav className="me-auto">
      <Nav.Link href="/admin/login">Login</Nav.Link>
      </Nav>} 
     
    </Navbar.Collapse>

</Navbar>
                
               
                   
                    <Switch>
                        <Route path="/admin/login" component={Loginpage} />
                        <Route path="/admin/showusers/:branch" component={Showusers} />
                        <Route path="/admin/addbranch" component={Addbranch} />
                        <Route path="/admin/home" component={Homepage} />
                        <Route path="/admin/editData" component={Editdata} />
                        <Redirect to={"/admin/login"}/>
                    </Switch>
                </Router>
          
        );
    
}
export default AppNavbar;