import React from 'react'
import { render } from '@testing-library/react'

import { BrowserRouter, MemoryRouter, useLocation } from 'react-router-dom'

import PageRoutes from '../../client/Components/PageRoutes.jsx'

// Component for checking the route is correct
const LocationDisplay = () => {
  const location = useLocation()

  return <div data-testid="location-display">{location.pathname}</div>
}

describe('Tests for <PageRoutes />', () => {
  it('Initial Render', () => {
    const component = render(
      <React.Fragment>
        <PageRoutes />
        <LocationDisplay />
      </React.Fragment>
      , { wrapper: BrowserRouter }
    )

    expect(component.getByTestId('location-display').textContent).toBe('/login')
  })

  it('Switching Existing Routes', () => {
    const route = '/settings'

    const component = render(
      <MemoryRouter initialEntries={[route]}>
        <PageRoutes />
        <LocationDisplay />
      </MemoryRouter>
    )

    expect(component.getByTestId('location-display').textContent).toBe(route)
  })

  it('Switching Bad Route', () => {
    const route = '/monster-mash'

    const component = render(
      <MemoryRouter initialEntries={[route]}>
        <PageRoutes />
        <LocationDisplay />
      </MemoryRouter>
    )

    expect(component.getByTestId('location-display').textContent).toBe('/login')
  })
})
