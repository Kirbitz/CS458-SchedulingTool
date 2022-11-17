import { Box } from '@mui/material'
import React from 'react'
import Shift from '../Components/Shift.jsx'

/** Notes for Shift View Body:
 * TODO: Validate date prop.
 * TODO: Reformat the body so it's scrollable rather than fixed.
 ** Remember, we want this component scrollable, but the bottom toolbar to stay at the bottom.
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
      <Shift />
      <Shift />
      <Shift />
      <Shift />
      <Shift />
      <Shift />
      <Shift />
      <Shift />
      <Shift />
    </Box>
  )
}
