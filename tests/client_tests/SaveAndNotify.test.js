import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'

import SaveAndNotify from '../../client/Components/SaveAndNotify.jsx'
// Tests the cases
describe('Tests for <SaveAndNotify />', () => {
  it('Initial Render', () => {
    const component = render(<SaveAndNotify />)

    expect(document.body).toBe(component.baseElement)
  })

  it('Callback Function called', async () => {
    const callbackFunc = jest.fn()
    const component = render(<SaveAndNotify callbackFunc={callbackFunc} />)

    await fireEvent.click(component.getByTestId('save-btn'))

    expect(callbackFunc).toHaveBeenCalledTimes(1)
  })

  it('Success message shown', async () => {
    const component = render(<SaveAndNotify success={true} />)

    await fireEvent.click(component.getByTestId('save-btn'))

    expect(component.queryByTestId('alert-success-error')).not.toBeNull()

    await fireEvent.click(component.getByTitle('Close'))
    await waitFor(() => {
      expect(component.queryByTestId('alert-success-error')).toBeNull()
    })
  })

  it('Error message shown', async () => {
    const component = render(<SaveAndNotify success={false} />)

    await fireEvent.click(component.getByTestId('save-btn'))

    expect(component.getByTestId('alert-success-error').textContent).toBe('Failed To Save!')
  })
})
