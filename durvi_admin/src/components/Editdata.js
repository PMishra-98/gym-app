import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap'
import config from "../config.json";
import ReactFormValidation from "react-form-input-validation";
import ErrorPage from '../error-views/errorPage';
class EditUserData extends Component {
  constructor(props) {
    
    super(props);

   let  details=this.props.location.state;
   console.log(typeof(details.mobileNumber));
     this.state = {
     option:["Active","Inactive"],
     apiError:null,
     optionRadio:["3 Months","6 Months", "1 Year"],
     token: localStorage.getItem("adminToken"),
    fields: {
      sNo:details.sNo,
      userName:details.userName,
      mobileNumber:details.mobileNumber,
      joiningDate:details.joiningDate,
      paidDate:details.paidDate,
      dueDate:details.dueDate,
      status: details.status,
      branchCode: details.branchCode,
      subscription: details.subscription,
      amount:details.amount
    },
    errors: {}
  };

  this.form = new ReactFormValidation(this, { locale: "en" });
  this.form.useRules({
    userName: "required",
    mobileNumber: "required|numeric",
    branchCode: "required",
    amount: "required|numeric",
    paidDate:"required",
    status:"required",
    subscription:"required"
  });
  
  this.form.onformsubmit = (fields) => {
    this.postData(fields);
    console.log(fields);
  }
}

 
  async postData(fields) {
    const url= config.userEdit;
    await axios.put(url, fields,{headers:{'Authorization':this.state.token}}).then(
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
      <div style={{ backgroundColor: "#D7DBDD" }} className="container-fluid">
           <div style={{ padding: 5, marginBottom: 5 }}>
           {this.state.apiError?<ErrorPage details={this.state.apiError}/>:    
             <div className="row">
               <div className="col-8 offset-2 bg-light p-4 my-3"  style={{borderRadius:"3%"}}>
               <h2 className="text-center">Edit Details</h2>
               <Form className="myForm" noValidate onSubmit={this.form.handleSubmit} >
              <Form.Group>
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
              </Form.Group>
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
                <Form.Label> Mobile Number <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="mobileNumber"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.mobileNumber}
                 
                  data-attribute-name="" />
                <div className="alert-danger text-danger">
                  {this.state.errors.mobileNumber
                    ? this.state.errors.mobileNumber
                    : ""}
                </div>
              </Form.Group>
              

              <Form.Group>
                <Form.Label> Paid Date <i className="text-danger">*</i> </Form.Label>
                <Form.Control
               type="date"
                  name="paidDate"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.paidDate}
                 
                  data-attribute-name="" />
                <div className="alert-danger text-danger">
                  {this.state.errors.paidDate
                    ? this.state.errors.paidDate
                    : ""}
                </div>
              </Form.Group>

              <Form.Group>
                <Form.Label>Select Status <i className="text-danger">*</i> </Form.Label>
                <Form.Control as="select" name="status" 
                          value={this.state.fields.status}
                           onChange={this.form.handleChangeEvent}
                           onBlur={this.form.handleBlurEvent}
                           data-attribute-name="" custom  className="form-control">
                           <option value="Choose">Choose ...</option>
                           { this.state.option.map((data,index)=>(<option value={data} key={index}>{data}</option>))} 
                       </Form.Control>
                       <div className="alert-danger text-danger">
                          {this.state.errors.status
                        ? this.state.errors.status
                         : ""}
                       </div>
              </Form.Group>
              <Form.Group>
                    <Form.Label >Subscription <i className="text-danger">*</i></Form.Label>
                       { this.state.optionRadio.map((data,index)=>( 
                       <Form.Check  type="radio" key={index} className="p-1"
                          name="subscription"
                          onChange={this.form.handleChangeEvent} value={data}  id={data}
                          label={data} custom />))} 
                  </Form.Group>
              <Form.Group>
                <Form.Label> Amount <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="amount"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.amount}
                 
                  data-attribute-name="" />
                <div className="alert-danger text-danger">
                  {this.state.errors.amount
                    ? this.state.errors.amount
                    : ""}
                </div>
              </Form.Group>
              
              <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </Form>
               </div>
             </div>}
      </div>
        </div>
      
    );
  }
}
export default EditUserData;