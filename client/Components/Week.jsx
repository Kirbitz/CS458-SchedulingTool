import React from 'react'

import Day from './Day.jsx'
import Timeline from './Timeline.jsx'
// import { Grid } from '@mui/material'

// const dateData = [{ weekday: 'Monday', date: 23 }]

// Week component for the master schedule view
export default function Week (props) {
  return (

                <div style={{ position: 'absolute', left: '10px', display: 'flex', flexDirection: 'row' }}>
                  <Timeline sx={{ border: '2px solid black' }}/>
                  <Day weekday={ 'Monday' }/>
                  <Day weekday={ 'Tuesday' }/>
                  <Day weekday={ 'Wednesday' }/>
                  <Day weekday={ 'Thursday' }/>
                  <Day weekday={ 'Friday' }/>
                  <Day weekday={ 'Saturday' }/>
                  <Day weekday={ 'Sunday' }/>
                </div>
  )
}
