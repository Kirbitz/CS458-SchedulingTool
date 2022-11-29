import React from 'react'
import RegisterModal from '../../client/Components/RegisterModal'
import { fireEvent, render } from '@testing-library/react'

describe('Tests for <RegisterModal />', () => {
  it('Initial Render', () => {
    const component = render(<RegisterModal open={true}/>)

    expect(document.body).toBe(component.baseElement)
  })
  it('handleClose Function called', async () => {
    const handleClose = jest.fn()
    const component = render(<RegisterModal open={true} handleClose={handleClose} />)

    await fireEvent.click(component.getByTestId('reset-input'))

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('should disable/enable submit button correctly', () => {
    const { getByTestId, queryByTestId } = render(<RegisterModal open={true} />)
    // when empty input
    expect(queryByTestId('submit-input').disabled).toBe(true)
    fireEvent.change(getByTestId('email-input'), {
      target: {
        value: 'admin@gmail.com'
      }
    })
    fireEvent.change(getByTestId('password-input'), {
      target: {
        value: 'admin1234'
      }
    })
    fireEvent.change(getByTestId('repeat_password-input'), {
      target: {
        value: 'admin1234'
      }
    })
    expect(queryByTestId('submit-input').disabled).toBe(false)
  })

  it('should validate email correctly', () => {
    const { getByTestId } = render(<RegisterModal open={true} />)
    fireEvent.input(getByTestId('email-input'), {
      target: {
        value: 'admin'
      }
    })
    expect(document.getElementById('email-helper-text').textContent).toBe('Please enter valid Email.')
    fireEvent.input(getByTestId('email-input'), {
      target: {
        value: ''
      }
    })
    expect(document.getElementById('email-helper-text').textContent).toBe('Please enter Email.')
    fireEvent.input(getByTestId('email-input'), {
      target: {
        value: 'admin@gmail.com'
      }
    })
    expect(document.getElementById('email-helper-text')).toBeFalsy()
  })

  it('should validate password correctly', () => {
    const { getByTestId } = render(<RegisterModal open={true} />)
    fireEvent.change(getByTestId('password-input'), {
      target: {
        value: '1231'
      }
    })
    fireEvent.change(getByTestId('repeat_password-input'), {
      target: {
        value: '123'
      }
    })
    expect(document.getElementById('repeat_password-helper-text').textContent).toBe('Password and Repeat Password does not match.')
    fireEvent.change(getByTestId('password-input'), {
      target: {
        value: '134'
      }
    })
    fireEvent.change(getByTestId('repeat_password-input'), {
      target: {
        value: ''
      }
    })
    expect(document.getElementById('repeat_password-helper-text').textContent).toBe('Please enter Repeat Password.')

    fireEvent.change(getByTestId('password-input'), {
      target: {
        value: ''
      }
    })
    fireEvent.change(getByTestId('repeat_password-input'), {
      target: {
        value: ''
      }
    })
    expect(document.getElementById('repeat_password-helper-text').textContent).toBe('Please enter Repeat Password.')
    expect(document.getElementById('password-helper-text').textContent).toBe('Please enter Password.')

    fireEvent.change(getByTestId('password-input'), {
      target: {
        value: '123'
      }
    })
    fireEvent.change(getByTestId('repeat_password-input'), {
      target: {
        value: '123'
      }
    })
    expect(document.getElementById('repeat_password-helper-text')).toBeFalsy()
    expect(document.getElementById('password-helper-text')).toBeFalsy()
  })

  it('should submit form correctly', () => {
    const { getByTestId } = render(<RegisterModal open={true} />)
    fireEvent.change(getByTestId('email-input'), {
      target: {
        value: 'admin@gmail.com'
      }
    })
    fireEvent.change(getByTestId('password-input'), {
      target: {
        value: 'admin12345'
      }
    })
    fireEvent.change(getByTestId('repeat_password-input'), {
      target: {
        value: 'admin12345'
      }
    })
    expect(getByTestId('submit-input').disabled).toBe(false)
    fireEvent.click(getByTestId('submit-input'))
  })
})
