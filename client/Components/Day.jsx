import React from 'react'
import PropTypes from 'prop-types'

import { Button, Container, Box } from '@mui/material'

// Week component for the master schedule view
export default function Day (props) {
  const { weekday } = props
  // const dd = this.props

  return (<div>
       <Container>
       <Box sx={{
         mx: 'auto',
         color: '#111C2C',
         width: 150,
         height: 50
       }}>
          { weekday }</Box>
        <Button sx={{
          mx: 'auto',
          color: '#111C2C',
          width: 150,
          height: 100,
          backgroundColor: '#B4B5B4'
        }}></Button>
       </Container>
  </div>
  )
}

// Checks that the props passed in match the correct type
Day.propTypes = {
  weekday: PropTypes.string
}

// defaults the props to a set value if they are not required
Day.defaultProps = {
  weekday: ''
}
