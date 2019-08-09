import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import GroupForm from "./forms/GroupForm";
import { admin } from "../user/apiUser";
import { createGroup } from "./apiGroup";
import { isAuthenticated } from "../auth";

class NewGroup extends Component {
  state={
    groupName: "",
    description: "",
    maxCapacity: "",
    error: "",
    open: false,
    redirectToReferer: false,
  }

  componentDidMount() {
    document.title = "New group";
  }
  
  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  }

  clickSubmit = event => {
    event.preventDefault();
    const { groupName, description, maxCapacity } = this.state;
    const group = { groupName, description, maxCapacity }
   
    const token = isAuthenticated().token;
    const userId = isAuthenticated().user._id;
    createGroup(group, token)
      .then(data => {
        if (data && data.error) { this.setState({ error: data.error }) 
        } else {
          this.setAdmin(userId, token);
          this.setState({
            error: "",
            groupName: "",
            description: "",
            maxCapacity: "",
            open: true,
            redirectToReferer: true
          });
        }
          
      });
  }

  setAdmin = (userId, token) => {
    admin(userId, token)
      .then(data => {
        if (data && data.error) this.setState({ error: data.error });
        else
          this.setState({
            error: "",
            open: true,
          });
      });
  }

  render() {
    const { redirectToReferer, groupName, description, maxCapacity, error } = this.state;
    if (redirectToReferer) {
      return <Redirect to="/groups" />
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Create Cooporative Group</h2>
        <div className="alert alert-danger" style={{ display: error ? "" : "none"}}>{error}</div>
        {/* <div className="alert alert-success" style={{ display: open ? "" : "none"}}>
          New account successfully created. <Link to="/signin">Sign In</Link>.
        </div> */}
        <GroupForm 
          groupName={groupName}
          description={description} 
          maxCapacity={maxCapacity}
          handleChange={this.handleChange}
          clickSubmit={this.clickSubmit}
        />
      </div>
    );
  }
}

export default NewGroup;
