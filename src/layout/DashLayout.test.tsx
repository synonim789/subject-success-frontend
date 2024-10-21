import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../test/test-utils';
import DashLayout from './DashLayout';

describe('Dash Layout Test', () => {
   it('should logout when click logout in sidebar', async () => {
      const user = userEvent.setup();
      render(<DashLayout />);

      const openSidebarButton = await screen.findByRole('button', {
         name: /Toggle Sidebar/i,
      });

      expect(openSidebarButton).toBeInTheDocument();

      await user.click(openSidebarButton);

      const logoutButton = await screen.findByRole('button', {
         name: /logout/i,
      });
      expect(logoutButton).toBeInTheDocument();

      await user.click(logoutButton);

      await waitFor(() => expect(window.location.href).toContain('/login'));
   });

   it('should be able to close and open sidebar', async () => {
      const user = userEvent.setup();
      render(<DashLayout />);

      const openSidebarButton = await screen.findByLabelText(/toggle sidebar/i);
      expect(openSidebarButton).toBeInTheDocument();

      await user.click(openSidebarButton);

      const title = await screen.findByRole('link', {
         name: /subject success/i,
      });
      expect(title).toBeInTheDocument();

      const toggleSidebarButton =
         await screen.findByLabelText(/toggle sidebar/i);
      expect(toggleSidebarButton).toBeInTheDocument();

      await user.click(toggleSidebarButton);
      expect(title).not.toBeInTheDocument();

      await user.click(toggleSidebarButton);
      expect(
         await screen.findByRole('link', {
            name: /subject success/i,
         }),
      ).toBeInTheDocument();
   });

   it('should open dropdown and logout', async () => {
      const user = userEvent.setup();
      render(<DashLayout />);
      const dropdownButton = await screen.findByLabelText(/open dropdown/i);
      expect(dropdownButton).toBeInTheDocument();
      await user.click(dropdownButton);

      const dropdownLogoutButton =
         await screen.findByLabelText(/dropdown logout/i);
      expect(dropdownLogoutButton).toBeInTheDocument();
      await user.click(dropdownLogoutButton);

      await waitFor(() => expect(window.location.href).toContain('/login'));
   });
});
