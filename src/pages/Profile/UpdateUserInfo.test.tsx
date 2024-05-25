import userEvent from '@testing-library/user-event';
import { cleanup, render, screen, waitFor } from '../../test/test-utils';
import UpdateUserInfo from './UpdateUserInfo';

describe('Update Username Form Test', () => {
   afterEach(() => cleanup());
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

   it('should render error if there is an server error', async () => {
      const user = userEvent.setup();
      render(<UpdateUserInfo />);

      const usernameInput = await screen.findByLabelText(/username/i);
      const updateUsernameButton = await screen.findByRole('button', {
         name: /update user/i,
      });

      await user.type(usernameInput, 'test!12345');
      await user.click(updateUsernameButton);

      await waitFor(() =>
         expect(screen.getAllByText(/cannot update username/i)).toHaveLength(2),
      );
   });
});
