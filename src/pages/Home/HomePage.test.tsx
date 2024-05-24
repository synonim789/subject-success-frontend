import { render, screen } from '../../test/test-utils';
import HomePage from './HomePage';

describe('Home Page Test', () => {
   it('should render home page', () => {
      render(<HomePage />);
      const homeHeader = screen.getByRole('heading', {
         level: 2,
         name: /home/i,
      });
      expect(homeHeader).toBeInTheDocument();
   });
});
