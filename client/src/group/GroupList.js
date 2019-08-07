import React from "react";
import { Link } from "react-router-dom";

const GroupList = ({ groups }) => {
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
        <tbody>
          {groups && groups.map((group, index) => (
            <tr key={group._id}>
              <th scope="row">{index + 1}</th>
              <td>{group && group.groupName}</td>
              <td>{group && group.description}</td>
              <td>{group && group.member ? group.member.length : 0}</td>
              <td>{group && new Date(group.createdAt).toDateString()}</td>
              <Link to="/details"><td>View details</td></Link>
            </tr>
          ))}
          
          {/* <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}

export default GroupList;
