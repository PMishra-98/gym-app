import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/Appnavbar';
import './App.css';
import { Component } from 'react';

class  App extends Component  {
  state={};
  componentDidMount(){
   let login=localStorage.getItem("adminToken");
   this.setState({login});
  }
 render(){
  console.log(this.state.login);
 
  return (
    <div>
      <AppNavbar login={this.state.login} />
     </div>
  
    );
 }
}

export default App;
