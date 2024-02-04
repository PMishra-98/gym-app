import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button, Form, FormControl } from 'react-bootstrap'
import config from "../config.json";
import Loading from '../Loading/loadingRound'
import ReactFormValidation from "react-form-input-validation";
import ErrorPage from '../error-views/errorPage';
import MasgPage from './masg';
import '../App.css';
class Homepage extends Component {
  constructor(props) {
    
    super(props);
  
     this.state = {
      optionRadio:["3 Months","6 Months", "1 Year"],
     // showModal: false,
      apiError:null,
      showPaymentModal:false,
      userData: [],
      allData:[],
      showModal: false,
      sendData:{},
      paymentData:{},
      value:"Today is holiday.",
      branchCode:this.props.match.params.branch,
      token: localStorage.getItem("branchToken"),
      weekDay: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      fields: {
        sNo:"",
        userName:"",
        mobileNumber:"",
        joiningDate:"",
        dueDate:"",
        status: "",
        branchCode: "",
        subscription: "None",
        amount:""
      },
      errors: {}
    };
    

    this.form = new ReactFormValidation(this, { locale: "en" });
    this.form.useRules({
      userName: "required",
      mobileNumber: "required|numeric",
      branchCode: "required",
      amount: "required|numeric",
      status:"required",
      subscription:"required"
    });
      this.paymentSubmit = this.paymentSubmit.bind(this);
  
  }
  

 d = new Date();
 month = ("0"+ (this.d.getMonth()+1)).slice(-2);
 date = ("0"+ this.d.getDate()).slice(-2);
 day = this.d.getDay();
 dformat = [this.day,this.month, this.d.getFullYear(), this.date];
  
  componentDidMount() {
 this.getDetails();
  }

  async  getDetails(){
    console.log(this.state.branchCode)
    let url=config.userDetails+"?branch="+this.state.branchCode;
    console.log(url,this.state.token)
    let userData =[];
     await axios
    .get(url, { headers: { 'Authorization': this.state.token } })
  .then(resp=>{
    if(resp.data.status=="error") this.setState({apiError:resp.data});
    else userData=resp.data})
  .catch(error => {
    let obj={"status":"Network Error"};
    if(error.response) this.setState({apiError:error.response});
   else this.setState({apiError:obj});
  });
if(userData=="Add user"){
  alert("Add user first");
  this.props.history.push(`/branch/adduser/${this.state.branchCode}`);
}
  this.setState({userData:userData,allData:userData});
 
  }

  handleCloseShow() {
    this.setState({ showModal: false });
  }
  handleSubmitShow() {
    this.setState({ showModal: false });
  }
  
  showData(data) {
    this.setState({ showModal: true,sendData:data });
  } 
 
  handleClosePayment() {
    this.setState({ showPaymentModal: false });
  }

  async handleSubmitPayment() {
    console.log("data",this.state.fields.amount)
   if(this.state.fields.amount==""){
     alert("Enter Amount");
     return false;
   }
   else{
    console.log(this.state.fields);
    const url= config.userPayment;
    await axios.put(url, this.state.fields,{headers:{'Authorization':this.state.token}}).then(
        (response) => {
          if(response.data.status=="error") this.setState({apiError:response.data});
          else this.setState({showPaymentModal:"false"});
        }
      )
      .catch(error => {
        let obj={"status":"Network Error"};
        if(error.response) this.setState({apiError:error.response});
       else this.setState({apiError:obj});
      });
     
    this.setState({ showPaymentModal: false });
    this.getDetails();
   }
  }
  paymentSubmit(data){
    console.log(data);
    this.setState({ showPaymentModal: true});
    let obj={
      sNo:data.sNo,
      userName: data.userName,
      mobileNumber: data.mobileNumber,
      branchCode: data.branchCode,
      amount: "",
      joiningDate: data.joiningDate,
      dueDate: data.dueDate,
      status:data.status,
      subscription:"None"
    }
   this.setState({fields:obj});
  }

async  editData(data) {
    await this.props.history.push({ 
      pathname: '/branch/editData',
      state: data
     });
  }
 async Filteration(event) {
   let value=event.target.value;
   await  this.getDetails();
  if(value!="All"){
    let data=[]
    if(value!=0)data = this.state.userData.filter(obj=>obj.paymentDate==value);
    else data = this.state.userData.filter(obj=>obj.paymentDate<0);
    console.log(data);
    if(data.length!=0)this.setState({userData:data});
    else alert("Data not find");
  }
  }
handleSearchInput = event => {
 let value= event.target.value.toLowerCase();
 
 let data = this.state.allData.filter(obj=>{
  let name=obj.userName.toLowerCase();
let len=name.match(value);
if(len) return obj;
});

if(data.length!=0)this.setState({userData:data});
else {
  this.setState({userData:this.state.allData});
  alert("User name not exist");
}
  };
 

