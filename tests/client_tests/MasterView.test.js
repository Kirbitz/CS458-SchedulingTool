// Day component exists
import MasterView from '../../client/Pages/MasterView.jsx'
import React from 'react'
import { render } from '@testing-library/react'
import BrowserRouter from 'react-router-dom'

it('Test for <Day /> init render', () => {
  const component = render(<MasterView />, { wrapper: BrowserRouter })

  expect(document.body).toBe(component.baseElement.outerHTML).toContain('<Week/>')
})
