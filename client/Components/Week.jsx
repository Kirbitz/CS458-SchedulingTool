import React from 'react'

import Day from './Day.jsx'
import { Container } from '@mui/material'

// const dateData = [{ weekday: 'Monday', date: 23 }]
// Week component for the master schedule view
export default function Week (props) {
  return (
    <Container sx= {{
      mx: 'auto',
      width: '1/4',
      // border: '2px #111C2C solid',
      display: 'grid',
      gap: 0.5,
      gridTemplateColumns: 'repeat(7, 1fr)'
    }}>
      <Day weekday={ 'Monday' }/>
      <Day weekday={ 'Tuesday' }/>
      <Day weekday={ 'Wednesday' }/>
      <Day weekday={ 'Thursday' }/>
      <Day weekday={ 'Friday' }/>
      <Day weekday={ 'Saturday' }/>
      <Day weekday={ 'Sunday' }/>
    </Container>
  )
}
