import Express from 'express'
import path from 'path'
import fs from 'fs'
import axios from 'axios'
import dotenv from 'dotenv'
import { generateEmployees } from './dataCollection.js'

// Read the .env variables into the environment
dotenv.config()

let employeeData = {}

// Generates data of the employees from humanity
// Separates data into two files employeeData.json and managerData.json
// Manager names will have to be updated in dataCollection.js
generateEmployees()
  .then(() => {
    // Grab raw data for the board employees
    const rawData = fs.readFileSync(path.join('server', 'api', 'employeeData.json'), { encoding: 'utf-8' })
    employeeData = JSON.parse(rawData)
  })
  .catch((err) => {
    console.log('Failed to collect employee data!')
    console.error(err)
  })

// router to run specific get, post, and delete requests
const router = new Express.Router()
router.use(Express.urlencoded({ extended: true }))
router.use(Express.json())

// Posts all employees to screen in JSON format
router.get('/employees', (req, res) => {
  const summaryEmployees = employeeData.map((employee) => {
    return {
      id: employee.id,
      name: employee.name,
      yearAtSTAR: employee.yearAtSTAR,
      major: employee.major,
      locations: employee.locations,
      avatar: employee.avatar
    }
  })
  res.json(summaryEmployees)
})

// Posts a single employee to screen in JSON format
router.get('/employee/:id', (req, res) => {
  const employeeID = req.params.id
  const summaryEmployee = employeeData.find((employee) => {
    return employee.id === employeeID
  })

  if (summaryEmployee) {
    res.json(summaryEmployee)
  } else {
    res.status(404).json({
      error: 'Failed to find employee'
    })
  }
})

// Collect information on weekend shifts for the entire semester
router.get('/weekend_shifts/:monthStart/:dayStart/:yearStart/:monthEnd/:dayEnd/:yearEnd', (req, res) => {
  // Parses information from the get request into the appropriate variables
  const yearStart = req.params.yearStart
  const yearEnd = req.params.yearEnd
  const monthStart = req.params.monthStart
  const monthEnd = req.params.monthEnd
  const dayStart = req.params.dayStart
  const dayEnd = req.params.dayEnd

  // Reads in the employee data
  const employeeRawData = fs.readFileSync('./server/api/employeeData.json', { encoding: 'utf-8' })
  const employeeJSONData = JSON.parse(employeeRawData)

  // Makes call to the humanity api for shifts from a start and end date
  axios.get(`https://www.humanity.com/api/v2/shifts?access_token=${process.env.API_KEY}&start_date=${yearStart}-${monthStart}-${dayStart}&end_date=${yearEnd}-${monthEnd}-${dayEnd}`)
    .then((response) => {
      // Loops through all employees and fixes data for a specific json format
      employeeJSONData.forEach(employee => {
        employee.saturday = 0
        employee.sunday = 0
        employee.total_shifts = 0
        employee.saturday_dates = []
        employee.sunday_dates = []
        delete employee.email
        delete employee.phone
        delete employee.yearAtSTAR
        delete employee.major
        delete employee.avatar
        delete employee.interestingFact
      })
      // Loops through response data
      response.data.data.forEach(element => {
        // Makes sure the element.employees tag has data in it
        if (element.employees) {
          // Checks if the shift is marked for saturday and then finds the employee and increments their saturday and total shifts by 1
          // Also appends the shift's timestamp to the saturday_dates array in employees
          if (element.start_date.weekday === 'Sat') {
            element.employees.forEach(employee => {
              const employeeElement = employeeJSONData.find(item => { return item.name === employee.name })
              if (employeeElement) {
                employeeElement.saturday += 1
                employeeElement.saturday_dates.push(element.start_date.formatted + ' at ' + element.start_date.time)
                employeeElement.total_shifts += 1
              }
            })
          }
          // Checks if the shift is marked for sunday and then finds the employee and increments their saturday and total shifts by 1
          // Also appends the shift's timestamp to the sunday_dates array in employees
          if (element.start_date.weekday === 'Sun') {
            element.employees.forEach(employee => {
              const employeeElement = employeeJSONData.find(item => { return item.name === employee.name })
              if (employeeElement) {
                employeeElement.sunday += 1
                employeeElement.sunday_dates.push(element.start_date.formatted + ' at ' + element.start_date.time)
                employeeElement.total_shifts += 1
              }
            })
          }
        }
      })
      // Returns data in json format
      res.json(employeeJSONData)
    })
    .catch((err) => {
      res.status(404).json({
        error: 'Failed to find employee: ' + err
      })
    })
})

