import NavigationBar from '../../client/Components/NavigationBar.jsx'
import React from 'react'
import { render } from '@testing-library/react'

describe('Tests for <NavigationBar />', () => {
  it('Initial Render', () => {
    const component = render(<NavigationBar />)

    expect(component.getByTestId('navigation-bar').outerHTML).toContain('root')
  })
})