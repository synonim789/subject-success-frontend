import { useState } from 'react';
import { Checkbox } from 'react-aria-components';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { FaCheck } from 'react-icons/fa';
import { Task } from '../../types/TaskModel';

type Props = {
   task: Task;
};

const SubjectTask = ({ task }: Props) => {
   const [isSelected, setIsSelected] = useState(false);
   return (
      <div className="flex w-full items-center justify-between rounded-lg bg-gray-300 p-3 text-center text-lg transition hover:bg-gray-700 dark:bg-dark-100 dark:hover:bg-dark-900">
         <div className="flex gap-3">
            <Checkbox
               className="group cursor-pointer"
               isSelected={isSelected}
               onChange={setIsSelected}
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
            <button className="text-red-400 transition hover:text-red-500">
               <CiTrash size={23} />
            </button>
            <button className="text-blue-400 transition hover:text-blue-500">
               <CiEdit size={23} />
            </button>
         </div>
      </div>
   );
};
export default SubjectTask;
