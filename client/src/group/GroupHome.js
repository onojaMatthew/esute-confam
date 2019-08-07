import React, { Component } from "react";
import { Link } from "react-router-dom";

class GroupHome extends Component{
  render() {
    return(
      <div style={{ height: 100}}>
        
        
        <div className="row">
          <div className="col-md-4">
            <Link to="/newgroup"><button className="btn btn-primary">Create a Cooporate Group</button></Link>
          </div>
          <div className="col-md-4">
          <Link to="/groups"><button className="btn btn-primary">Join a Cooporate Group</button></Link>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="imagebackground mt-5 mr-4">
            
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupHome;