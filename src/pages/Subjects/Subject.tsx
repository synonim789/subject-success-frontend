import { Task } from '../../types/TaskModel';
import SubjectTask from './SubjectTask';

type Props = {
   name: string;
   completed?: boolean;
   grade?: number;
   tasks: Task[];
};

const Subject = ({ name, completed, grade, tasks }: Props) => {
   console.log(completed, grade);
   return (
      <div className="h-[500px] w-[300px]  rounded-xl bg-white text-gray-500 shadow-xl transition dark:bg-dark-400 dark:hover:bg-dark-600">
         <div className="w-full border-b border-dark-700 p-2 text-left">
            <div className="mt-2 text-wrap text-2xl">
               <p>{name}</p>
            </div>
         </div>
         <div className="flex w-full flex-col gap-5 p-3">
            {tasks.map((task) => (
               <SubjectTask key={task._id} task={task} />
            ))}
            <button className="w-full rounded-lg border border-dashed border-gray-600 p-3 text-left text-lg transition hover:bg-dark-700">
               Add Task +
            </button>
         </div>
      </div>
   );
};
export default Subject;