import React from 'react'

import NavigationBar from '../Components/NavigationBar.jsx'
import ShiftViewToolbarBottom from '../Components/ShiftViewToolbarBottom.jsx'
import ShiftViewToolbarTop from '../Components/ShiftViewToolbarTop.jsx'
import ShiftViewBody from '../Components/ShiftViewBody.jsx'

import { Box, Grid } from '@mui/material'

/** Notes for Shift View date retrieval:
 ** UI design PPT is in #diagrams-frontend.
 * TODO: Find some way to pass the date to this component depending on which day button is pressed.
 * ? Should the date be put in the Master View page or in the Day component?
 * ? Pass the date from Day to Master View using callback, pass date to ShiftView, then navigate?
*/

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
      <Box sx={{
        flexDirection: 'column'
      }}>
        <NavigationBar />
        <Grid container direction="column" justifyContent="space-between">
          <Grid item xs={ 2 }>
            <ShiftViewToolbarTop date='DATE WILL GO HERE'/>
          </Grid>
          <Grid item xs>
            <ShiftViewBody date='DATE WILL GO HERE'/>
          </Grid>
          <Grid item xs={ 2 }>
            <ShiftViewToolbarBottom />
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
