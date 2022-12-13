import { Box, Divider } from '@mui/material'
import React from 'react'
import Shift from '../Components/Shift.jsx'

/** Notes for Shift View Body:
 * TODO: Validate date prop.
 * TODO: Figure out why shift list has such a big chin.
 * TODO: Automate shift population process.
 */

const employees = [
  'Abraham Abrahamsen',
  'Bob Robertson',
  'Cindy Cindyson',
  'Dick Dickenson',
  'Erica Ericcson',
  'Francisco Domingo Carlos Andres Sebastián d\'Anconia',
  'Joe Johnson',
  'Karlee Carlson',
  'Mark Marcussen',
  'Zoey Zimmerman'
]

const startTime = new Date()
const endTime = new Date()

startTime.setHours(12)
startTime.setMinutes(0)
endTime.setHours(16)
endTime.setMinutes(30)

// Component which houses shift components and is scrollable
export default function ShiftViewBody (props) {
  // const { date } = props
  return (
    <Box mt={ 8 } mb={ 8 }>
      <Shift />
      <Divider />
      <Shift deptName="Cybernetics" posName="Mechanical Lab SI"/>
      <Divider />
      <Shift deptName="North Campus Cafe" posName="Cook" startTime={startTime} endTime={endTime}/>
      <Divider />
      <Shift deptName="North Campus Cafe" posName="Cashier" startTime={startTime} endTime={endTime} employees={employees}/>
    </Box>
  )
}
