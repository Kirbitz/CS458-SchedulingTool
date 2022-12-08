import axios from 'axios'

export function userLogin (userCredentials) {
  return new Promise((resolve, reject) => {
    axios.post('/api/login', userCredentials)
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}

// TODO check functionality of updated call
export function getDepartmentInfo () {
  return new Promise((resolve, reject) => {
    axios.get('/api/getEmployees')
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}

// TODO check functionality of updated call
export function postDepartmentInfo (departmentInfo) {
  return new Promise((resolve, reject) => {
    axios.post('/postDepartment', departmentInfo)
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}

// TODO update call to the correct route
export function searchEmployeeInfo (search) {
  return new Promise((resolve, reject) => {
    axios.get(`/searchEmployees/${search}`)
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}

export function deleteEmployeeFromDepartment (remove) {
  return new Promise((resolve, reject) => {
    axios.delete('/deleteEmployee', remove)
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}
