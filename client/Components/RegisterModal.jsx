import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import PropTypes from 'prop-types'

export default function Register ({ open, handleClose }) {
  // State management for input values
  const [input, setInput] = useState({
    username: '',
    password: '',
    repeat_password: '',
    userId: '',
    name: '',
    maxHours: ''
  })
  // State management for error values
  const [error, setError] = useState({
    username: '',
    password: '',
    repeat_password: '',
    userId: '',
    name: '',
    maxHours: '',
    username_focus: 'focused',
    password_focus: 'focused',
    repeat_password_focus: 'focused',
    userId_focus: 'focused',
    name_focus: 'focused',
    maxHours_focus: 'focused'
  })

  // this function will update the input value
  const onInputChange = (e) => {
    const { name, value } = e.target
    setInput((prev) => ({
      ...prev,
      [name]: value
    }))
    validateInput(e)
  }

  // It will check all valid input enter
  const checkAllValid = () => {
    for (const key in error) {
      console.log(key)
      if (error[key] !== '') {
        console.log('true :' + error[key])
        return true
      }
    }
    console.log('false')
    return false
  }

  // It will validate username input value.
  function ValidateUsername (username) {
    if (/^[a-zA-Z0-9]+$/.test(username)) {
      return true
    }
    return false
  }

  // It will validate all input value.
  const validateInput = (e) => {
    const { name, value } = e.target
    setError((prev) => {
      const stateObj = { ...prev, [name]: '' }
      switch (name) {
        case 'username':
          if (!value) {
            stateObj[name] = 'Please enter Username.'
          } else if (!ValidateUsername(value)) {
            stateObj[name] = 'Please enter valid Username.'
          }
          stateObj.username_focus = ''
          break
        case 'password':
          if (!value) {
            stateObj[name] = 'Please enter Password.'
          } else if (input.repeat_password && value !== input.repeat_password) {
            stateObj.repeat_password =
              'Password and Confirm Password does not match.'
          } else {
            stateObj.repeat_password = input.repeat_password
              ? ''
              : error.repeat_password
          }
          stateObj.password_focus = ''
          break

        case 'repeat_password':
          if (!value) {
            stateObj[name] = 'Please enter Repeat Password.'
          } else if (input.password && value !== input.password) {
            stateObj[name] = 'Password and Repeat Password does not match.'
          }
          stateObj.repeat_password_focus = ''
          break

        case 'userId':
          if (!value) {
            stateObj[name] = 'Please enter User Id.'
          }
          stateObj.userId_focus = ''
          break

        case 'name':
          if (!value) {
            stateObj[name] = 'Please enter Name.'
          }
          stateObj.name_focus = ''
          break

        case 'maxHours':
          if (!value) {
            stateObj[name] = 'Please enter Max Hours.'
          }
          stateObj.maxHours_focus = ''
          break

        default:
          break
      }

      return stateObj
    })
  }

  // It will handle submit form.
  const handleSubmit = (event) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    console.log({
      username: data.get('username'),
      password: data.get('password'),
      repeat_password: data.get('repeat_password'),
      user_id: data.get('userId'),
      max_hours: data.get('maxHours'),
      name: data.get('name')
    })
  }

  return (
    <Modal
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={open}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            autoFocus
            id="username"
            label="UserName"
            name="username"
            value={input.username}
            onChange={onInputChange}
            onBlur={validateInput}
            error={error.username}
            helperText={error.username}
            inputProps={{
              'data-testid': 'userName-input'
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={input.password}
            onChange={onInputChange}
            onBlur={validateInput}
            error={error.password}
            helperText={error.password}
            inputProps={{
              'data-testid': 'password-input'
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="repeat_password"
            label="Repeat Password"
            type="password"
            id="repeat_password"
            value={input.repeat_password}
            onChange={onInputChange}
            onBlur={validateInput}
            error={error.repeat_password}
            helperText={error.repeat_password}
            inputProps={{
              'data-testid': 'repeat_password-input'
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="userId"
            label="User Id"
            type="number"
            id="userId"
            value={input.userId}
            onChange={onInputChange}
            onBlur={validateInput}
            error={error.userId}
            helperText={error.userId}
            inputProps={{
              'data-testid': 'userId-input'
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            id="name"
            value={input.name}
            onChange={onInputChange}
            onBlur={validateInput}
            error={error.name}
            helperText={error.name}
            inputProps={{
              'data-testid': 'name-input'
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="number"
            name="maxHours"
            label="Max Hours"
            id="maxHours"
            value={input.maxHours}
            onChange={onInputChange}
            onBlur={validateInput}
            error={error.maxHours}
            helperText={error.maxHours}
            inputProps={{
              'data-testid': 'maxHours-input'
            }}
          />

          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            sx={{ mt: 3 }}
          >
            <Button
              onClick={handleClose}
              type="reset"
              variant="contained"
              color="error"
              data-testid="reset-input"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="success"
              variant="contained"
              sx={{ ml: 3 }}
              data-testid="submit-input"
              disabled={checkAllValid()}
            >
              Sign Up
            </Button>
          </Grid>
        </Box>
      </Box>
    </Modal>
  )
}

// Validates the props being accepted into this element
Register.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
}

// Sets the default value of the props if none are provided
Register.defaultProps = {
  open: false,
  handleClose: () => {}
}
