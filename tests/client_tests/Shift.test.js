// Shift renders
import Shift from '../../client/Components/Shift.jsx'
import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

it('Test for <Shift /> init render', async () => {
  const component = render(<Shift />, { wrapper: BrowserRouter })

  expect(document.body).toBe(component.baseElement)
})

if('handleClickListItem', async () => {

})