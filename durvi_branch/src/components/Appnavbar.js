import React, { Component } from 'react';
import Homepage from './Homepage';
import axios from 'axios';
import Loginpage from './Loginpage';
import Adduser from './Adduser';

import Editdata from './Editdata';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
//import config from "../config.json";
const AppNavbar = ({login})=> {
   let branch=localStorage.getItem("branchCode");
   const  logout=()=>{
          localStorage.removeItem("branchToken");
          console.log(login);
          login=undefined;
      }
 return (
            <Router>
            <Navbar className="navbar navbar-light " style={{backgroundColor: "#F39C12"}} expand="lg" variant="light">

     <Navbar.Brand href="https://durvi-fitness.herokuapp.com" target="_blank" rel="noopener noreferrer"><img src="https://i.ibb.co/G5DGRn5/2.png" height={50} width={60} className="mx-2"/></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
   {login?<> <Nav className="me-auto ">
      <Nav.Link href={"/branch/home/"+branch} >Home</Nav.Link>
        <Nav.Link href={"/branch/adduser/"+branch}>Add New User</Nav.Link>
      </Nav>
      <Nav className="mr-auto  ">
      <Nav.Link href="/branch/login" onClick={logout} >Logout</Nav.Link>  
      </Nav></>:<Nav className="mr-auto  font-weight-bold">
      <Nav.Link href="/branch/login" >Login</Nav.Link>
      </Nav>} 
     
    </Navbar.Collapse>

</Navbar>
                
               
                   
                    <Switch>
                        <Route path="/branch/login" component={Loginpage} />
                        <Route path="/branch/adduser/:branch" component={Adduser} />
                        <Route path="/branch/home/:branch" component={Homepage} />
                        <Route path="/branch/editData" component={Editdata} />
                        <Redirect to={"/branch/login"}/>
                    </Switch>
                </Router>
          
        );
    
}
export default AppNavbar;