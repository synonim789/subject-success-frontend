import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../test/test-utils';
import NotFound from './NotFound';

describe('Not Found Test', () => {
   it('should render image and working Link item', async () => {
      const user = userEvent.setup();
      render(<NotFound />);

      const image = screen.getByAltText(/cat hanging from 0 in 404 number/i);
      expect(image).toBeInTheDocument();

      const linkButton = screen.getByRole('link', { name: /go home/i });
      expect(linkButton).toBeInTheDocument();

      await user.click(linkButton);

      await waitFor(() => expect(window.location.href).toContain('/'));
   });
});
