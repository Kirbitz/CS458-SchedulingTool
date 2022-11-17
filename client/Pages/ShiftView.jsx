import React from 'react'

import NavigationBar from '../Components/NavigationBar.jsx'
// import ShiftViewToolbarBottom from '../Components/ShiftViewToolbarBottom.jsx'
import ShiftViewToolbarTop from '../Components/ShiftViewToolbarTop.jsx'
// import ShiftViewBody from '../Components/ShiftViewBody.jsx'

import { Box } from '@mui/material'

// Shift View page which allows a manager to assign employees to certain shifts
export default function ShiftView (props) { // props.date
  return (
    <div
      style={{
        position: 'absolute',
        left: '0px',
        right: '0px'
      }}
    >
      <Box>
        <NavigationBar />
        <ShiftViewToolbarTop date='DATE WILL GO HERE'/>
      </Box>
    </div>
  )
}
/** Notes for Shift View date retrieval:
 ** Date is passed on line 15.
 ** UI design PPT is in #diagrams-frontend.
 * TODO: Assemble ShiftViewToolbarTop.
 * TODO: Assemble ShiftViewToolbarBottom.
 * TODO: Assemble ShiftViewBody.
 * TODO: Assemble Shift.
 * TODO: Find some way to pass the date to this component depending on which day button is pressed.
 * ? Should the date be put in the Master View page or in the Day component?
 * ? Pass the date from Day to Master View using callback, pass date to ShiftView, then navigate?
*/
