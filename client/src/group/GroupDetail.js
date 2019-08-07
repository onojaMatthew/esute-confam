import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { getGroup, remove, setSearchable } from "./apiGroup";
import GroupDetailView from "./GroupDetailVew";
import { isAuthenticated } from "../auth";

class GroupDetail extends Component{
  state = {
    groups: [],
    searchTerm: "",
    error: "",
    redirectToReferer: false
  }

  componentDidMount() {
    document.title = "Posts";
    const groupId = window.location.pathname.slice(7);
    this.fetchGroup(groupId);
  }

  fetchGroup = (groupId) => {
    getGroup(groupId)
      .then(data => {
        if (data && data.error) {
        } else {
          this.setState({ group: data });
        }
      });
  }
  
  clickDelete = (groupId) => {
    const token = isAuthenticated().token;
    remove(groupId, token)
      .then(data => {
        if (data && data.error) {
          return this.setState({ error: data.error });
        } else {
          this.setState({ redirectToReferer: true });
        }
        
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  }

  render() {
    const { group, error, redirectToReferer } = this.state;
    if (redirectToReferer) {
      return <Redirect to="/groups" />
    }
    return(
      <div>
        <div className="alert alert-danger" style={{ display: error ? "" : "none"}}>{error}</div>
        <GroupDetailView
          selectedGroup={group}
          clickDelete={this.clickDelete}
        />
      </div>
    );
  }
}

export default GroupDetail;
