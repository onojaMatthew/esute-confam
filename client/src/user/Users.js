import React, { Component } from "react";
import { list } from "./apiUser";
import UserList from "./UserList";

class Users extends Component {
  state = {
    users: [],
  }

  componentDidMount() {
    document.title = "Users";
    list()
      .then(data => {
        if (data && data.error) {
          console.log("Error")
        } else {
          this.setState({ users: data });
        }
      });
  }
  render(){
    const { users } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Users</h2>
        <UserList users={users} />
      </div>
    );
  }
}

export default Users;
