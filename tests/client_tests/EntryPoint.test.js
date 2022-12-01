import EntryPoint from '../../client/EntryPoint.jsx'
import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

it('Test for <EntryPoint />', () => {
  const component = render(<EntryPoint />, { wrapper: BrowserRouter })

  expect(document.body).toBe(component.baseElement)
})
