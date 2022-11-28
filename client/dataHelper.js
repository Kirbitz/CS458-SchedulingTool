import axios from 'axios'

export function userLogin (userCredentials) {
  return new Promise((resolve, reject) => {
    axios.post('/api/login', userCredentials)
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}

// TODO update call to the correct route
export function getDepartmentInfo () {
  return new Promise((resolve, reject) => {
    axios.get('/myfakeroute')
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}

// TODO update call to the correct route
export function postDepartmentInfo (departmentInfo) {
  return new Promise((resolve, reject) => {
    axios.post('/myfakeroute', departmentInfo)
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}

// TODO update call to the correct route
export function searchEmployeeInfo (search) {
  return new Promise((resolve, reject) => {
    axios.get(`/myfakeroute/${search}`)
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}
