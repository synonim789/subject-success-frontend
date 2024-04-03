import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '../../test/test-utils'
import LoginPage from './LoginPage'

const mockedUseNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  )
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  }
})

describe('Login Test', () => {
  it('should redirect to home page when user is logged in correctly', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)
    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toBeInTheDocument()

    const passwordInput = screen.getByLabelText(/password/i)
    expect(passwordInput).toBeInTheDocument()

    const loginButton = screen.getByRole('button', { name: /login/i })
    expect(loginButton).toBeInTheDocument()

    await user.type(emailInput, 'test@gmail.com')
    await user.type(passwordInput, 'Test12345')

    await user.click(loginButton)

    waitFor(() => {
      expect(mockedUseNavigate).toBeCalledWith('/')
    })
  })
  it('should show invalid email if email is not valid', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)
    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'test.com')

    const loginButton = screen.getByRole('button', { name: /login/i })
    await user.click(loginButton)

    expect(await screen.findAllByRole('alert')).toHaveLength(2)
  })
})
