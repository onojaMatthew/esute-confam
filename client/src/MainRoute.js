import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Menu from './core/Menu';
// import Profile from './user/Profile';
// import Users from "./user/Users";
// import EditProfile from "./user/EditProfile";
// import FindPeople from "./user/FindPeople";
// import PrivateRoute from './auth/PrivateRoute';
// import NewPost from './posts/NewPost';
// import EditPost from "./posts/EditPost";
// import SinglePost from './posts/SinglePost';
import Sidebar from "./core/Sidebar";

const MainRoute = () => (
  <div style={{ marginBottom: 15 }}>
    <Menu />
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-9">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            {/* <PrivateRoute path="/post/create" component={NewPost} />
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
            <Route path="/post/:postId" component={SinglePost} />
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
            <PrivateRoute exact path="/user/:userId" component={Profile} />
            <PrivateRoute exact path="/findpeople" component={FindPeople} />
            <Route path="/users" component={Users} /> */}  
          </Switch>
        </div>
        <div className="col-md-3">
          <Sidebar />
        </div>
      </div>
    </div>
  </div>
);

export default MainRoute;
