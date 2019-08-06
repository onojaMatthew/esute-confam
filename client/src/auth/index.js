export const authenticate = (jwt, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
    next();
  }
}

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
}

export const signin = user => {
  return fetch(`/api/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err))
}

export const signup = user => {
  return fetch("/api/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err))
}

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt")
    next();
  }

  return fetch(`/api/signout`, {
    method: "GET"
  })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .catch(err => console.log(err.message));
}
