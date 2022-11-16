import React from 'react'
import { List, ListItem, ListItemText } from '@mui/material'

// Component displays a timeline starting at 1 am and ending at 12 am
export default function Timeline (props) {
  // Maps values from 0 - 23 to a timeline from 1 am - 12 am
  const timeItems = Array.from({ length: 24 }).map((it, index) => {
    return (
      <ListItem key={index}>
        <ListItemText align='start'>{index % 12 + 1}</ListItemText>
        <ListItemText align="end">{index >= 11 && index !== 23 ? 'PM' : 'AM'}</ListItemText>
      </ListItem>
    )
  })

  return (
    // overflow auto gives scroll bar for the react component
    <List style={{ height: '85vh' }}>
      <ListItem >
        <ListItemText primary="Time"/>
      </ListItem>
      {timeItems}
    </List>
  )
}
