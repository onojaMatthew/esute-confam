
// Gets a single user from the db
export const read = (userId) => {
  return fetch(`${process.env.REACT_APP_API}/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  })
    .then(response => response.json());
}

// Gets the list of users
export const list = () => {
  return fetch(`${process.env.REACT_APP_API}/users`, {
    method: "GET"
  })
    .then(response => response.json());
}

// Removes a user from the db
export const remove = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API}/user/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  })
    .then(response => response.json());
}

// set the user as an admin
export const admin = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API}/user/${userId}/admin`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "x-auth-token": token
    }
  })
    .then(response => response.json())
    .catch(err => console.log(err));
}


// Updates a user information
export const update = (userId, user) => {
  return fetch(`${process.env.REACT_APP_API}/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
    body: user
  })
    .then(response => response.json())
    .catch(err => console.log(err));
}

// Updates the localStorage with the information of the currently logged in user
export const updateLocalStorage = (user, next) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("jwt")) {
      let auth = JSON.parse(localStorage.getItem("jwt"));
      auth.user = user;
      localStorage.setItem("jwt", JSON.stringify(auth));
      next();
    }
  }
}

// Adds the group id the user join to the user model
export const addGroupId = (groupId, userId, token) => {
  return fetch(`${process.env.REACT_APP_API}/user/${userId}/addgroupid`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "x-auth-token": token
    },
    body: userId
  })
    .then(response => response.json())
    .catch(err => console.log(err));
}


