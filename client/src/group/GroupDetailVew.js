import React, { Component } from "react";
import EditGroup from "./EditGroup";
import { removeMember, startNewRound } from "./apiGroup";
import { isAuthenticated } from "../auth";

// custom style
const styles = {
  text: {
    fontSize: 12
  },
  h3: {
    color: "#009688",
    marginBottom: 25
  },
  p: {
    color: "skyblue"
  }
}

class GroupDetailView extends Component {
  state = {
    isOpen: false,
    error: "",
  }

  toggleView = () => {
    this.setState((prevState) => {
      return {
        isOpen: !prevState.isOpen
      }
    });
  }

  // calls removeMember route at the backend
  handleDeleteMember(userId, groupId){
    const token = isAuthenticated().token;
    removeMember(userId, groupId, token)
      .then(data => {
        if (data && data.error) {
          this.setState({ error: data.error });
        }
      });
  }

  // Calls startNewRound route at the backend
  handleNewRound = (groupId) => {
    const token = isAuthenticated().token;
    const userId = isAuthenticated().user._id;
    startNewRound(userId, groupId, token)
      .then(data => {
        if (data && data.error) {
          this.setState({ error: data.error });
        }
      });
  }

  renderView = () => {
    const { isOpen } = this.state;
    const { selectedGroup, clickDelete, clickSearchable } = this.props;

    let id;
    if (selectedGroup) {
      id = selectedGroup._id;
    }

    if (isOpen) {
      return (
        <EditGroup selectedGroup={selectedGroup} />
      );
    } else {
      return (
        <div>
          <div className="row">
          <div className="col-md-8">
            <h4 style={styles.h3}>{selectedGroup ? selectedGroup.groupName : "No Records"}</h4>
          </div>
          <div className="col-md-4">
            <button 
              style={styles.h3} 
              className="btn btn-info"
              onClick={clickSearchable.bind(this, id)}
            >
              Click to Make group searchable
            </button>
          </div>
        </div>
        
        <p style={styles.p}>Group information</p>
        
        {selectedGroup ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Group Name</th>
                <th scope="col">Group Description</th>
                <th scope="col">No. of members</th>
                <th scope="col">Date Founded</th>
                <th scope="col">Fixed Amount</th>
                <th scope="col">Total Fund</th>
                <th scope="col">Max Capacity</th>
                <th scope="col">Searchable</th>
                <th scope="col">Admin</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.text}>{selectedGroup && selectedGroup.groupName}</td>
                <td style={styles.text}>{selectedGroup && selectedGroup.description}</td>
                <td style={styles.text}>{selectedGroup && selectedGroup.member ? selectedGroup.member.length : 0}</td>
                <td style={styles.text}>{selectedGroup && new Date(selectedGroup.createdAt).toDateString()}</td>
                <td style={styles.text}>{selectedGroup && selectedGroup.fixedAmount}</td>
                <td style={styles.text}>{selectedGroup && selectedGroup.weeklyTotal}</td>
                <td style={styles.text}>{selectedGroup && selectedGroup.maxCapacity}</td>
                <td style={styles.text}>{selectedGroup && selectedGroup.searchable === false ? "False" : "True"}</td>
                <td style={styles.text}>{selectedGroup && selectedGroup.groupAdmin.firstName}</td>
                <td >
                  <button
                    style={styles.text} 
                    className="btn btn-danger"
                    onClick={clickDelete.bind(this, id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : <p className="text-center">No records to show</p>}
        <button onClick={this.toggleView} type="button" className="btn btn-primary">Edit Group</button>
        </div>
      );
    }
  }

  render() {
    const { error } = this.state;
    const { selectedGroup } = this.props;
    console.log(selectedGroup && selectedGroup.member)
    return (
      <div>
        {this.renderView()}
        <hr className="mt-5" />

          <div className="alert alert-danger" style={{ display: error ? "block" : "none"}}>{error}</div>       
         <div className="row mt-5">
          <div className="col-md-4">
            <p style={styles.p}>Group members</p>
          </div>
          <div className="col-md-4">
            <button 
              onClick={this.handleNewRound.bind(this, selectedGroup && selectedGroup._id)}
              style={styles.h3} 
              type="button" 
              className="btn btn-info">
                Start a new round
            </button>
          </div>
          <div className="col-md-4">
            <button style={styles.h3} type="button" className="btn btn-info">Reshuffle list</button>
          </div>
        </div>
        {selectedGroup && selectedGroup.member ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Balance</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedGroup && selectedGroup.member ? selectedGroup.member.map(member => (
                <tr key={member._id}>
                 <td style={styles.text}>{member.firstName} </td>
                 <td style={styles.text}>{member.lastName}</td>
                 <td style={styles.text}>{member.email}</td>
                 <td style={styles.text}>{member.balance}</td>
                 <td>
                    <button 
                      style={styles.text} 
                      className="btn btn-danger"
                      onClick={this.handleDeleteMember.bind(this, member._id, selectedGroup._id,)}
                    >
                      Remove member
                    </button>
                  </td>
               </tr>
              )) : <p>No member for this Group</p>}
             
            </tbody>
          </table>
        ) : <p className="text-center">Member list is empty</p>}
        
      </div>
    );
  }
}
export default GroupDetailView;

