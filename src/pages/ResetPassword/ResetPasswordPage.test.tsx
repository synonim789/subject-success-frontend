import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../test/test-utils';
import ResetPasswordPage from './ResetPasswordPage';

describe('Reset Password Test', () => {
   it('Should display OTP not found when user do not give an OTP number', () => {
      render(<ResetPasswordPage />);
      expect(screen.getByText(/otp not found/i)).toBeInTheDocument();
   });

   it('should display form when OTP is provided', () => {
      render(<ResetPasswordPage />, {
         preloadedState: { user: { otp: 1234 } },
      });

      const passwordFields = screen.getAllByLabelText(/password/i);
      expect(passwordFields).toHaveLength(2);

      const linkButton = screen.getByRole('button', {
         name: /update password/i,
      });

      expect(linkButton).toBeInTheDocument();
   });

   it('shold display error when one of password is to short', async () => {
      const user = userEvent.setup();
      render(<ResetPasswordPage />, {
         preloadedState: { user: { otp: 1234 } },
      });

      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

      await user.type(passwordInput, '123');
      await user.click(confirmPasswordInput);
      expect(
         await screen.findByText(/password should be at least 8 characters/i),
      ).toBeInTheDocument();
   });
   it('should dispay error when each of password dont match criteria', async () => {
      const user = userEvent.setup();
      render(<ResetPasswordPage />, {
         preloadedState: { user: { otp: 1234 } },
      });

      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const updateButton = screen.getByRole('button', {
         name: /update password/i,
      });

      await user.type(passwordInput, '123456789');
      await user.type(confirmPasswordInput, '123456789');
      await user.click(updateButton);
      expect(
         await screen.findAllByText(
            /use at least 8 characters one uppercase letter one lowercase letter and one number in your password/i,
         ),
      ).toHaveLength(2);
   });
   it('should display error message when password are not the same', async () => {
      const user = userEvent.setup();
      render(<ResetPasswordPage />, {
         preloadedState: { user: { otp: 1234 } },
      });

      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const updateButton = screen.getByRole('button', {
         name: /update password/i,
      });

      await user.type(passwordInput, 'Test!1234');
      await user.type(confirmPasswordInput, 'Test!12356');
      await user.click(updateButton);
      expect(
         await screen.findByText(/passwords does not match/i),
      ).toBeInTheDocument();
   });

   it('should display error message from server if there is an error', async () => {
      const user = userEvent.setup();
      render(<ResetPasswordPage />, {
         preloadedState: { user: { otp: 1234 } },
      });
      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const updateButton = screen.getByRole('button', {
         name: /update password/i,
      });

      await user.type(passwordInput, 'Test!1234');
      await user.type(confirmPasswordInput, 'Test!1234');
      await user.click(updateButton);

      expect(
         await screen.findByText(/cannot reset password/i),
      ).toBeInTheDocument();
   });
   it('should navigate to the reset password page if there is no error', async () => {
      const user = userEvent.setup();
      render(<ResetPasswordPage />, {
         preloadedState: { user: { otp: 1234 } },
      });
      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const updateButton = screen.getByRole('button', {
         name: /update password/i,
      });

      await user.type(passwordInput, 'Test!12345');
      await user.type(confirmPasswordInput, 'Test!12345');
      await user.click(updateButton);

      await waitFor(() =>
         expect(window.location.href).toContain('/reset-password-success'),
      );
   });
});
