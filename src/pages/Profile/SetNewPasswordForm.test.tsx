import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test/test-utils';
import SetNewPasswordForm from './SetNewPasswordForm';

describe('Set New Password Form Test', () => {
   it('should render two inputs and button', async () => {
      render(<SetNewPasswordForm />);

      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const resetButton = screen.getByRole('button', {
         name: /reset password/i,
      });
      expect(passwordInput).toBeInTheDocument();
      expect(confirmPasswordInput).toBeInTheDocument();
      expect(resetButton).toBeInTheDocument();
   });
   it('shold display error when one of password is to short', async () => {
      const user = userEvent.setup();
      render(<SetNewPasswordForm />);

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
      render(<SetNewPasswordForm />);

      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const updateButton = screen.getByRole('button', {
         name: /reset password/i,
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
      render(<SetNewPasswordForm />);

      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const updateButton = screen.getByRole('button', {
         name: /reset password/i,
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
      render(<SetNewPasswordForm />);
      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const updateButton = screen.getByRole('button', {
         name: /reset password/i,
      });

      await user.type(passwordInput, 'Test!1234');
      await user.type(confirmPasswordInput, 'Test!1234');
      await user.click(updateButton);

      expect(
         await screen.findByText(/cannot reset password/i),
      ).toBeInTheDocument();
   });
   it('should render toast and clear inputs if passwords are valid and match', async () => {
      const user = userEvent.setup();
      render(<SetNewPasswordForm />);
      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const resetPasswordButton = screen.getByRole('button', {
         name: /reset password/i,
      });

      await user.type(passwordInput, 'Test!12345');
      await user.type(confirmPasswordInput, 'Test!12345');
      await user.click(resetPasswordButton);

      expect(await screen.findByText(/reset success/i)).toBeInTheDocument();

      expect(passwordInput).toHaveValue('');
      expect(confirmPasswordInput).toHaveValue('');
   });
});
