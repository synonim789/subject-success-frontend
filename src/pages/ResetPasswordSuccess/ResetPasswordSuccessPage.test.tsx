import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../test/test-utils';
import ResetPasswordSuccessPage from './ResetPasswordSuccessPage';

describe('Reset Password Success', () => {
   it('should be displayed and button should redirect to login page', async () => {
      const user = userEvent.setup();
      render(<ResetPasswordSuccessPage />);
      const linkButton = screen.getByRole('button', { name: /continue/i });
      expect(linkButton).toBeInTheDocument();
      await user.click(linkButton);
      (await waitFor(() => expect(window.location.href))).toContain('/login');
   });
});
