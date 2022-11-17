import React from 'react'
// import PropTypes from 'prop-types'

import { Button, Grid, IconButton, Stack } from '@mui/material'
import { Add, Close, FilterAlt } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

/** Notes for Top Toolbar:
* TODO: Create Time Block Editor before enabling Add Shift button.
* TODO: Create Filter list before enabling Filter button.
* TODO: Add date below after prop validation.
* TODO: Validate date prop.
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
    <Grid container>
      <Grid item xs={ 5 }>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Button variant="contained" endIcon={<Add />} disabled>
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
            <Button sx={{ bgcolor: '#0b233f' }} variant="contained" endIcon={<FilterAlt />} disabled>
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
          <IconButton
            aria-label="close"
            onClick={() => {
              navigate('/master-schedule')
            }}
          >
            <Close />
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
  )
}
