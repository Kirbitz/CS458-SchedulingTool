import {fireEvent, getByLabelText, render, screen} from '@testing-library/react';
import Log from '../../client/Components/Log.jsx'

describe(' <Log />', () => {

  it('Initial Render',  () => {
    const component = render(<Log />)
    expect(component.baseElement.outerHTML).toContain('Remember me')
  })

  it('Test Password validation for input', async () => {
    render(<Log />);
    const passwordInputEl = screen.getByTestId('password-input');
    const testValue = "#aaAs123@";

    fireEvent.change(passwordInputEl, { target: { value: testValue } });

    /*
      regular expression - ^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])
      this regular expression check password contain lowercase,uppercase,number
    */
    expect(passwordInputEl.value).toMatch(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)
  })


})
