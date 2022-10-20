import React from 'react'

import NavigationBar from './NavigationBar.jsx'
import Week from './Week.jsx'
import { Grid, Box, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material'
// import { List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material'
import { PersonRoundedIcon } from '@mui/icons-material/PersonRounded'

// const dateData = [{ weekday: 'Monday', date: 23 }]
// Week component for the master schedule view

export default function MasterView (props) {
  return (
  // TODO Month label
  // TODO date and day info on each day
  // TODO scroll bar for weeks
  // List of names for employees
  // make Day a card
    <Box>
      <Grid container>
        <Grid item>
          <NavigationBar/>
        </Grid>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {/* <Grid item>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <PersonRoundedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="People"/>
                  </ListItemButton>
                </ListItem>
              </List>
            </Grid> */}
            <Grid item>
              <Week/>
            </Grid>
        </Grid>
      </Box>
  )
}
