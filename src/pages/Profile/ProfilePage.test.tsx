import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';
import { server } from '../../test/server/server';
import { cleanup, render, screen } from '../../test/test-utils';
import ProfilePage from './ProfilePage';

describe('Profile Page Test', () => {
   beforeAll(() => {
      HTMLDialogElement.prototype.show = vi.fn();
      HTMLDialogElement.prototype.showModal = vi.fn();
      HTMLDialogElement.prototype.close = vi.fn();
   });
   afterEach(() => cleanup());
   it('should render image if it is provided and modal  should work', async () => {
      const user = userEvent.setup();
      render(<ProfilePage />);

      expect(await screen.findByText(/test!1234/i)).toBeInTheDocument();
      expect(await screen.findByText(/test@test.com/i)).toBeInTheDocument();
      expect(await screen.findByAltText(/picture/i)).toBeInTheDocument();

      const editButton =  screen.getByRole('button', {
         name: /edit image/i,
      });
      expect(editButton).toBeInTheDocument();

      await user.click(editButton);
      await user.click(await screen.findByLabelText(/close modal/i));
   });

   it('should render placeholder image if user have no image', async () => {
      server.use(
         http.get('http://localhost:3000/user', () => {
            return HttpResponse.json({
               __v: 0,
               _id: 'firgr',
               createdAt: 'yesterday',
               email: 'test@test.com',
               updatedAt: 'today',
               picture: null,
               username: 'test!1234',
            });
         }),
      );
      render(<ProfilePage />);
      expect(
         await screen.findByAltText(/profile placeholder image/i),
      ).toBeInTheDocument();
   });

   it('should return error if there is one', async () => {
      server.use(
         http.get('http://localhost:3000/user', () => {
            return HttpResponse.json(
               {
                  message: 'something went wrong',
               },
               { status: 400 },
            );
         }),
      );

      render(<ProfilePage />);

      const errorMessage = await screen.findByText(/error/i);
      expect(errorMessage).toBeInTheDocument();
   });
});
