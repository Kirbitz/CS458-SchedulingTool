// ShiftViewToolbarTop component exists
import ShiftViewToolbarTop from '../../client/Components/ShiftViewToolbarTop.jsx'
import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

it('Test for <ShiftViewToolbarTop /> init render', async () => {
  const component = render(<ShiftViewToolbarTop passCloseCommand={() => {}} />, { wrapper: BrowserRouter })

  expect(document.body).toBe(component.baseElement)
})
