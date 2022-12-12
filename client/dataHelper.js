import axios from 'axios'

export function userLogin (userCredentials) {
  return new Promise((resolve, reject) => {
    axios.post('/api/login', userCredentials)
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}

// Grabs information about users in a department
export function getDepartmentInfo () {
  return new Promise((resolve, reject) => {
    axios.get('/api/getEmployees')
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}

// Adds users to a department
export function postDepartmentInfo (departmentInfo) {
  return new Promise((resolve, reject) => {
    axios.post('/api/addEmployee', departmentInfo)
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}

// Searches for an employee within the system
export function searchEmployeeInfo (search) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/searchEmployees/${search}`)
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}

// Removes an employee from a department
export function deleteEmployeeFromDepartment (remove) {
  return new Promise((resolve, reject) => {
    axios.delete('/api/deleteEmployee', { data: remove })
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}

// TODO needs route implemented
export function createNewUserAccount (userData) {
  return new Promise((resolve, reject) => {
    axios.post('/fakeroute', userData)
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}
