import React from "react";

const SignupForm = ({ firstName, lastName, email, password, clickSubmit, handleChange }) => (
  <div>
    <form>
      <div className="form-group">
        <label className="text-muted">First name</label>
        <input 
          onChange={handleChange("firstName")} 
          type="text" className="form-control"
          value={firstName}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Last name</label>
        <input 
          onChange={handleChange("lastName")} 
          type="text" className="form-control"
          value={lastName}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input 
          onChange={handleChange("email")} 
          type="email" className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input 
          onChange={handleChange("password")}type="password" 
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-raised btn-primary">Submit</button>
    </form>
  </div>
);

export default SignupForm;
