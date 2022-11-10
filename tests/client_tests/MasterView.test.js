// Day component exists
import MasterView from '../../client/Pages/MasterView.jsx'
import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

it('Test for <MasterView /> init render', async () => {
  const component = render(<MasterView />, { wrapper: BrowserRouter })

  expect(document.body).toBe(component.baseElement)
})
