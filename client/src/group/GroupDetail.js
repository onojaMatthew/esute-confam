import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import GroupList from "./GroupList";
import { getGroup, search, } from "./apiGroup";
import { addGroupId } from "../user/apiUser";
import Search from "./Search";
import { isAuthenticated } from "../auth";
import GroupDetailView from "./GroupDetailVew";

class GroupDetail extends Component{
  state = {
    groups: [],
    search,
    searchTerm: "",
    error: "",
    redirectToReferer: false
  }

  componentDidMount() {
    document.title = "Posts";
    const groupId = window.location.pathname.slice(7);
    getGroup(groupId)
      .then(data => {
        if (data && data.error) {
        } else {
          this.setState({ group: data });
        }
      });
  }
  

  render() {
    const { group, error, searchTerm } = this.state;
    console.log(group)
    // let selectedGroup;
    
    // if (groups) {
    //   groups.forEach(group => {
    //     if (group._id === location) {
    //       selectedGroup = group;
    //     }
    //   });
    // }
    // console.log(selectedGroup, " this is the selected group")
    return(
      <div>
        <div className="alert alert-danger" style={{ display: error ? "" : "none"}}>{error}</div>
        <GroupDetailView
          selectedGroup={group}
        />
      </div>
    );
  }
}

export default GroupDetail;
