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

    await fireEvent.click(component.getByTestId('close-register-modal'))

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it.each`
  input
  ${{ label: 'User Id', value: 'asdf' }}
  ${{ label: 'Name', value: '123' }}
  ${{ label: 'Username', value: 'asdf$#2' }}
  ${{ label: 'Max Hours', value: 'asdf' }}
  ${{ label: 'Password', value: 'asdf&*(0' }}
  ${{ label: 'Repeat Password', value: 'anything' }}
  `('TextFields Display Error', async ({ input }) => {
    const component = render(<RegisterModal open={true} />)

    await fireEvent.change(component.getByLabelText(input.label), { target: { value: input.value } })

    expect(component.getByLabelText(input.label).outerHTML).toContain('aria-invalid="true"')
  })

  it('TextField Input Valid', async () => {
    const component = render(<RegisterModal open={true} />)

    await fireEvent.change(component.getByLabelText('User Id'), { target: { value: '123' } })
    await fireEvent.change(component.getByLabelText('Name'), { target: { value: 'John Smith' } })
    await fireEvent.change(component.getByLabelText('Username'), { target: { value: 'smithj123' } })
    await fireEvent.change(component.getByLabelText('Max Hours'), { target: { value: '42069' } })
    await fireEvent.change(component.getByLabelText('Password'), { target: { value: 'MySecretPassword' } })
    await fireEvent.change(component.getByLabelText('Repeat Password'), { target: { value: 'MySecretPassword' } })

    expect(component.getByTestId('save-btn').disabled).toBe(false)
  })
})
