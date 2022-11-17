import React from 'react'

import Day from './Day.jsx'
import Timeline from './Timeline.jsx'

// Maps each day of the week to a Day component
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => {
  return (
    <Day key={index} weekday={day} />
  )
})

// Week component for the master schedule view
export default function Week (props) {
  return (
    // remember we need to have everything in a parent root tag including javascript
    <div style={{ position: 'absolute', left: '10px', display: 'flex', flexDirection: 'row' }}>
      <Timeline/>
      {weekDays}
    </div>
  )
}
