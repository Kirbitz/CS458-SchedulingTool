// Day component exists
import ShiftView from '../../client/Pages/ShiftView.jsx'
import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

it('Test for <ShiftView /> init render', async () => {
  const component = render(<ShiftView />, { wrapper: BrowserRouter })

  expect(document.body).toBe(component.baseElement)
})
