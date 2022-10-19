import React from 'react'

import NavigationBar from './NavigationBar.jsx'
import Week from './Week.jsx'
import { Container } from '@mui/material'

// const dateData = [{ weekday: 'Monday', date: 23 }]
// Week component for the master schedule view
export default function MasterView (props) {
  return (
    <Container>
      <NavigationBar/>
      <br></br>
      <br></br>
      <br></br>
      <Week/>
    </Container>
  )
}
