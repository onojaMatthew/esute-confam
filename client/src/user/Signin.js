import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import SigninForm from "./forms/SigninForm";
import { signin, authenticate } from "../auth";

class Signin extends Component {
  state={
    email: "",
    password: "",
    error: "",
    open: false,
    redirectToReferer: false,
    loading: false,
    isText: false,
    inputType: null,
  }

  componentDidMount() {
    document.title = "Sign in";
  }
  
  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  }

  clickSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });

    const { email, password } = this.state;
    const user = {
      email,
      password
    }
    //console.log(user);
    signin(user)
      .then(data => {
      if (data && data.error) {
        this.setState({ error: data.error, loading: false })
      } else {
          authenticate(data, () => {
            this.setState({ redirectToReferer: true });

          })
        }
      });
  }

  render() {
    const { email, password, error, open, redirectToReferer, loading } = this.state;
    if (redirectToReferer) {
      return <Redirect to="/" />
    }

    return (
      <div className="container">
        <h1 className="mt-5 mb-5">Signin</h1>
        <div className="alert alert-danger" style={{ display: error ? "" : "none"}}>{error}</div>
        <div className="alert alert-success" style={{ display: open ? "" : "none"}}>
          New account successfully created. Please Login.
        </div>
        {loading ? <div className="jumbotron text-center"><h2>Loading...</h2></div> : ""}
        <SigninForm 
          email={email} 
          password={password}
          handleChange={this.handleChange}
          clickSubmit={this.clickSubmit}
          toggleIsText={this.toggleIsText}
        />
        <p className="lead">Don't have account? <Link to="/">Register</Link></p>
      </div>
    )
  }
}

export default Signin;