// Collect information on week shifts for time selected
router.get('/shifts/:monthStart/:dayStart/:yearStart/:monthEnd/:dayEnd/:yearEnd', (req, res) => {
  // Parses information from the get request into the appropriate variables
  const yearStart = req.params.yearStart
  const yearEnd = req.params.yearEnd
  const monthStart = req.params.monthStart
  const monthEnd = req.params.monthEnd
  const dayStart = req.params.dayStart
  const dayEnd = req.params.dayEnd

  // Reads in the employee data
  const employeeRawData = fs.readFileSync('./server/api/employeeData.json', { encoding: 'utf-8' })
  const employeeJSONData = JSON.parse(employeeRawData)

  // Makes call to the humanity api for shifts from a start and end date
  axios.get(`https://www.humanity.com/api/v2/shifts?access_token=${process.env.API_KEY}&start_date=${yearStart}-${monthStart}-${dayStart}&end_date=${yearEnd}-${monthEnd}-${dayEnd}`)
    .then((response) => {
      // Loops through all employees and fixes data for a specific json format
      employeeJSONData.forEach(employee => {
        employee.walkup = 0
        employee.qa = 0
        employee.pcrepair = 0
        employee.total_shifts = 0
        employee.total_shifts = 0
        employee.walkup_dates = []
        employee.qa_dates = []
        employee.pcrepair_dates = []
        delete employee.email
        delete employee.phone
        delete employee.yearAtSTAR
        delete employee.major
        delete employee.avatar
        delete employee.interestingFact
      })

      // Loops through response data
      response.data.data.forEach(element => {
        // Makes sure the element.employees tag has data in it
        if (element.employees) {
          // Checks if the shift is marked for QA and then finds the employee and increments their saturday and total shifts by 1
          // Also appends the shift's timestamp to the qa_dates array in employees
          if (element.schedule_name === 'QA') {
            element.employees.forEach(employee => {
              const employeeElement = employeeJSONData.find(item => { return item.name === employee.name })
              if (employeeElement) {
                employeeElement.qa += 1
                employeeElement.qa_dates.push(element.start_date.formatted + ' at ' + element.start_date.time)
                employeeElement.total_shifts += 1
              }
            })
          }
          // Checks if the shift is marked for PC Repair and then finds the employee and increments their saturday and total shifts by 1
          // Also appends the shift's timestamp to the pcrepair_dates array in employees
          if (element.schedule_name === 'PC Repair') {
            element.employees.forEach(employee => {
              const employeeElement = employeeJSONData.find(item => { return item.name === employee.name })
              if (employeeElement) {
                employeeElement.pcrepair += 1
                employeeElement.pcrepair_dates.push(element.start_date.formatted + ' at ' + element.start_date.time)
                employeeElement.total_shifts += 1
              }
            })
          }
          // Checks if the shift is marked for walkup and then finds the employee and increments their saturday and total shifts by 1
          // Also appends the shift's timestamp to the walkup_dates array in employees
          if (element.schedule_name === 'Walkup') {
            element.employees.forEach(employee => {
              const employeeElement = employeeJSONData.find(item => { return item.name === employee.name })
              if (employeeElement) {
                employeeElement.walkup += 1
                employeeElement.walkup_dates.push(element.start_date.formatted + ' at ' + element.start_date.time)
                employeeElement.total_shifts += 1
              }
            })
          }
        }
      })
      // Returns data in json format
      res.json(employeeJSONData)
    })
    .catch((err) => {
      res.status(404).json({
        error: 'Failed to find employee: ' + err
      })
    })
})

// Post route for adding multiple shifts to humanity
router.post('/add_shift', (req, res, next) => {
  if (req.body) {
    req.body.forEach(shift => {
      const shiftData = {
        start_time: shift.start_time,
        end_time: shift.end_time,
        start_date: shift.start_date,
        end_date: shift.end_date,
        schedule: shift.schedule,
        employee_id: shift.employee_id,
        needed: shift.needed
      }
      axios.post(`https://www.humanity.com/api/v2/shifts?access_token=${process.env.API_KEY}`, shiftData)
    })
    res.sendStatus(200)
  } else {
    res.sendStatus(404).json({
      error: 'Failed to create shift'
    })
  }
})

export default router
