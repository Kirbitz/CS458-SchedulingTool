const axios = require('axios')

export function getDepartmentStaff () {
  return new Promise((resolve, reject) => {
    axios.get('/myfakeroute')
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}
