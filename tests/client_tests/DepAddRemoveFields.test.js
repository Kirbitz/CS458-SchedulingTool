import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import DepAddRemoveFields from '../../client/Components/DepAddRemoveFields.jsx'

describe('Tests for <DepAddRemoveFields />', () => {
  let employees
  beforeAll(() => {
    employees = [
      {
        userId: '8675309',
        userName: 'Rick Roll'
      },
      {
        userId: '5555555',
        userName: 'Ben Dover'
      }
    ]
  })

  it('Initial Render', () => {
    const component = render(<DepAddRemoveFields />)

    expect(document.body).toBe(component.baseElement)
  })

  it('Current Employee and Search Employee provided', () => {
    const component = render(<DepAddRemoveFields currentEmployees={employees} searchEmployees={employees} />)

    expect(component.getAllByTestId('option-in-department').length).toBe(employees.length)
    expect(component.getAllByTestId('option-not-in-department').length).toBe(employees.length)
  })

  it('Select options is current employee box', async () => {
    let result = []
    const removeEmployees = jest.fn((response) => { result = response })

    const component = render(<DepAddRemoveFields currentEmployees={employees} removeEmployees={removeEmployees} />)

    await fireEvent.change(screen.getAllByRole('listbox').at(0), { target: { value: employees[0].id } })
    await fireEvent.click(component.getByTestId('remove-btn'))

    expect(removeEmployees.mock.calls.length).toBe(1)
    expect(result).toEqual([employees[0].id])
  })

  it('Select options is search employee box', async () => {
    let result = []
    const addEmployees = jest.fn((response) => { result = response })

    const component = render(<DepAddRemoveFields searchEmployees={employees} addEmployees={addEmployees} />)

    await fireEvent.change(screen.getAllByRole('listbox').at(1), { target: { value: 0 } })
    await fireEvent.click(component.getByTestId('add-btn'))

    expect(addEmployees.mock.calls.length).toBe(1)
    expect(result).toEqual([employees[0]])
  })

  it('No functions provided', async () => {
    const addRemoveEmployees = jest.fn()

    const component = render(<DepAddRemoveFields />)
    await fireEvent.click(component.getByTestId('add-btn'))
    await fireEvent.click(component.getByTestId('remove-btn'))

    expect(addRemoveEmployees.mock.calls.length).toBe(0)
  })
})
