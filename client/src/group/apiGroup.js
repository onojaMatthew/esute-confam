
export const createGroup = (group, token)=> {
  return fetch(`${process.env.REACT_APP_API}/group/new`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": token
    },
    body: JSON.stringify(group)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err))
}

export const getGroups = () => {
  return fetch(`${process.env.REACT_APP_API}/group`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  })
    .then(response => response.json());
} 

export const search = (searchTerm) => {
  return fetch(`${process.env.REACT_APP_API}/group/search?q=${searchTerm}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  })
    .then(response => response.json());
}

export const join = (groupId, userId, token) => {
  return fetch(`${process.env.REACT_APP_API}/group/newmember/${groupId}`, {
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

export const membership = (groupId, userId, token) => {
  return fetch(`${process.env.REACT_APP_API}/user/${userId}/membership`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "x-auth-token": token
    },
    body: groupId
  })
    .then(response => response.json())
    .catch(err => console.log(err));
}

