import { fireEvent, getByLabelText, render, screen } from '@testing-library/react'
import Register from '../../client/Components/Register'

describe('<Register />', () => {
// Test to check the component is render or not in the initial render
  it('Initial Render', () => {
    const { getByTestId } = render(<Register />)
    const email = getByTestId('email-input')
    const password = getByTestId('password-input')
    const repeat_password = getByTestId('repeat_password-input')
    expect(email.value).toBe('')
    expect(password.value).toBe('')
    expect(repeat_password.value).toBe('')

  })

  // vaildate the email input box
  it('validate Email', () => {
    const { getByTestId } = render(<Register />)
    const InputEl = getByTestId('email-input')
    const testValue = 'test@mail.com'

    fireEvent.change(InputEl, { target: { value: testValue } })

    /*
      regular expression - ^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$
      this regular expression validate the email
    */
    expect(InputEl.value).toMatch(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
  })

  // Test to check if password contain lowercase,uppercase,number
  it('Test Password validation for input', async () => {
    render(<Register />)
    const passwordInputEl = screen.getByTestId('password-input')
    const testValue = '#Hellouser123@'

    fireEvent.change(passwordInputEl, { target: { value: testValue } })

    /*
      regular expression - ^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])
      this regular expression check password contain lowercase,uppercase,number
    */
    expect(passwordInputEl.value).toMatch(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)
  })
})
