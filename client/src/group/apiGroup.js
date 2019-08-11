
/**
 * The creates a new group
 * @param {group} DATA of the group to be created 
 * @param {token} Login credentials of the user creating the new group 
 */
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

// Fetches all the groups on the platform 
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

/**
 * Fetch a single group with the ID provided
 * @param {groupId} ID of the group to be fetched 
 */
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

/**
 * 
 * @param {groupId} ID of the group a user is joining
 * @param {userId} ID of the user
 * @param {token} login credentials of the user 
 */
export const join = (groupId, userId, token) => {
  console.log(userId)
  return fetch(`${process.env.REACT_APP_API}/group/newmember/${groupId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": token
    }
  })
    .then(response => response.json())
    .catch(err => console.log(err));
}

/**
 * This removes the group with the ID from the group model
 * @param {groupId} ID of the group the group to be removed 
 * @param {token} Login credentials of the user performing the operation 
 */
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
      "x-auth-token": token
    }
  })
    .then(response => response.json())
    .catch(err => console.log(err));
}

/**
 * 
 * @param {*} userId 
 * @param {*} groupId 
 * @param {*} token 
 */
export const memberSettlement = (groupId, token) => {
  return fetch(`${process.env.REACT_APP_API}/group/settlement/${groupId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "x-auth-token": token
    }
  })
    .then(response => response.json())
    .catch(err => console.log(err));
}

/**
 * Removes a member from a group
 * @param {userId} ID of the member to be removed from the group 
 * @param {token} Login credentials of the group admin 
 */
export const removeMember = (userId, groupId, token) => {
  return fetch(`${process.env.REACT_APP_API}/group/${userId}/member/${groupId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "x-auth-token": token
    }
  })
    .then(response => response.json())
    .catch(err => console.log(err));
}

/**
 * 
 */

export const startNewRound = (userId, groupId, token) => {
  return fetch(`${process.env.REACT_APP_API}/group/newround/${userId}/${groupId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "x-auth-token": token
    }
  })
    .then(response => response.json())
    .catch(err => console.log(err));
}