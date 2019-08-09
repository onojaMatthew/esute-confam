import React, { Component } from "react";
import GroupList from "./GroupList";
import { getGroups, search, join } from "./apiGroup";
import Search from "./Search";
import { isAuthenticated } from "../auth";

class Group extends Component{
  state = {
    groups: [],
    search,
    searchTerm: "",
    error: "",
    message: "",
    redirectToReferer: false
  }

  componentDidMount() {
    document.title = "Posts"
    this.fetchGroups();
  }

  fetchGroups = () => {
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
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
   
    join(groupId, userId, token)
      .then(data => {
        if (data && data.error) {
          this.setState({ error: data.error})
        } else {
          this.fetchGroups();
          this.setState({ message: "Success!"})
        }
      });
  }

  render() {
    const { groups, error, searchTerm, message } = this.state;
    return(
      <div>
        <div className="alert alert-danger" style={{ display: error ? "block" : "none"}}>{error}</div>
        <div className="alert alert-success" style={{ display: message ? "block" : "none"}}>{message}</div>
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
