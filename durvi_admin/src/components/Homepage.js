import React, { Component } from 'react';
import axios from 'axios';
import config from "../config.json";
import ErrorPage from '../error-views/errorPage';
//import http from "../services/auth"
class Homepage extends Component {
  constructor(props) {
    super(props);
  
     this.state = {
      branchData: [],
      apiError:null,
      clCode: "",
      cl:"",
      rmCode: "",
      
      clStatus:"",
      token: localStorage.getItem("adminToken"),
      weekDay: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    value:"Today is holiday",
      status:false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
   todate = new Date();
   month = ("0"+ (this.todate.getMonth()+1)).slice(-2);
    date = ("0"+ this.todate.getDate()).slice(-2);
     day = this.todate.getDay();
   formatedDate = `${this.todate.getFullYear()}-${this.month}-${this.date}`;
  
  componentDidMount() {
 this.getDetails();
  }
 async  getDetails(){
    let url=config.branchDetails;
    let branchData = [];
    await axios
    .get(url, { headers: { 'Authorization': this.state.token } })
  .then(resp=>{
    if(resp.data.status=="error") this.setState({apiError:resp.data});
    else branchData =resp.data;
  })
  .catch(error => {
    console.log(error)
    this.setState({apiError:error.response});
  });
  let data=branchData.filter(obj=>obj.role=="Manager");
  this.setState({branchData:data});
  }
async   showDetails(data){
    await this.props.history.push({ 
      pathname: '/admin/showusers/'+data.branchCode,
      state: data
     });
  }
 
  handleChange(event) {
    console.log(this.state.value);
    this.setState({value: event.target.value});
  }

 handleSubmit(e) {
  e.preventDefault();
// let errors=null;
  let url=config.sendMessage;
  let obj={
    message:this.state.value,
  }
  axios.post(url,obj,{ headers: { 'Authorization': this.state.token } }).then(
    (response) => {
     console.log(response);
      if(response.data.status=="error") this.setState({apiError:response.data});
      else alert("message sent successfully");
    } )
    .catch(error => {
      console.log(error);
      this.setState({apiError:error}); 
    });
  //  if(errors) 
  }

  render() {
   
    return (
       <React.Fragment>
        {this.state.apiError?<ErrorPage details={this.state.apiError}/>:<>
     {this.state.branchData.length==0? ( <div className="d-flex justify-content-center mt-5">
      
     <h3> Loading</h3> <div className="spinner-border" style={{width: "3rem", height: "3rem", color:"green"}} role="status">
  
 </div></div>)
 :
   
    (  <div style={{ backgroundColor: "#EAEDED " }} className="container-fluid">
        <div className="row">
            <div className="col-6 offset-3">
            <div style={{ padding: 5, marginBottom: 5 }}>
                  <h5 className="text-center" style={{ fontSize: 20, fontWeight: 'bold' }}>Branch's Details</h5>
                  <div className="row" style={{ fontSize: 20, fontWeight: 'bold' }}>
                  <div className="col-6 text-center">{this.state.weekDay[this.day]} </div>
                  <div className="col-6 text-center">{this.formatedDate} </div>
                  </div>
          <div className="row">
           <form onSubmit={this.handleSubmit} className="form-control" >
       <label>  Write message:</label>
          <input value={this.state.value} onChange={this.handleChange} style={{width: "80%"}}/>
          <button type="Send to all" className="btn btn-primary btn-sm">Submit</button>
        {/* <input type="submit" value="Send to all" className="btn btn-primary btn-sm"/> */}
      </form>
         </div>
                  <hr/>
                  {this.state.branchData.map((data, index) => ( 
                    <table className="table table-info" key={index}>
                    <thead >
                      <tr >
                        <td>Branch Code</td>
                        <td className="text-center">{data.branchCode}</td>
                      </tr>
                    </thead>
                    <tbody>
                    <tr >
                        <td>Name</td>
                        <td className="text-center">{data.userName}</td>
                      </tr>
                      <tr>
                        <td>Mobile Number</td>
                        <td className="text-center">{data.mobileNumber}</td>

                      </tr>
                      <tr>
                        <td>Total User</td>
                        <td className="text-center">{data.totalUser}</td>

                      </tr>
                      <tr>
                        <td>Location</td>
                        <td className="text-center">{data.address}</td>

                      </tr>
                      <tr>
                        <td>Show all user</td>
                        <td className="text-center"><button className="btn btn-primary" onClick={()=>this.showDetails(data)}>Show User</button></td>
                      </tr>
                    </tbody>
                  </table>
                  ))}
                </div>
            </div>
        </div>

        </div>)}
        </>  }
    </React.Fragment>
    );
  } 
  
}
export default Homepage;