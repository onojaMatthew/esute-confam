import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import GroupList from "./GroupList";
import { getGroups, search, join, membership } from "./apiGroup";
import Search from "./Search";
import { isAuthenticated } from "../auth";

class Group extends Component{
  state = {
    groups: [],
    search,
    searchTerm: "",
    error: "",
    redirectToReferer: false
  }

  componentDidMount() {
    document.title = "Posts"
    getGroups()
      .then(data => {
        if (data && data.error) {
        } else {
          this.setState({ groups: data });
        }
      });
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  }

  handleSearch = async (e) => {
    e.preventDefault();
    const { searchTerm } = this.state;
    search(searchTerm)
      .then(data => {
        if (data && data.error) {
          console.log("Error")
        } else {
          this.setState({ groups: data });
        }
      });
  }

  handleJoin = (groupId) => {
    const { token, user: { _id } } = isAuthenticated();
    // const userId = isAuthenticated().user._id;
    // const token = isAuthenticated().token;
    join(groupId, userId, token)
      .then(data => {
        if (data && data.error) {
          console.log("Error")
        } else {
          this.updateMembership(groupId, userId)
          this.setState({ redirectToReferer: true });
        }
      });
  }

  updateMembership = (groupId, userId, token) => {
    console.log(groupId, "the group name");
    // membership(groupId, userId, token)
    //   .then(data => {
    //     if (data && data.error) {
    //       console.log("Error")
    //     } else {
    //       this.updateMembership(groupId, userId)
    //       this.setState({ redirectToReferer: true });
    //     }
    //   });
  }

  render() {
    const { groups, error, searchTerm } = this.state;
    return(
      <div>
        <div className="alert alert-danger" style={{ display: error ? "" : "none"}}>{error}</div>
        <Search 
          handleChange={this.handleChange}
          handleSearch={this.handleSearch}
          searchTerm={searchTerm}
        />
        <GroupList 
          groups={groups}
          handleJoin={this.handleJoin}
        />
      </div>
    )
  }
}

export default Group;
