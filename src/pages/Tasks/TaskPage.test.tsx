import { render } from '../../test/test-utils';
import TasksPage from './TasksPage';

describe('Task Page Test', () => {
   it('should be rendered', () => {
      render(<TasksPage />);
   });
});
