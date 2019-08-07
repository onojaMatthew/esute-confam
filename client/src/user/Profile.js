import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { read } from "./apiUser";
import DefaultProfileImage from "../assets/avatar.jpeg"
import DeleteUser from './DeleteUser';

class Profile extends Component {
  state = {
    user: [],
    redirectToSignup: false,
    following: false,
    error: "",
    posts: [],
  }

  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token)
      .then(data => {
        if (data && data.error) {
          this.setState({ redirectToSignup: true })
        } else {
          this.setState({
            user: data,
          });
        }
      });
  }

  
  componentDidMount() {
    document.title = "User profile";
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { user } = this.state;
    const photoUrl = user._id ? `/api/user/photo/${user._id}?${new Date().getTime()}` : DefaultProfileImage;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Profile</h2>
        <div className="row">
          <div className="col-md-4">
            <img 
              style={{ height: 200, widht: "auth" }} 
              src={photoUrl} alt={user.name}
              onError={i => i.target.src=`${DefaultProfileImage}`}
              className="img-thumbnail"
            />
          </div>
          {user && user.map(user => (
            <div className="col-md-8" key={user._id}>
              <div className="lead">
                <p><strong>Name</strong>: {user.firstName} {user.lastName}</p>
                <p><strong>Email</strong>: {user.email}</p>
                <p><strong>Balance</strong>: &#8358;{user.balance}.00</p>
                <p>{`Joined: ${user ? new Date(user.createdAt).toDateString() : null}`}</p>
              </div>
              {isAuthenticated().user && (isAuthenticated().user._id === user._id || isAuthenticated().user.userType === "admin")&& (
              <div className="row">
                <Link 
                  className="btn btn-raised btn-success"
                  to={`/user/edit/${user._id}`}
                >
                  Edit Profile
                </Link>
                <DeleteUser id={user._id} />
              </div> 
              )}
           </div>
          ))}
         
        </div>
        <div className="row">
          <div className="col md-12 mt-5 mb-5">
              
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
