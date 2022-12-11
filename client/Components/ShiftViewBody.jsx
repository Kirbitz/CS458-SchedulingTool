import { Box, Divider } from '@mui/material'
import React from 'react'
import Shift from '../Components/Shift.jsx'

/** Notes for Shift View Body:
 * TODO: Validate date prop.
 * TODO: Figure out why shift list has such a big chin.
 * TODO: Automate shift population process.
 */

// Component which houses shift components and is scrollable
export default function ShiftViewBody (props) {
  // const { date } = props
  return (
    <Box mt={ 8 } mb={ 8 }>
      <Shift />
      <Divider />
      <Shift />
      <Divider />
      <Shift />
      <Divider />
      <Shift />
      <Divider />
      <Shift />
      <Divider />
      <Shift />
      <Divider />
      <Shift />
      <Divider />
      <Shift />
      <Divider />
      <Shift />
      <Divider />
      <Shift />
      <Divider />
      <Shift />
    </Box>
  )
}
