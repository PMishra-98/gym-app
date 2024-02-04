import React from "react";
import config from "./../config.json"

class errorPage extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
         details:this.props.details,
     }
   
  }
loginAgain(){
  window.location.href=config.loginPage;
}
  render() {
    const details = this.state.details;
console.log("dgfdf",details)
    return (
      <div style={{ backgroundColor: "#D6EAF880" }} className="container-fluid">
    {details.status=="error"? 
    <h1>Error: Please retry later. If the error persists, contact the admin.</h1>
   :
    <>{details.status==403?
   <> <h1>Your session has expired! Please Login again!</h1>
    <button type="primary" onClick={this.loginAgain()}>OK</button>
    </>:
   <><h1>Page Not found</h1>
    <h1>We are Sorry, Page Not Found</h1>
    <h3>The page you are looking is Temporary Unavailable. Please try after some time. If this continues please contact team.</h3>
    {/* <Button type='primary' onClick={homePage}>Back to Home</Button> */}
   </> }
    </>
    } 
        </div>
    

    );
  }
}

export default errorPage;