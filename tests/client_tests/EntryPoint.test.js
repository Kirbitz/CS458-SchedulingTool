import EntryPoint from '../../client/EntryPoint.jsx'
import React from 'react'
import { render } from '@testing-library/react'
import BrowserRouter from 'react-router-dom'

describe('Tests for <EntryPoint />', () => {
  it('Renders the initial entry point for the app', () => {
    const component = render(<EntryPoint />, { wrapper: BrowserRouter })

    expect(component.baseElement.outerHTML).toContain('Log In')
  })
})