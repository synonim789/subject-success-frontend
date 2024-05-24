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
import { Task } from '../../types/TaskModel';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';

type Props = {
   task: Task;
};

const SubjectTask = ({ task }: Props) => {
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

   return (
      <div className="flex items-center justify-between rounded-lg bg-gray-100 p-3 text-center text-lg transition hover:bg-gray-300 dark:bg-dark-100 dark:hover:bg-dark-900">
         <div className="flex gap-3">
            <Checkbox
               className="group cursor-pointer"
               isSelected={task.completed}
               onChange={handleCompleteTask}
            >
               {({ isSelected }) => (
                  <>
                     <div className="flex  items-center gap-2">
                        <div
                           className={`active: flex h-5 w-5 flex-shrink items-center justify-center rounded  border-2 hover:bg-green-house-300 ${isSelected && 'border-none bg-green-house-500 text-white hover:bg-green-house-900'}`}
                        >
                           {isSelected && <FaCheck size={15} />}
                        </div>
                        <p className="max-w-[150px] overflow-hidden break-words">
                           {task.title}
                        </p>
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
            />
         </div>
      </div>
   );
};
export default SubjectTask;
