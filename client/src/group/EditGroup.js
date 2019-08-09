import React, { Component } from "react";
import { editGroup, weeklySaving } from "./apiGroup";
import { isAuthenticated } from "../auth";
import EditForm from "./forms/EditForm";

class EditGroup extends Component {
  state={
    groupName: "",
    fixedAmount: "",
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

  // handle update submition
  clickSubmit = event => {
    event.preventDefault();
    const { groupName, fixedAmount, description, maxCapacity } = this.state;
    const token = isAuthenticated().token;
    const groupId = window.location.pathname.slice(7);
    console.log(groupId, token, " The group id")

    const group = { groupId, groupName, fixedAmount, description, maxCapacity }
   
  
    editGroup(group, token)
      .then(data => {
        if (data && data.error) { this.setState({ error: data.error }) 
        } else {
          this.handleWeeklySavings(groupId, token);
          this.setState({
            error: "",
            groupName: "",
            fixedAmount: "",
            description: "",
            maxCapacity: "",
            open: true,
            redirectToReferer: true
          });
        }
          
      });
  }

  handleWeeklySavings = (groupId, token) => {
    weeklySaving(groupId, token)
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
    const { open, groupName, fixedAmount, description, maxCapacity, error } = this.state;
    
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Create Cooporative Group</h2>
        <div className="alert alert-danger" style={{ display: error ? "" : "none"}}>{error}</div>
        <div className="alert alert-success" style={{ display: open ? "" : "none"}}>
          Updates successfull.
        </div>
        <EditForm 
          groupName={groupName}
          fixedAmount={fixedAmount} 
          description={description} 
          maxCapacity={maxCapacity}
          handleChange={this.handleChange}
          clickSubmit={this.clickSubmit}
        />
      </div>
    );
  }
}

export default EditGroup;
