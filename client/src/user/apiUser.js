
// Gets a single user from the db
export const read = (userId) => {
  return fetch(`/api/user/${userId}`, {
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
  return fetch("/api/users", {
    method: "GET"
  })
    .then(response => response.json());
}

// Removes a user from the db
export const remove = (userId, token) => {
  return fetch(`/api/user/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  })
    .then(response => response.json());
}

// Updates a user information
export const update = (userId, user) => {
  return fetch(`/api/user/${userId}`, {
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


