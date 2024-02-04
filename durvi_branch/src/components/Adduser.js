import React from "react";
import ReactFormValidation from "react-form-input-validation";
import { Form } from 'react-bootstrap';
import axios from 'axios';
import config from "../config.json";
import ErrorPage from '../error-views/errorPage';
//import http from "../services/auth"
class Adduser extends React.Component {
  
  constructor(props) {
    super(props);
    var todate = new Date();
    var month = ("0"+ (todate.getMonth()+1)).slice(-2);
   var  date = ("0"+ todate.getDate()).slice(-2);
    var formatedDate = `${todate.getFullYear()}-${month}-${date}`;//`${date}-${month}-${todate.getFullYear()}`;


   
    this.state = {
      apiError:null,
      optionRadio:["None","3 Months","6 Months", "1 Year"],
      token: localStorage.getItem("branchToken"),
      fields: {
        joiningDate: formatedDate,
       branchCode:this.props.match.params.branch,
       userName:"",
       mobileNumber:"",
       amount:"",
      subscription:"None"
      },
      errors: {}
    };
    this.form = new ReactFormValidation(this, { locale: "en" });
    this.form.useRules({
     joiningDate:"required",
      branchCode:"required",
     userName:"required",
     branchAddress:"required",
     mobileNumber: "required|numeric|digits:10",
     amount:"required|numeric",
     subscription:"required"
     });

    this.form.onformsubmit = (fields) => {
    this.postData(fields);
     console.log(fields);
    }
  }
  async postData(fields){
    const url= config.registerNewUser;
     let obj = {
        joiningDate:fields.joiningDate,
        branchCode:fields.branchCode,
       userName:fields.userName,
       mobileNumber: fields.mobileNumber,
       subscription:fields.subscription,
       amount:fields.amount
         };
console.log(obj,url);
    await axios.post(url, obj,{headers:{'Authorization':this.state.token}}).then(
      (response) => {
        if(response.data.status=="error") this.setState({apiError:response.data});
        else this.props.history.push("/branch/home/"+this.props.match.params.branch);
      }).catch(error => {
        let obj={"status":"Network Error"};
        if(error.response) this.setState({apiError:error.response});
       else this.setState({apiError:obj});
      });
  }
  handleRadio(e){
    console.log(e, this);
  }
    render() { 
        return (
          <div style={{backgroundColor:"#D7DBDD"}} className="container-fluid">
              {this.state.apiError?<ErrorPage details={this.state.apiError}/>:
            <div className="row"  >
              <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 offset-lg-2 offset-md-2">
              
                  <div className="bg-light p-4 my-3" style={{margin:1,borderRadius:"3%"}}>
                  <div  className=" font-weight-bold text-center">
                  <h2 >Add New User Form</h2></div>
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
                  // To override the attribute name
                  data-attribute-name="" />
                  <div className="alert-danger text-danger">
                  {this.state.errors.mobileNumber
                  ? this.state.errors.mobileNumber
                  : ""}
                  </div>
                  </Form.Group>
                 
                  <Form.Group>
                    <Form.Label >Subscription <i className="text-danger">*</i></Form.Label>
                       { this.state.optionRadio.map((data,index)=>( <Form.Check  type="radio" key={index} className="p-1"
                          name="subscription"
                          onChange={this.form.handleChangeEvent} value={data}  id={data}
                           defaultChecked={data==="None"}
                          label={data} custom />))} 
                            <div className="alert-danger text-dange">
                          {this.state.errors.subscription
                        ? this.state.errors.subscription
                         : ""}
                       </div>
                  </Form.Group>
                  <Form.Group>
                  <Form.Label> Amount <i className="text-danger">*</i> </Form.Label>
                 <Form.Control
                  type="text"
                  name="amount"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.amount}
                  // To override the attribute name
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
              </div>
            </div>}
          </div>
          
         );
    }
}

export default Adduser;