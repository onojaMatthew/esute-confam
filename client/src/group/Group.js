import React, { Component } from "react";
import GroupList from "./GroupList";

class Group extends Component{
  render() {
    return(
      <div>
        <nav className="navbar navbar-light bg-light mb-5">
          
          <form className="form-inline">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>
        <GroupList />
      </div>
    )
  }
}

export default Group;
