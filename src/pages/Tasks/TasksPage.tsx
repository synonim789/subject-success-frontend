import { Button } from 'react-aria-components';
import { useGetAllTaskQuery } from '../../app/api/taskApiSlice';
import Header from '../../components/Header';
import ModalComponent from '../../components/Modal';
import DeleteAllTaskModalContent from './DeleteAllTaskModalContent';
import Task from './Task';

const TasksPage = () => {
   const { data: tasks } = useGetAllTaskQuery();
   if (!tasks) {
      return <p>No Task found</p>;
   }

   return (
      <section>
         <Header text="tasks" />
         <div className="mb-10 flex justify-end">
            <ModalComponent
               button={
                  <Button
                     className="rounded-lg bg-red-500 px-4 py-2 text-lg font-bold capitalize text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-300"
                     aria-label="Delete all tasks"
                     isDisabled={tasks.length === 0}
                  >
                     Delete all Tasks
                  </Button>
               }
            >
               <DeleteAllTaskModalContent />
            </ModalComponent>
         </div>

         <section className="grid gap-5  sm:grid-cols-4">
            {tasks.map((task) => {
               return <Task task={task} key={task._id} />;
            })}
         </section>
      </section>
   );
};
export default TasksPage;
