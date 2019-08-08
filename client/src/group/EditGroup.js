import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { admin } from "../user/apiUser";
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

  clickSubmit = event => {
    event.preventDefault();
    const { groupName, fixedAmount, description, maxCapacity } = this.state;
    const group = { groupName, fixedAmount, description, maxCapacity }
    const { selectedGroup } = this.props;
   
    const token = isAuthenticated().token;
    const userId = isAuthenticated().user._id;
    const groupId = selectedGroup ? selectedGroup._id : null;
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
    const { redirectToReferer, groupName, fixedAmount, description, maxCapacity, error } = this.state;
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
