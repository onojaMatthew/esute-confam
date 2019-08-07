import React, { Component } from "react";
import { isAuthenticated, signout } from "../auth";
import { remove } from "./apiUser";
import { Redirect } from 'react-router-dom';


class DeleteUser extends Component {
  state = {
    redirect: false,
  }

  deleteAccount = () => {
    const token = isAuthenticated().token;
    const userId = this.props.id;
    remove(userId, token) 
      .then(data => {
        if (data && data.error) {
          console.log("Error");
        } else {
          // signout user
          signout(() => console.log("Signed out")) 
          // redirect to sign up
          this.setState({ redirect: true });
        }
      })
  }

  deleteConfirm = () => {
    const answer = window.confirm("Are you sure you want to delete your account");
    if (answer) {
      this.deleteAccount()
    }
  }

  render(){
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    
    return(
      <div>
        <button onClick={this.deleteConfirm} className="btn btn-raised btn-danger">Delete Profile</button>
      </div>
    )
  }
}

export default DeleteUser;