  render() {
    console.log(this.state.fields);
    return (
      <React.Fragment>
        {this.state.apiError?<ErrorPage details={this.state.apiError}/>:<> 
      {this.state.userData.length==0 ? (
     <div className="d-flex justify-content-center mt-5">
     <h3> Loading</h3> <div className="spinner-border" style={{width: "3rem", height: "3rem", color:"green"}} role="status">
    
   </div>
   {/* <div class="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
     <span class="sr-only">Loading...</span>
   </div> */}
   </div>
      ) : (
   <div style={{ backgroundColor: "whitesmoke" }} className="container-fluid">
           <div style={{ padding: 5, marginBottom: 5 }}>
           <div className="row m-5">
           <MasgPage branchCode={this.state.branchCode}/>
         </div>
          <div className="row m-4">
            <div className="col-6">
           <FormControl
              onChange={this.handleSearchInput}
              value={this.state.searchText}
              type="text"
              placeholder="Search by name"
            />
             </div>
            <div className="col-6">
            <select className="form-select" aria-label="Default select example"
               onChange={e=>this.Filteration(e)}>
               <option value="All">All</option>
               <option value="3">Three day due date</option>
               <option value="2">Two day due date</option>
               <option value="1">Ond day due date</option>
               <option value="0">Expiry</option>
            </select>
              </div>
          </div>
           
       
          
         
  <div className="table-responsive-sm">
  <table className="table">
  <thead>
    <tr>
      <th scope="col">User Name</th>
      <th scope="col">Mobile Number</th>
      <th scope="col">Joining Date</th>
      <th scope="col">Expiry Date</th>
      <th scope="col">Subscription</th>
      <th scope="col">Amount</th>
      <th scope="col">Payment</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
   {this.state.userData.map((data, index) => (   
  data.paymentDate<=1&&data.status=="Active"?
   <tr class="table-danger">
      <th  scope="row" className="text-primary" onClick={() => this.showData(data)}>{data.userName}</th>
      <td>{data.mobileNumber}</td>
      <td>{data.joiningDate}</td>
      <td>{data.dueDate}</td>
      
      <td>{data.subscription}</td>
       <td>{data.amount}</td> 
       <td>   
         <Button className="btn btn-primary" onClick={() => this.paymentSubmit(data)}>Payment</Button></td>
      <td>{data.status}</td>
      <td>   <Button className="btn btn-primary" onClick={() => this.editData(data)}>Edit</Button></td>
    </tr>: 

    data.paymentDate==2&&data.status=="Active"?

    <tr class="table-warning">
      <th  scope="row" className="text-primary" onClick={() => this.showData(data)}>{data.userName}</th>
      <td>{data.mobileNumber}</td>
      <td>{data.joiningDate}</td>
      <td>{data.dueDate}</td>
      <td>{data.subscription}</td>
       <td>{data.amount}</td> 
       <td>   <Button className="btn btn-primary" onClick={() => this.paymentSubmit(data)}>Payment</Button></td>
      <td>{data.status}</td>
      <td>   <Button className="btn btn-primary" onClick={() => this.editData(data)}>Edit</Button></td>
    </tr>:  
    data.paymentDate==3&&data.status=="Active"?
    
   <tr className="table-success">
   <th  scope="row" className="text-primary" onClick={() => this.showData(data)}>{data.userName}</th>
   <td>{data.mobileNumber}</td>
   <td>{data.joiningDate}</td>
   <td>{data.dueDate}</td>
   <td>{data.subscription}</td>
    <td>{data.amount}</td> 
    <td>   <Button className="btn btn-primary" onClick={() => this.paymentSubmit(data)}>Payment</Button></td>
   <td>{data.status}</td>
   <td>   <Button className="btn btn-primary" onClick={() => this.editData(data)}>Edit</Button></td>
 </tr>
 :data.status=="Inactive"?
   <tr className="table-dark">
   <th  scope="row" className="text-primary" onClick={() => this.showData(data)}>{data.userName}</th>
   <td>{data.mobileNumber}</td>
   <td>{data.joiningDate}</td>
   <td>{data.dueDate}</td>
   
   <td>{data.subscription}</td>
    <td>{data.amount}</td> 
    <td>   <Button className="btn btn-primary" onClick={() => this.paymentSubmit(data)}>Payment</Button></td>
   <td>{data.status}</td>
   <td>   <Button className="btn btn-primary" onClick={() => this.editData(data)}>Edit</Button></td>
 </tr>:
  <tr>
  <th  scope="row" className="text-primary" onClick={() => this.showData(data)}>{data.userName}</th>
  <td>{data.mobileNumber}</td>
  <td>{data.joiningDate}</td>
  <td>{data.dueDate}</td>
  
  <td>{data.subscription}</td>
   <td>{data.amount}</td> 
   <td>   <Button className="btn btn-primary" onClick={() => this.paymentSubmit(data)}>Payment</Button></td>
  <td>{data.status}</td>
  <td>   <Button className="btn btn-primary" onClick={() => this.editData(data)}>Edit</Button></td>
</tr>))}
  </tbody>
</table>
   </div>            
    </div>


    <Modal show={this.state.showModal} onHide={() => this.handleCloseShow()} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{this.state.sendData.userName} Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form className="myForm" >
              <Form.Group>
                <Form.Label> Branch Code <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="branchCode"
                  disabled={true}
                  value={this.state.sendData.branchCode}
                  // To override the attribute name
                  data-attribute-name="" />
              </Form.Group>
              <Form.Group>
                <Form.Label> User Name <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  value={this.state.sendData.userName}
                  // To override the attribute name
                  data-attribute-name="" />
             
              </Form.Group>

              <Form.Group>
                <Form.Label> Mobile Number <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="mobileNumber"
                  value={this.state.sendData.mobileNumber}
                  // To override the attribute name
                  data-attribute-name="" />
              </Form.Group>

              <Form.Group>
                <Form.Label> Joining Date <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="joiningDate"
                  value={this.state.sendData.joiningDate}
                 
                  data-attribute-name="" />
              </Form.Group>

              <Form.Group>
                <Form.Label> Paid Date <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="paidDate"
                  value={this.state.sendData.paidDate}
                 
                  data-attribute-name="" />
              </Form.Group>

              <Form.Group>
                <Form.Label> Due Date <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="dueDate"
                  value={this.state.sendData.dueDate}
                 
                  data-attribute-name="" />
              </Form.Group>

              <Form.Group>
                <Form.Label> Status <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="status"
                  value={this.state.sendData.status}
                 
                  data-attribute-name="" />
              </Form.Group>
              <Form.Group>
                <Form.Label> Subscription <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="subscription"
                  value={this.state.sendData.subscription}
                 
                  data-attribute-name="" />
              </Form.Group>
              <Form.Group>
                <Form.Label> Amount <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="amount"
                  value={this.state.sendData.amount}
                 
                  data-attribute-name="" />
              </Form.Group>
              
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => this.handleSubmitShow()}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>



        <Modal show={this.state.showPaymentModal} onHide={() => this.handleClosePayment()} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{this.state.fields.userName} Payment Submit</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form className="myForm" >
              
              <Form.Group>
                <Form.Label> User Name <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  value={this.state.fields.userName}
                  disabled={true}
                  data-attribute-name="" />
             
              </Form.Group>

              <Form.Group>
                <Form.Label> Mobile Number <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="number"
                  name="mobileNumber"
                  value={this.state.fields.mobileNumber}
                  disabled={true}
                  data-attribute-name="" />
              </Form.Group>

        

              <Form.Group>
                <Form.Label> Payment Date <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="date"
                  name="dueDate"
                  value={this.state.fields.dueDate}
                 
                  data-attribute-name="" />
              </Form.Group>
              <Form.Group>
                    <Form.Label >Subscription <i className="text-danger">*</i></Form.Label>
                       { this.state.optionRadio.map((data,index)=>( <Form.Check  type="radio" key={index} className="p-1"
                          name="subscription"
                          onChange={this.form.handleChangeEvent} value={data}  id={data}
                          label={data} custom />))} 
                  </Form.Group>
              <Form.Group>
                <Form.Label> Amount <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  
                  onChange={this.form.handleChangeEvent}
                  onBlur={this.form.handleBlurEvent}
                  data-attribute-name="" />
                   <div className="alert-danger text-danger">
                  {this.state.errors.amount
                  ? this.state.errors.amount
                  : ""}
                  </div>
              </Form.Group>
             
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => this.handleSubmitPayment()}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        </div>
     )}</>}
     </React.Fragment>
     

   );
 }
}
export default Homepage;