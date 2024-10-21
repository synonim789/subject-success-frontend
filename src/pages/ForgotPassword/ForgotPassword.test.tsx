import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test/test-utils';
import ForgotPasswordPage from './ForgotPasswordPage';

describe('Forgot Password Test', () => {
   describe('With valid input', () => {
      it('should show toast with success message after submitting form', async () => {
         const user = userEvent.setup();

         render(<ForgotPasswordPage />);
         const emailInput = screen.getByLabelText(/email/i);

         const resetButton = screen.getByRole('button', {
            name: /reset password/i,
         });

         await user.type(emailInput, 'test@gmail.com');

         await user.click(resetButton);

         expect(
            await screen.findByText(/forgot password success/i),
         ).toBeInTheDocument();
      });
   });
   describe('With invalid input', () => {
      it('should render invalid email if it is invalid', async () => {
         const user = userEvent.setup();

         render(<ForgotPasswordPage />);

         const emailInput = screen.getByLabelText(/email/i);

         const resetButton = screen.getByRole('button', {
            name: /reset password/i,
         });

         await user.type(emailInput, 'test.com');
         await user.click(resetButton);

         expect(await screen.findByText(/invalid email/i));
      });
   });
   describe('with valid input but with server error', () => {
      it('should render error message', async () => {
         const user = userEvent.setup();
         render(<ForgotPasswordPage />);

         const emailInput = screen.getByLabelText(/email/i);
         const resetButton = screen.getByRole('button', {
            name: /reset password/i,
         });
         await user.type(emailInput, 'test2@gmail.com');
         await user.click(resetButton);

         const elements = await screen.findAllByText(/email dont exist/i);

         expect(elements.length === 1 || elements.length === 2).toBe(true);
      });
   });
});
