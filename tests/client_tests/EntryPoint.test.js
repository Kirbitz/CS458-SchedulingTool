import EntryPoint from '../../client/EntryPoint.jsx'
import React from 'react'
import { render } from '@testing-library/react'

it('Renders the initial entry point for the app', () => {
  const component = render(<EntryPoint />)

  expect(component.getByTestId('MuiContainer').outerHTML).toContain('root')
})
