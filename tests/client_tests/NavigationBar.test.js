import React from 'react'
import { render } from '@testing-library/react'

import NavigationBar from '../../client/Components/NavigationBar.jsx'
import { BrowserRouter } from 'react-router-dom'

describe('Tests for <NavigationBar />', () => {
  it('Initial Render', () => {
    const component = render(<NavigationBar />, { wrapper: BrowserRouter })

    expect(document.body).toBe(component.baseElement)
  })

  it.each`
  input
  ${'Dashboard'}
  ${'Master'}
  ${'Employee'}
  ${'Staff'}
  ${'Department'}
  ${'Settings'}
  `('Parameter Checks for selected button', ({ input }) => {
    const component = render(<NavigationBar currentlySelected={input} />, { wrapper: BrowserRouter })

    expect(component.getByTestId(input).outerHTML).toContain('colorWarning')
  })
})
