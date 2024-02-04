import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button, Form, FormControl } from 'react-bootstrap'
import config from "../config.json";
import Loading from '../Loading/loadingRound'
import ReactFormValidation from "react-form-input-validation";
import ErrorPage from '../error-views/errorPage';
import '../App.css';
class Masgpage extends Component {
  constructor(props) {
    
    super(props);
  
     this.state = {
        apiError:null,
      masg:"Today is holiday.",
      branchCode:this.props.branchCode,
      token: localStorage.getItem("branchToken"),
      
    };
    
  }

  
 
   handleChange(event) {
 
    this.setState({masg: event.target.value});
  }

  async handleSubmit(e) {
    
  console.log(this.state.value)
  let url=config.sendMessage;
  let obj={
    message:this.state.value,
    branchCode:this.state.branchCode
  }
  await axios.post(url,obj,{headers:{'Authorization':this.state.token}}).then(
    (response) => {
      console.log(response.data);
      if(response.data.status=="error") this.setState({apiError:response.data});
          else  alert("message sent successfully");
    }
  )
  .catch(error => {
   
    let obj={"status":"Network Error"};
    if(error.response) this.setState({apiError:error.response});
   else this.setState({apiError:obj});
  });
  e.preventDefault();
  }
  render() {
  
    return (
      <React.Fragment>
        {this.state.apiError?<ErrorPage details={this.state.apiError}/>:
   <div style={{ backgroundColor: "whitesmoke" }} className="container-fluid">
           <div style={{ padding: 5, marginBottom: 5 }}>
           <div className="row m-5">
           <form onSubmit={this.handleSubmit.bind(this)} className="form-control" >
       <label>  Write message:</label>
          <input type="text" value={this.state.masg} onChange={this.handleChange.bind(this)} style={{width: "80%"}}/>
      
          <button type="Send to all" className="btn btn-primary btn-sm">Submit</button>
      </form>
         </div>
          </div>
    </div>
  }
     </React.Fragment>
     

   )
 }
}
export default Masgpage;