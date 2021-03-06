import React from "react";

const GroupForm = ({ groupName, maxCapacity, description, fixedAmount, clickSubmit, handleChange }) => (
  <div>
    <form>
      <div className="form-group">
        <label className="text-muted">Group name</label>
        <input 
          onChange={handleChange("groupName")} 
          type="text" className="form-control"
          value={groupName}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Description</label>
        <input 
          onChange={handleChange("description")} 
          type="text" className="form-control"
          value={description}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Maximum Capacity</label>
        <input 
          onChange={handleChange("maxCapacity")} 
          type="text" className="form-control"
          value={maxCapacity}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-raised btn-primary">Submit</button>
    </form>
  </div>
);

export default GroupForm;
