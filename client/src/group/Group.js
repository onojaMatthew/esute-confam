import React, { Component } from "react";
import GroupList from "./GroupList";
import { getGroups, search } from "./apiGroup";
import Search from "./Search";

class Group extends Component{
  state = {
    groups: [],
    search,
    searchTerm: "",
    error: ""
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
        <GroupList groups={groups} />
      </div>
    )
  }
}

export default Group;
