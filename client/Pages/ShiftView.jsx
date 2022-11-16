import React from 'react'

import NavigationBar from '../Components/NavigationBar.jsx'
// import ShiftToolbarBottom from '../Components/ShiftToolbarBottom.jsx'
// import ShiftToolbarTop from '../Components/ShiftToolbarTop.jsx'
// import ShiftViewBody from '../Components/ShiftViewBody.jsx'

import { Box } from '@mui/material'

export default function ShiftView (props) {
  return (
    <Box>
      <NavigationBar />
      <h1>You did it!</h1>
    </Box>
  )
}
