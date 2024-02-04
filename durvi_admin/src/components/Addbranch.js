import React from "react";
import ReactFormValidation from "react-form-input-validation";
import { Form } from 'react-bootstrap';
import axios from 'axios';
import config from "../config.json";
import ErrorPage from '../error-views/errorPage';
//import http from "../services/auth"
class Addbranch extends React.Component {
  
  constructor(props) {
    super(props);
    var todate = new Date();
    var month = ("0"+ (todate.getMonth()+1)).slice(-2);
   var  date = ("0"+ todate.getDate()).slice(-2);
    var formatedDate = `${todate.getFullYear()}-${month}-${date}`;

   
    this.state = {
      token: localStorage.getItem("adminToken"),
      apiError:null,
      fields: {
        joiningDate: formatedDate,
       branchCode:"",
       userName:"",
       mobileNumber:"",
       branchAddress:"",
       password:""
      },
      errors: {}
    };
    this.form = new ReactFormValidation(this, { locale: "en" });
    this.form.useRules({
     joiningDate:"required",
    
     userName:"required",
     branchAddress:"required",
     mobileNumber: "required|numeric|digits:10",
     password:"required"
     });

    this.form.onformsubmit = (fields) => {
     this.postData(fields);
     console.log(fields);
    }
  }
  async postData(fields){
    const url= config.registerNewBranch;
     let obj = {
      todayDate:fields.joiningDate,
     
       userName:fields.userName,
      address:fields.branchAddress,
       mobileNumber: fields.mobileNumber,
       password:fields.password
         };
console.log(obj);
    await axios.post(url, obj,{headers:{'Authorization':this.state.token}}).then(
      (response) => {
        if(response.data.status=="error") this.setState({apiError:response.data});
         else this.props.history.push("/admin/home");
      })
      .catch(error => {
        this.setState({apiError:error.response});
      });
  }
    render() { 
        return (
          <div style={{backgroundColor:"#F8C47180"}} className="container-fluid">
              {this.state.apiError?<ErrorPage details={this.state.apiError}/>:
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 offset-lg-2 offset-md-2">

                  <div className="row " style={{margin:1}}>
                 
                  <div  className="col-12 font-weight-bold text-center  p-4">
                  <h1 className="letterFormate">Add New Branch Form</h1></div>
                  </div>
                    
                  <div className="bg-light p-5 mb-3" style={{margin:1,borderRadius:"3%"}}>
                  <Form className="myForm" noValidate onSubmit={this.form.handleSubmit} >
                  <Form.Group>
                  <Form.Label> Date <i className="text-danger">*</i> </Form.Label>
                 <Form.Control
                  type="date"
                  name="joiningDate"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.joiningDate}
                  // To override the attribute name
                  data-attribute-name="" />
                  <div className="alert-danger text-danger">
                  {this.state.errors.joiningDate
                  ? this.state.errors.joiningDate
                  : ""}
                  </div>
                  </Form.Group>
                  {/* <Form.Group>
                  <Form.Label> Branch Code <i className="text-danger">*</i> </Form.Label>
                 <Form.Control
                  type="text"
                  name="branchCode"
                 
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.branchCode}
                  // To override the attribute name
                  data-attribute-name="" />
                  <div className="alert-danger text-danger">
                  {this.state.errors.branchCode
                  ? this.state.errors.branchCode
                  : ""}
                  </div>
                  </Form.Group> */}
                  <Form.Group>
                  <Form.Label> User Name <i className="text-danger">*</i> </Form.Label>
                 <Form.Control
                  type="text"
                  name="userName"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.userName}
                  // To override the attribute name
                  data-attribute-name="" />
                  <div className="alert-danger text-danger">
                  {this.state.errors.userName
                  ? this.state.errors.userName
                  : ""}
                  </div>
                  </Form.Group>
                  <Form.Group>
                  <Form.Label> Create Password <i className="text-danger">*</i> </Form.Label>
                 <Form.Control
                  type="text"
                  name="password"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.password}
                  // To override the attribute name
                  data-attribute-name="" />
                  <div className="alert-danger text-danger">
                  {this.state.errors.password
                  ? this.state.errors.password
                  : ""}
                  </div>
                  </Form.Group>
                  <Form.Group>
                  <Form.Label> Mobile Number <i className="text-danger">*</i> </Form.Label>
                 <Form.Control
                  type="text"
                  name="mobileNumber"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.mobileNumber}
                  // To override the attribute name
                  data-attribute-name="" />
                  <div className="alert-danger text-danger">
                  {this.state.errors.mobileNumber
                  ? this.state.errors.mobileNumber
                  : ""}
                  </div>
                  </Form.Group>
                  <Form.Group>
                  <Form.Label> Branch Address <i className="text-danger">*</i> </Form.Label>
                 <Form.Control
                  type="text"
                  name="branchAddress"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.branchAddress}
                  // To override the attribute name
                  data-attribute-name="" />
                  <div className="alert-danger text-danger">
                  {this.state.errors.branchAddress
                  ? this.state.errors.branchAddress
                  : ""}
                  </div>
                  </Form.Group>
                  <button type="submit" className="btn btn-primary mt-3">Submit</button>
                  </Form>
              </div>
              </div>
            </div>
     } </div>
          
         );
    }
}

export default Addbranch;