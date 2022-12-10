/** * @jest-environment jsdom */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { screen } from '@testing-library/react'
import { render } from './test-utils'
import App from './App'

const mockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
  }))

test('renders learn react link', () => {
  render(<App/>)
})