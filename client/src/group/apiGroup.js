
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

export const getGroup = (groupId) => {
  return fetch(`${process.env.REACT_APP_API}/group/${groupId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  })
    .then(response => response.json());
} 

// Searches the group list
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
  console.log(userId)
  return fetch(`${process.env.REACT_APP_API}/group/newmember/${groupId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": token
    },
    body: JSON.stringify(userId)
  })
    .then(response => response.json())
    .catch(err => console.log(err));
}

export const membership = (groupId, userId, token) => {
  return fetch(`${process.env.REACT_APP_API}/user/${userId}/membership`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": token
    },
    body: JSON.stringify(groupId)
  })
    .then(response => response.json())
    .catch(err => console.log(err));
}

export const remove = (groupId, token) => {
  return fetch(`${process.env.REACT_APP_API}/group/${groupId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": token
    }
  })
    .then(response => response.json());
}

// Call to searchable api at the backend
export const setSearchable = (groupId, userType, token) => {
  return fetch(`${process.env.REACT_APP_API}/group/${groupId}/${userType}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "x-auth-token": token
    }
  })
    .then(response => response.json())
    .catch(err => console.log(err));
}

// Update group model
export const editGroup = (data, groupId, token) => {
  return fetch(`${process.env.REACT_APP_API}/group/update`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": token
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(err => console.log(err));
}

// Starts automatic weekly saving
export const weeklySaving = (groupId, token) => {
  return fetch(`${process.env.REACT_APP_API}/group/sum/${groupId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      // "Content-Type": "application/json",
      "x-auth-token": token
    },
    // body: JSON.stringify()
  })
    .then(response => response.json())
    .catch(err => console.log(err));
}


// , 