import { Checkbox } from 'react-aria-components';
import toast from 'react-hot-toast';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { FaCheck } from 'react-icons/fa';
import {
   useDeleteTaskMutation,
   useSetCompletedMutation,
} from '../../app/api/taskApiSlice';
import EditTaskModalContent from '../../components/EditTaskModalContent';
import ModalComponent from '../../components/Modal';
import { Task as TaskType } from '../../types/TaskModel';
import { cn } from '../../utils/cn';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';

type Props = {
   task: TaskType;
};

const Task = ({ task }: Props) => {
   const [setCompleted] = useSetCompletedMutation();
   const [deleteTask] = useDeleteTaskMutation();

   const deleteTaskHandler = async () => {
      try {
         await deleteTask({ taskId: task._id });
      } catch (err) {
         if (isFetchBaseQueryError(err)) {
            const errMsg = (err as { data: { message: string } }).data.message;
            toast.error(errMsg);
         }
      }
   };

   const handleCompleteTask = async (isSelected: boolean) => {
      try {
         await setCompleted({ completed: isSelected, taskId: task._id });
      } catch (err) {
         if (isFetchBaseQueryError(err)) {
            const errMsg = (err as { data: { message: string } }).data.message;
            toast.error(errMsg);
         }
      }
   };

   console.log(task);

   return (
      <div className="flex items-center justify-between rounded-lg bg-white p-3 text-center text-lg shadow-xl transition hover:bg-dark-200 hover:text-white/85 dark:bg-dark-100  dark:text-white/85 dark:hover:bg-gray-400">
         <div className="flex ">
            <Checkbox
               className="group cursor-pointer"
               isSelected={task.completed}
               onChange={handleCompleteTask}
            >
               {({ isSelected }) => (
                  <>
                     <div className="flex  items-center gap-2">
                        <div
                           className={cn(
                              'mr-2 flex h-5 w-5 items-center justify-center rounded  border-2 hover:bg-green-house-300',
                              {
                                 'border-none bg-green-house-500 text-white/85 hover:bg-green-house-900':
                                    isSelected,
                              },
                           )}
                        >
                           {isSelected && <FaCheck size={15} />}
                        </div>
                        <div className="text-left">
                           <p className="mb-2 max-w-[200px] text-sm text-gray-300">
                              {task.subject.name}
                           </p>
                           <p className="max-w-[150px] overflow-hidden break-words text-xl">
                              {task.title}
                           </p>
                        </div>
                     </div>
                  </>
               )}
            </Checkbox>
         </div>

         <div className="flex gap-2">
            <button
               className="text-red-400 transition hover:text-red-500"
               onClick={deleteTaskHandler}
            >
               <CiTrash size={23} />
            </button>
            <ModalComponent
               buttonClassName="text-blue-400 transition hover:text-blue-500"
               buttonChildren={<CiEdit size={23} />}
               children={
                  <EditTaskModalContent
                     taskId={task._id}
                     taskName={task.title}
                     taskDate={task.date}
                  />
               }
               label="edit task"
            />
         </div>
      </div>
   );
};
export default Task;
