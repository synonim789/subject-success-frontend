import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test/test-utils';
import SignUpPage from './SignUpPage';

describe('Sign Up Test', () => {
   describe('with valid inputs', () => {
      it('should show toast with success message after submitting form', async () => {
         const user = userEvent.setup();
         render(<SignUpPage />);
         const emailInput = screen.getByLabelText(/email/i);
         expect(emailInput).toBeInTheDocument();

         const usernameInput = screen.getByLabelText(/username/i);
         expect(usernameInput).toBeInTheDocument();

         const passwordInput = screen.getByLabelText(/password/i);
         expect(passwordInput).toBeInTheDocument();

         const signupButton = screen.getByRole('button', { name: /sign up/i });
         expect(signupButton).toBeInTheDocument();

         await user.type(emailInput, 'test@gmail.com');
         await user.type(usernameInput, 'test1234');
         await user.type(passwordInput, 'Test12345');

         await user.click(signupButton);

         expect(
            await screen.findByText(/sign up success/i),
         ).toBeInTheDocument();
      });
   });
   describe('with invalid email', () => {
      it('should show invalid email if email is not valid', async () => {
         const user = userEvent.setup();
         render(<SignUpPage />);
         const emailInput = screen.getByLabelText(/email/i);
         await user.type(emailInput, 'test.com');

         const passwordInput = screen.getByLabelText(/password/i);
         await user.click(passwordInput);

         expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
      });
   });

   describe('with invalid password', () => {
      it('should render password is to short validation error', async () => {
         const user = userEvent.setup();
         render(<SignUpPage />);

         const passwordInput = screen.getByLabelText(/password/i);
         const emailInput = screen.getByLabelText(/email/i);
         await user.type(passwordInput, 'test123');
         await user.click(emailInput);

         expect(
            await screen.findByText(
               /password should be at least 8 characters/i,
            ),
         ).toBeInTheDocument();
      });
      it('should render password do not match criteria', async () => {
         const user = userEvent.setup();
         render(<SignUpPage />);

         const passwordInput = screen.getByLabelText(/password/i);
         const emailInput = screen.getByLabelText(/email/i);
         await user.type(passwordInput, 'test12345');
         await user.click(emailInput);

         expect(
            await screen.findByText(
               /use at least 8 characters one uppercase letter one lowercase letter and one number in your password/i,
            ),
         ).toBeInTheDocument();
      });
   });

   describe('with valid inputs but not existing on server', () => {
      it('should return error message', async () => {
         const user = userEvent.setup();

         render(<SignUpPage />);

         const emailInput = screen.getByLabelText(/email/i);
         const usernameInput = screen.getByLabelText(/username/i);
         const passwordInput = screen.getByLabelText(/password/i);
         const signUpButton = screen.getByRole('button', { name: /sign up/i });

         await user.type(emailInput, 'test2@gmail.com');
         await user.type(usernameInput, 'test1234');
         await user.type(passwordInput, 'Test12345');

         await user.click(signUpButton);

         expect(await screen.findAllByText(/user already exist/i)).toHaveLength(
            2,
         );
      });
   });
});
