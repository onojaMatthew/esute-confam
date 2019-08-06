import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignupForm from "./forms/SignupForm";
import { signup } from "../auth";

class Signup extends Component {
  state={
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: "",
    open: false,
  }

  componentDidMount() {
    document.title = "Sign up";
  }
  
  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  }

  clickSubmit = event => {
    event.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    const user = {
      firstName,
      lastName,
      email,
      password
    }
    //console.log(user);
    signup(user)
      .then(data => {
        if (data && data.error) this.setState({ error: data.error });
        else
          this.setState({
            error: "",
            name: "",
            email: "",
            password: "",
            open: true,
          })
        
      });
  }

  
  render() {
    const { firstName, lastName, email, password, error, open } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signup</h2>
        <div className="alert alert-danger" style={{ display: error ? "" : "none"}}>{error}</div>
        <div className="alert alert-success" style={{ display: open ? "" : "none"}}>
          New account successfully created. <Link to="/signin">Sign In</Link>.
        </div>
        <SignupForm 
          firstName={firstName}
          lastName={lastName} 
          email={email} 
          password={password}
          handleChange={this.handleChange}
          clickSubmit={this.clickSubmit}
        />
      </div>
    )
  }
}

export default Signup;
