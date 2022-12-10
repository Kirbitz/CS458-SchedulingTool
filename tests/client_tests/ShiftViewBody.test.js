// ShiftViewBody renders
import ShiftViewBody from '../../client/Components/ShiftViewBody.jsx'
import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

it('Test for <ShiftViewBody /> init render', async () => {
  const component = render(<ShiftViewBody />, { wrapper: BrowserRouter })

  expect(document.body).toBe(component.baseElement)
})
