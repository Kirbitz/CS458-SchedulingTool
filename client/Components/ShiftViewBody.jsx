import { Box, Divider } from '@mui/material'
import React from 'react'
import Shift from '../Components/Shift.jsx'

/** Notes for Shift View Body:
 * TODO: Validate date prop.
 * TODO: Add dividers in between each shift so they're visually separate.
 * TODO: Figure out why shift list has such a big chin.
 */

/** Body of Shift View which contains a scrollable list of all shifts.
* Shifts have additional functions which allow shift editing, shift
* assignment, shift unassignment, and shift deletion.
*/
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