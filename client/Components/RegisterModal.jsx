import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import PropTypes from 'prop-types'

export default function Register ({ open, handleClose }) {
  const [input, setInput] = useState({
    email: '',
    password: '',
    repeat_password: ''
  })

  const [error, setError] = useState({
    email: '',
    password: '',
    repeat_password: '',
    email_focus: 'focused',
    password_focus: 'focused',
    repeat_password_focus: 'focused'
  })

  const onInputChange = (e) => {
    const { name, value } = e.target
    setInput((prev) => ({
      ...prev,
      [name]: value
    }))
    validateInput(e)
  }
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
  function ValidateEmail (email) {
    if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true
    }
    return false
  }

  const validateInput = (e) => {
    const { name, value } = e.target
    setError((prev) => {
      const stateObj = { ...prev, [name]: '' }

      switch (name) {
        case 'email':
          if (!value) {
            stateObj[name] = 'Please enter Email.'
          } else if (!ValidateEmail(value)) {
            stateObj[name] = 'Please enter valid Email.'
          }
          stateObj.email_focus = ''

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

        default:
          break
      }

      return stateObj
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      repeat_password: data.get('repeat_password')
    })
  }

  return (
    <Modal onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" open={open}>
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
              id="email"
              label="Email Address"
              type="email"
              name="email"
              autoComplete="email"
              value={input.email}
              onChange={onInputChange}
              onBlur={validateInput}
              error={error.email}
              helperText={error.email}
              inputProps={{
                'data-testid': 'email-input'
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
