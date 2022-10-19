import React from 'react'
import PropTypes from 'prop-types'

import { Button, Box } from '@mui/material'

// Week component for the master schedule view
export default function Week (props) {
  const { day } = props
  return (<div>
    <Box sx={{
      width: 300,
      height: 300,
      backgroundColor: 'primary.dark',
      '&:hover': {
        backgroundColor: 'primary.main',
        opacity: [0.9, 0.8, 0.7]
      }
    }}>
      <Button>{ day }</Button>
    </Box>

  </div>
  )
}

// Checks that the props passed in match the correct type
Day.propTypes = {
  day: PropTypes.string
}

// defaults the props to a set value if they are not required
Day.defaultProps = {
  day: ''
}
