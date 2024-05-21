import { useGetAllTaskQuery } from '../../app/api/taskApiSlice';
import Header from '../../components/Header';
import Task from './Task';

const TasksPage = () => {
   const { data: tasks } = useGetAllTaskQuery();
   if (!tasks) {
      return <p>No Task found</p>;
   }

   console.log(tasks);
   return (
      <section>
         <Header text="tasks" />
         <section className="grid gap-5  sm:grid-cols-4">
            {tasks.map((task) => {
               return <Task task={task} key={task._id} />;
            })}
         </section>
      </section>
   );
};
export default TasksPage;
