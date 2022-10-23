import axios from 'axios'

export function getDepartmentInfo () {
  return new Promise((resolve, reject) => {
    axios.get('/myfakeroute')
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}

export function postDepartmentInfo (departmentInfo) {
  return new Promise((resolve, reject) => {
    axios.post('/myfakeroute', departmentInfo)
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}

export function searchEmployeeInfo (search) {
  return new Promise((resolve, reject) => {
    axios.get(`/myfakeroute/${search}`)
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}
