import React from 'react'
import PropTypes from 'prop-types'

import Day from './Day.jsx'
import Timeline from './Timeline.jsx'

// Week component for the master schedule view
export default function Week (props) {
  const { weekdates } = props

  // Maps each day and date of the week to a Day component
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const weekDays = weekdates?.map((day, index) => {
    return (
      <Day key={index} weekday={dayNames[day.getDay()]} date={day} />
    )
  })

  return (
    // remember we need to have everything in a parent root tag including javascript
    <div style={{ position: 'absolute', left: '10px', display: 'flex', flexDirection: 'row' }}>
      <Timeline/>
      {weekDays}
    </div>
  )
}
// Checks that the props passed in match the correct type
Week.propTypes = {
  weekdates: PropTypes.arrayOf(PropTypes.instanceOf(Date))
}

// defaults the props to a set value if they are not required
Week.defaultProps = {
  week: null
}
