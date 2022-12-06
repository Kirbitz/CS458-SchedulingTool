import React from 'react'
import RegisterModal from '../../client/Components/RegisterModal'
import { fireEvent, render } from '@testing-library/react'

describe('Tests for <RegisterModal />', () => {
  it('Initial Render', () => {
    // Rendering component
    const component = render(<RegisterModal open={true}/>)
    // expecting modal is properly open on DOM
    expect(document.body).toBe(component.baseElement)
  })
  it('handleClose Function called', async () => {
    const handleClose = jest.fn()
    // expecting modal is properly open on DOM
    const component = render(<RegisterModal open={true} handleClose={handleClose} />)
    // It's calling cancel button event to close modal
    await fireEvent.click(component.getByTestId('reset-input'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('should disable/enable submit button correctly', () => {
    const { getByTestId, queryByTestId } = render(<RegisterModal open={true} />)
    // expecting submit button is disabled when empty input values
    expect(queryByTestId('submit-input').disabled).toBe(true)
    // Updating username input
    fireEvent.change(getByTestId('userName-input'), {
      target: {
        value: 'admin'
      }
    })
    // Updating password input
    fireEvent.change(getByTestId('password-input'), {
      target: {
        value: 'admin1234'
      }
    })
    // Updating repeat password input
    fireEvent.change(getByTestId('repeat_password-input'), {
      target: {
        value: 'admin1234'
      }
    })
    // Updating name input
    fireEvent.change(getByTestId('name-input'), {
      target: {
        value: 'admin'
      }
    })
    // Updating user id input
    fireEvent.change(getByTestId('userId-input'), {
      target: {
        value: '1'
      }
    })
    // Updating max hours input
    fireEvent.change(getByTestId('maxHours-input'), {
      target: {
        value: '2'
      }
    })
    // expecting submit input should not be disabled because we have entered correct values in form.
    expect(queryByTestId('submit-input').disabled).toBe(false)
  })

  it('should validate username correctly', () => {
    const { getByTestId } = render(<RegisterModal open={true} />)
    // updating wrong username input
    fireEvent.input(getByTestId('userName-input'), {
      target: {
        value: '@admin'
      }
    })
    // expecting username validation throwing error correctly
    expect(document.getElementById('userName-helper-text').textContent).toBe('Please enter valid Email.')
    // updating empty username input
    fireEvent.input(getByTestId('userName-input'), {
      target: {
        value: ''
      }
    })
    // expecting username empty validation throwing error correctly
    expect(document.getElementById('userName-helper-text').textContent).toBe('Please enter Email.')
    fireEvent.input(getByTestId('userName-input'), {
      target: {
        value: 'admin1234'
      }
    })
    expect(document.getElementById('userName-helper-text')).toBeFalsy()
  })

  it('should validate password correctly', () => {
    const { getByTestId } = render(<RegisterModal open={true} />)
    // updating password input
    fireEvent.change(getByTestId('password-input'), {
      target: {
        value: '1231'
      }
    })
    // updating repeat password input
    fireEvent.change(getByTestId('repeat_password-input'), {
      target: {
        value: '123'
      }
    })
    // expecting repeat password throwing correct error when password not matched
    expect(document.getElementById('repeat_password-helper-text').textContent).toBe('Password and Repeat Password does not match.')
    fireEvent.change(getByTestId('password-input'), {
      target: {
        value: '134'
      }
    })
    // updating empty repeat password input
    fireEvent.change(getByTestId('repeat_password-input'), {
      target: {
        value: ''
      }
    })
    // expecting repeat password throwing correct error when value empty
    expect(document.getElementById('repeat_password-helper-text').textContent).toBe('Please enter Repeat Password.')
    // updating to empty password input
    fireEvent.change(getByTestId('password-input'), {
      target: {
        value: ''
      }
    })
    // updating empty repeat password input
    fireEvent.change(getByTestId('repeat_password-input'), {
      target: {
        value: ''
      }
    })
    // expecting password and repeat password throwing correct error when both values are empty
    expect(document.getElementById('repeat_password-helper-text').textContent).toBe('Please enter Repeat Password.')
    expect(document.getElementById('password-helper-text').textContent).toBe('Please enter Password.')

    // updating to password input
    fireEvent.change(getByTestId('password-input'), {
      target: {
        value: '123'
      }
    })
    // updating to repeat password input
    fireEvent.change(getByTestId('repeat_password-input'), {
      target: {
        value: '123'
      }
    })
    // expecting password and repeat password will not throw error beecause both values ae matched
    expect(document.getElementById('repeat_password-helper-text')).toBeFalsy()
    expect(document.getElementById('password-helper-text')).toBeFalsy()
  })

  it('should validate maxHours, userId and name correctly', () => {
    const { getByTestId } = render(<RegisterModal open={true} />)
    fireEvent.change(getByTestId('maxHours-input'), {
      target: {
        value: '123'
      }
    })
    // updating empty maxHours input
    fireEvent.change(getByTestId('maxHours-input'), {
      target: {
        value: ''
      }
    })
    // expecting max hours throwing correct error when max hours empty
    expect(document.getElementById('maxHours-helper-text').textContent).toBe('Please enter Max Hours.')
    fireEvent.change(getByTestId('name-input'), {
      target: {
        value: '123'
      }
    })
    // updating empty name input
    fireEvent.change(getByTestId('name-input'), {
      target: {
        value: ''
      }
    })
    // expecting max hours throwing correct error when max hours empty
    expect(document.getElementById('name-helper-text').textContent).toBe('Please enter Name.')
    fireEvent.change(getByTestId('userId-input'), {
      target: {
        value: '123'
      }
    })
    // updating empty user id input
    fireEvent.change(getByTestId('userId-input'), {
      target: {
        value: ''
      }
    })
    // expecting max hours throwing correct error when user id empty
    expect(document.getElementById('userId-helper-text').textContent).toBe('Please enter User Id.')
  })

  it('should submit form correctly', () => {
    const { getByTestId } = render(<RegisterModal open={true} />)
    // updating to correct username input
    fireEvent.change(getByTestId('userName-input'), {
      target: {
        value: 'admin'
      }
    })
    // updating to correct password input
    fireEvent.change(getByTestId('password-input'), {
      target: {
        value: 'admin12345'
      }
    })
    // updating to correct repeat password input
    fireEvent.change(getByTestId('repeat_password-input'), {
      target: {
        value: 'admin12345'
      }
    })
    // Updating name input
    fireEvent.change(getByTestId('name-input'), {
      target: {
        value: 'admin'
      }
    })
    // Updating user id input
    fireEvent.change(getByTestId('userId-input'), {
      target: {
        value: '1'
      }
    })
    // Updating max hours input
    fireEvent.change(getByTestId('maxHours-input'), {
      target: {
        value: '2'
      }
    })
    // expecting submit button should be disabled because all input values are correct
    expect(getByTestId('submit-input').disabled).toBe(false)
    // clicking submit button
    fireEvent.click(getByTestId('submit-input'))
  })
})
