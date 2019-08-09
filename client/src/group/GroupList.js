import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";


const GroupList = ({ groups, handleJoin }) => {
  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">S/N</th>
            <th scope="col">Group Name</th>
            <th scope="col">Group Description</th>
            <th scope="col">No. of members</th>
            <th scope="col">Date Founded</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {groups.length ? (
          <tbody>
          {groups && groups.map((group, index) => (
            <tr key={group._id}>
              <th scope="row">{index + 1}</th>
              <td>{group && group.groupName}</td>
              <td>{group && group.description}</td>
              <td>{group && group.member ? group.member.length : 0}</td>
              <td>{group && new Date(group.createdAt).toDateString()}</td>
              <td>
              {isAuthenticated().user.userType === "admin" && group.groupAdmin === isAuthenticated().user._id ? 
              <Link to={`/group/${group._id}`}>View details</Link> : 
              <button className="btn btn-primary" onClick={handleJoin.bind(this, group._id)}>Join</button>}
              </td>
            </tr>
          ))}
        </tbody>
        ) : <p className="text-center">Group list is empty</p>}
      </table>
    </div>
  );
}

export default GroupList;
