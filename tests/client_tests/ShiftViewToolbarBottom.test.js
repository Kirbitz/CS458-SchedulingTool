// ShiftViewToolbarBottom renders
import ShiftViewToolbarBottom from '../../client/Components/ShiftViewToolbarBottom.jsx'
import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

it('Test for <ShiftViewToolbarBottom /> init render', async () => {
  const component = render(<ShiftViewToolbarBottom />, { wrapper: BrowserRouter })

  expect(document.body).toBe(component.baseElement)
})
