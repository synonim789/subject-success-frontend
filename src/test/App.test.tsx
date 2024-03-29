import { render, screen } from '@testing-library/react'
import App from '../App'

it('should return two buttons', () => {
  render(<App />)
  const linkGoogle = screen.getByRole('link', { name: /log in by google/i })
  const linkGithub = screen.getByRole('link', { name: /log in by github/i })
  expect(linkGoogle).toBeInTheDocument()
  expect(linkGithub).toBeInTheDocument()
})
