import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../test/test-utils';
import OtpPage from './OtpPage';

describe('OtpPage Component Test', () => {
   it('handles user input correctly', async () => {
      const user = userEvent.setup();

      render(<OtpPage />);

      const otpInputs = screen.getAllByRole('spinbutton');

      for (let i = 0; i < otpInputs.length; i++) {
         await user.type(otpInputs[i], `${i + 1}`);
      }

      otpInputs.forEach((input, index) => {
         expect(input).toHaveValue(index + 1);
      });
   });
   it('should display an error message if OTP fields are not filled', async () => {
      const user = userEvent.setup();

      render(<OtpPage />);
      const submitButton = screen.getByRole('button', { name: /Continue/i });
      await user.click(submitButton);
      expect(
         screen.getByText(/please fill in all otp numbers/i),
      ).toBeInTheDocument();
   });

   it('should navigate to reset password after submit is valid numbers', async () => {
      const user = userEvent.setup();

      render(<OtpPage />);
      const otpInputs = screen.getAllByRole('spinbutton');

      for (let i = 0; i < otpInputs.length; i++) {
         await user.type(otpInputs[i], `${i + 1}`);
      }

      const continueButton = screen.getByRole('button', { name: /continue/i });
      await user.click(continueButton);
      await waitFor(() =>
         expect(window.location.href).toContain('/reset-password'),
      );
   });

   it('should decrement active OTP index when backspace is clicked', async () => {
      const user = userEvent.setup();
      render(<OtpPage />);
      const otpInput = screen.getAllByRole('spinbutton')[0];

      await user.type(otpInput, '1');
      await user.type(otpInput, '{backspace}');

      expect(otpInput).toHaveFocus();
   });
});
