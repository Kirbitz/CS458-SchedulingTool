import React from 'react'
// import PropTypes from 'prop-types'

import { AppBar, Button, Grid, IconButton, Stack, Toolbar, Tooltip } from '@mui/material'
import { Add, Close, FilterAlt } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

/** Notes for Top Toolbar:
* TODO: Float toolbar on top of page so it's not inaccessible after scrolling.
* TODO: Create Time Block Editor before enabling Add Shift button.
* TODO: Create Filter list before enabling Filter button.
* TODO: Refactor Filter button into Menu.
* TODO: Add date below after prop validation.
* TODO: Add tooltips to buttons.
* TODO: Validate date prop.
* * Use AppBar to float this on top of page content.
* * Remember to add a toolbar so page content isn't stuffed underneath it.
* * position="fixed" sx={{top: 'auto', bottom: 0}}
*/

/** Top toolbar for the Shift View.
 * Contains Add Shift button, which navigates to the Time Block editor,
 * a Filter button to filter out shifts in the list, and a Close button
 * to return to the Master View.
*/
export default function ShiftViewToolbarTop (props) {
  const navigate = useNavigate()
  // const { date } = props
  return (
    <AppBar position="fixed" sx={{ bgcolor: '#ffffff', color: '#000000', top: 64 }}>
      <Toolbar disableGutters>
        <Grid container>
          <Grid item xs={ 5 }>
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Button
                aria-label="add-shift-button"
                id="add-shift-button"
                variant="contained"
                endIcon={<Add />}
                disabled
              >
                Add Shift
              </Button>
              {
              }
              <p>MM/DD/YYYY</p>
            </Stack>
          </Grid>
          <Grid item xs={ 2 }>
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
                <Button
                  aria-label="filter-menu"
                  id="filter-menu"
                  sx={{ bgcolor: '#0b233f' }}
                  variant="contained"
                  endIcon={<FilterAlt />}
                  disabled
                >
                  Filter
                </Button>
            </Stack>
          </Grid>
          <Grid item xs={ 5 }>
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Tooltip title = 'Return to Master Schedule'>
                <IconButton
                  aria-label="close"
                  id="close-button"
                  onClick={() => {
                    navigate('/master-schedule')
                  }}
                >
                  <Close />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
