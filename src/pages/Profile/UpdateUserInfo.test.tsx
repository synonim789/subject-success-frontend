import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test/test-utils';
import UpdateUserInfo from './UpdateUserInfo';

describe('Update Username Form Test', () => {
   it('should render user email and show success toast after submitting', async () => {
      const user = userEvent.setup();
      render(<UpdateUserInfo />);

      const usernameInput = await screen.findByLabelText(/username/i);
      const updateUserButton = await screen.findByRole('button', {
         name: /update user/i,
      });

      expect(usernameInput).toBeInTheDocument();

      await user.type(usernameInput, 'test!1234');
      expect(await screen.findByLabelText(/email/i)).toHaveValue(
         'test@test.com',
      );

      expect(updateUserButton).toBeInTheDocument();
      await user.click(updateUserButton);
      expect(await screen.findByText(/update success/i)).toBeInTheDocument();
   });
});
