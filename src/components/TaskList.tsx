import { Link } from 'react-router-dom';
import {
   useGetRecommendedTasksQuery,
   useGetTaskCountQuery,
} from '../app/api/taskApiSlice';

const TaskList = () => {
   const { data: tasks } = useGetRecommendedTasksQuery();
   const { data: taskCount } = useGetTaskCountQuery();
   return (
      <section className="w-fit rounded-lg bg-white p-8 shadow-2xl dark:bg-dark-400">
         <div className="flex justify-between">
            <h2 className="mb-4 text-3xl dark:text-white/85">Tasks</h2>
            <div className="text-xl dark:text-white/85">
               <span className="text-gray-400">
                  {taskCount?.completedTasks}
               </span>
               <span> / </span>
               <span>{taskCount?.taskAmount}</span>
            </div>
         </div>

         <div className="flex flex-col items-start gap-5">
            {tasks && tasks.length > 1 ? (
               tasks?.map((task) => (
                  <div>
                     <p className="text-sm text-gray-400">
                        {task.subject.name}
                     </p>
                     <p className="text-lg dark:text-white/85">{task.title}</p>
                  </div>
               ))
            ) : (
               <p className="my-5 text-4xl dark:text-white">No Tasks Found</p>
            )}

            {tasks && tasks.length > 1 ? (
               <Link
                  className="flex w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-500 p-4 text-xl font-bold text-gray-500 transition hover:border-black hover:text-black dark:hover:border-gray-300 dark:hover:text-white"
                  to="/tasks"
               >
                  See More
               </Link>
            ) : (
               <Link
                  to="/subjects"
                  className="flex w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-500 p-4 text-xl font-bold text-gray-500 transition hover:border-black hover:text-black dark:hover:border-gray-300 dark:hover:text-white"
               >
                  Add Subject And Task
               </Link>
            )}
         </div>
      </section>
   );
};
export default TaskList;
