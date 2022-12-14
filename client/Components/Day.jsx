import React from 'react'
import PropTypes from 'prop-types'

import { Button, Card, Typography, CardContent } from '@mui/material'

// TODO: Find some way to use useNavigate() and still pass testing.
// Week component for the master schedule view
export default function Day (props) {
  const { weekday, date, passClickedDate } = props

  // console.log('Date for this Day is: ' + date)

  // Colors
  // Green #1fd655, Red #FFCCCB, Grey #B4B5B4
  const buttonTextColor = '#111C2C'
  const buttonColor = '#FFCCCB'
  const btnWidth = '100%'
  const btnHeight = '100%'

  // testing borders
  const noBorder = '0px solid black'
  // const solidBlue = '2px solid blue'
  // const dashedGreen = '2px dashed green'
  // const dashedRed = '2px dashed red'

  const divBorder = noBorder
  const dayHeaderBorder = noBorder
  const dayCardBorder = noBorder

  return (
    <div style={{ height: '135vh', width: '13vw', border: divBorder }}>
      <h3 style={{ margin: 0, height: '5%', border: dayHeaderBorder }}>
        { weekday }
      </h3>
      <Card spacing={0} sx={{ margin: 0, height: '90%', border: dayCardBorder }}>
        <Button
          data-testid={`day-button-${weekday}`}
          sx={{
            color: buttonTextColor,
            width: btnWidth,
            height: btnHeight,
            backgroundColor: buttonColor
          }}
          onClick={() => {
            passClickedDate(date)
          }}
        >
        <CardContent>
          <Typography></Typography>
        </CardContent>
        </Button>
      </Card>
    </div>
  )
}

// Checks that the props passed in match the correct type
Day.propTypes = {
  weekday: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  passClickedDate: PropTypes.func.isRequired
}

// defaults the props to a set value if they are not required
Day.defaultProps = {
  weekday: '',
  date: new Date()
}
