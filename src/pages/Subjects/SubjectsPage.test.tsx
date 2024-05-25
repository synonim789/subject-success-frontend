import userEvent from '@testing-library/user-event';
import { render, screen, within } from '../../test/test-utils';
import SubjectsPage from './SubjectsPage';

describe('Subjects Page Test', () => {
   it('should be rendered', async () => {
      render(<SubjectsPage />);
      const subjects = await screen.findAllByLabelText('subject');
      expect(subjects).toHaveLength(3);
   });
   it('should add subject when addsubject form is submitted', async () => {
      const user = userEvent.setup();
      render(<SubjectsPage />);
      const addSubjectBtn = await screen.findByRole('button', {
         name: /add subject/i,
      });
      expect(addSubjectBtn).toBeInTheDocument();

      await user.click(addSubjectBtn);

      const nameInput = screen.getByLabelText(/name/i);
      expect(nameInput).toBeInTheDocument();

      await user.type(nameInput, 'test1234');

      const select = screen.getByLabelText(/choose type/i);
      expect(select).toBeInTheDocument();

      await user.click(select);
      expect(select).toHaveAttribute('data-pressed', 'true');

      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeInTheDocument();

      const options = within(listbox).getAllByRole('option');

      expect(options).toHaveLength(2);

      await user.click(options[1]);
      expect(select).toHaveTextContent('Completion');

      const submitButton = await screen.findByRole('button', {
         name: /add subject/i,
      });

      expect(submitButton).toBeInTheDocument();

      user.click(submitButton);

      expect(
         await screen.findByText('Subject added successfully'),
      ).toBeInTheDocument();
   });
   it('should return toast with error if there is one', async () => {
      const user = userEvent.setup();
      render(<SubjectsPage />);
      const addSubjectBtn = await screen.findByRole('button', {
         name: /add subject/i,
      });

      await user.click(addSubjectBtn);

      const nameInput = screen.getByLabelText(/name/i);

      await user.type(nameInput, 'test123');

      const select = screen.getByLabelText(/choose type/i);

      await user.click(select);

      const listbox = screen.getByRole('listbox');

      const options = within(listbox).getAllByRole('option');

      await user.click(options[1]);

      const submitButton = await screen.findByRole('button', {
         name: /add subject/i,
      });

      user.click(submitButton);
      expect(await screen.findByText('there was an error')).toBeInTheDocument();
   });
   it('subject should be edited with grade type', async () => {
      const user = userEvent.setup();
      render(<SubjectsPage />);
      const subjects = await screen.findAllByLabelText('subject');
      expect(subjects).toHaveLength(3);
      const subject = subjects[0];

      const optionsBtn = await within(subject).findByLabelText(/open options/i);
      await user.click(optionsBtn);

      const editBtn = await screen.findByLabelText(/edit modal/i);
      expect(editBtn).toBeInTheDocument();
      await userEvent.click(editBtn);

      const nameInput = await screen.findByLabelText(/name/i);
      expect(nameInput).toBeInTheDocument();

      await user.type(nameInput, 'test1234');

      const select = screen.getByLabelText(/choose type/i);
      expect(select).toBeInTheDocument();

      await user.click(select);
      expect(select).toHaveAttribute('data-pressed', 'true');

      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeInTheDocument();

      const options = within(listbox).getAllByRole('option');

      expect(options).toHaveLength(2);

      await user.click(options[0]);
      expect(select).toHaveTextContent('Grade');

      const labelInuput = await screen.findByLabelText(/grade number/i);
      await user.type(labelInuput, '1.0');

      const submitBtn = await screen.findByRole('button', {
         name: /edit subject/i,
      });
      await user.click(submitBtn);
   });
   it('should return toast with error if there is one while editing subject', async () => {
      const user = userEvent.setup();
      render(<SubjectsPage />);
      const subjects = await screen.findAllByLabelText('subject');
      expect(subjects).toHaveLength(3);
      const subject = subjects[0];

      const optionsBtn = await within(subject).findByLabelText(/open options/i);
      await user.click(optionsBtn);

      const editBtn = await screen.findByLabelText(/edit modal/i);
      expect(editBtn).toBeInTheDocument();
      await userEvent.click(editBtn);

      const nameInput = await screen.findByLabelText(/name/i);
      expect(nameInput).toBeInTheDocument();

      await user.type(nameInput, 'test123');

      const select = screen.getByLabelText(/choose type/i);
      expect(select).toBeInTheDocument();

      await user.click(select);
      expect(select).toHaveAttribute('data-pressed', 'true');

      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeInTheDocument();

      const options = within(listbox).getAllByRole('option');

      expect(options).toHaveLength(2);

      await user.click(options[0]);
      expect(select).toHaveTextContent('Grade');

      const labelInuput = await screen.findByLabelText(/grade number/i);
      await user.type(labelInuput, '1.0');

      const submitBtn = await screen.findByRole('button', {
         name: /edit subject/i,
      });
      await user.click(submitBtn);

      expect(await screen.findByText('there was an error')).toBeInTheDocument();
   });
   it('subject should be edited with completion type', async () => {
      const user = userEvent.setup();
      render(<SubjectsPage />);
      const subjects = await screen.findAllByLabelText('subject');
      expect(subjects).toHaveLength(3);
      const subject = subjects[0];

      const optionsBtn = await within(subject).findByLabelText(/open options/i);
      await user.click(optionsBtn);

      const editBtn = await screen.findByLabelText(/edit modal/i);
      expect(editBtn).toBeInTheDocument();
      await userEvent.click(editBtn);

      const nameInput = await screen.findByLabelText(/name/i);
      expect(nameInput).toBeInTheDocument();

      await user.type(nameInput, 'test1234');

      const select = screen.getByLabelText(/choose type/i);
      expect(select).toBeInTheDocument();

      await user.click(select);
      expect(select).toHaveAttribute('data-pressed', 'true');

      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeInTheDocument();

      const options = within(listbox).getAllByRole('option');

      expect(options).toHaveLength(2);

      await user.click(options[1]);
      expect(select).toHaveTextContent('Completion');

      const checkbox = await screen.findByRole('checkbox');
      await user.click(checkbox);

      const submitBtn = await screen.findByRole('button', {
         name: /edit subject/i,
      });
      await user.click(submitBtn);
   });
   it('subject should be deleted', async () => {
      const user = userEvent.setup();
      render(<SubjectsPage />);
      const subjects = await screen.findAllByLabelText('subject');
      expect(subjects).toHaveLength(3);
      const subject = subjects[0];

      const optionsBtn = await within(subject).findByLabelText(/open options/i);
      await user.click(optionsBtn);

      const deleteBtn = await screen.findByRole('button', { name: /delete/i });
      expect(deleteBtn).toBeInTheDocument();
      await userEvent.click(deleteBtn);

      expect(
         await screen.findByText('Subject deleted successsfully'),
      ).toBeInTheDocument();
   });
   it('task should be added', async () => {
      const user = userEvent.setup();
      render(<SubjectsPage />);
      const subjects = await screen.findAllByLabelText('subject');
      expect(subjects).toHaveLength(3);
      const subject = subjects[0];

      const addTaskBtn = await within(subject).findByLabelText(/add task/i);
      expect(addTaskBtn).toBeInTheDocument();

      user.click(addTaskBtn);

      const nameInput = await screen.findByLabelText(/name/i);

      expect(nameInput).toBeInTheDocument();
      await user.type(nameInput, 'task 1');

      const dateInput = await screen.findByLabelText(/date/i);
      expect(dateInput).toBeInTheDocument();

      await user.type(dateInput, '2024-05-26');

      const submitBtn = await screen.findByRole('button', {
         name: /add task/i,
      });
      expect(submitBtn).toBeInTheDocument();

      await user.click(submitBtn);

      expect(
         await screen.findByText('Task added successfully'),
      ).toBeInTheDocument();
   });
   it('should return error if there is one on server while adding task', async () => {
      const user = userEvent.setup();
      render(<SubjectsPage />);
      const subjects = await screen.findAllByLabelText('subject');
      const subject = subjects[0];

      const addTaskBtn = await within(subject).findByLabelText(/add task/i);

      user.click(addTaskBtn);

      const nameInput = await screen.findByLabelText(/name/i);
      await user.type(nameInput, 'task 2');

      const dateInput = await screen.findByLabelText(/date/i);

      await user.type(dateInput, '2024-05-26');

      const submitBtn = await screen.findByRole('button', {
         name: /add task/i,
      });
      expect(submitBtn).toBeInTheDocument();

      await user.click(submitBtn);

      expect(
         await screen.findByText(/task cant be added/i),
      ).toBeInTheDocument();
   });
   it('should be able to delete task', async () => {
      const user = userEvent.setup();
      render(<SubjectsPage />);
      const subjects = await screen.findAllByLabelText('subject');
      expect(subjects).toHaveLength(3);
      const subject = subjects[0];

      const deleteBtn = await within(subject).findByLabelText(/delete task/i)
      expect(deleteBtn).toBeInTheDocument()
      await user.click(deleteBtn)
   });
   
});
