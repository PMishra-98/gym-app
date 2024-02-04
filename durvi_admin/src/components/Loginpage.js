import React from "react";
import ReactFormValidation from "react-form-input-validation";
import Form  from 'react-bootstrap/Form';
import axios from 'axios';
import config from "../config.json";
import '../App.css';
import ErrorPage from '../error-views/errorPage';
class Loginpage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        token:"",
        apiError:null,
      fields: {
        userName: "",
        password:"",
      
      },
      errors: {}
    };
    this.form = new ReactFormValidation(this, { locale: "en" });
    this.form.useRules({
      userName:"required",
      password:"required",
     
     });

    this.form.onformsubmit = (fields) => {
     this.postData(fields);
     console.log(fields);
    }
  }
  async postData(fields){
    const url= config.login;
     let obj = {
      userName: fields.userName,
      password : fields.password
         };
console.log(obj);
    await axios.post(url, obj).then(
      (response) => {
        if(response.data.status=="error") this.setState({apiError:response.data});
       else if(response.data=="wrong credential"||response.data.role!="Admin") alert("enter correct name and password");
        
       else {
         localStorage.setItem("adminToken","Bearer "+response.data.token);
         
        window.location="/admin/home";
       
       }
      },
      (error) => {
         this.setState({apiError:error.response});
      }
    );
  }
    render() { 
        return (
          <div  className="container-fluid bg">
           {this.state.apiError?<ErrorPage details={this.state.apiError}/>:<>
            <div className="row " >
              
              <div className="card col-4  login-card  offset-4 my-5  Login-component " style={{color:"#D7DBDD80"}}>
                  <div className="row " style={{margin:1}}>
                 
                  <div  className="col-12 font-weight-bold text-center mt-5">
                  <h1 className="letterFormate">Admin Login </h1></div>
                  </div>
                    
                  <div className="row  my-2">
                 <div className="  col-8 offset-2 " style={{border:"none"}}>
                 <Form className="myForm" noValidate onSubmit={this.form.handleSubmit} >
                  <Form.Group className="my-4">
                  <Form.Label> User Name <i className="text-danger">*</i> </Form.Label>
                 <Form.Control
                  type="text"
                  name="userName"
                 style={{backgroundColor:"#D7DBDD"}}
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.userName}
                  // To override the attribute name
                  data-attribute-name="" />
                  
                  <div className="text-warning">
                  {this.state.errors.userName
                  ? this.state.errors.userName
                  : ""}
                  </div>
                  </Form.Group>
                  <Form.Group className="mt-4">
                  <Form.Label>Password <i className="text-danger">*</i> </Form.Label>
                 <Form.Control
                  type="password"
                  name="password"
                  style={{backgroundColor:"#D7DBDD"}}
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.password}
                  // To override the attribute name
                  data-attribute-name="" />
                  <div className=" text-warning">
                  {this.state.errors.password
                  ? this.state.errors.password
                  : ""}
                  </div>
                  </Form.Group>
                
                  <button type="submit" className="btn my-4 text-light text-bold bg-lg bg-warning" >Login</button>
                  </Form>
                 </div>
              </div>
              </div>
            </div></>}
          </div>
          
         );
    }
}

export default Loginpage;