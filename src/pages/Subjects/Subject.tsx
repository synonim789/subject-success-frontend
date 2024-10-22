import {
   Button,
   Dialog,
   DialogTrigger,
   OverlayArrow,
   Popover,
} from 'react-aria-components';
import toast from 'react-hot-toast';
import { BsThreeDots } from 'react-icons/bs';
import { useDeleteSubjectMutation } from '../../app/api/subjectApiSlice';
import ModalComponent from '../../components/Modal';
import { Task } from '../../types/TaskModel';
import { cn } from '../../utils/cn';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';
import AddTaskModalContent from './AddTaskModalContent';
import EditSubjectModalContent from './EditSubjectModalContent';
import SubjectTask from './SubjectTask';

type Props = {
   name: string;
   completed?: boolean;
   grade?: number;
   tasks: Task[];
   id: string;
   type: 'grade' | 'completion';
};

const Subject = ({ name, completed, grade, tasks, id, type }: Props) => {
   const [deleteSubject] = useDeleteSubjectMutation();
   const handleDelete = async () => {
      try {
         await deleteSubject({ subjectId: id }).unwrap();
         toast.success('Subject deleted successsfully');
      } catch (err) {
         if (isFetchBaseQueryError(err)) {
            const errMsg = (err as { data: { message: string } }).data.message;
            toast.error(errMsg);
         }
      }
   };

   return (
      <div
         className="relative min-h-[500px] w-full overflow-auto rounded-xl bg-white text-gray-500 shadow-xl transition dark:bg-dark-400 dark:hover:bg-dark-600"
         aria-label="subject"
      >
         <div className="w-full border-b border-dark-700 p-2 text-left">
            <div className="mt-2 flex justify-between text-wrap text-2xl">
               <p className="max-w-[250px] text-lg">{name}</p>
               <DialogTrigger>
                  <Button aria-label="open options">
                     <BsThreeDots />
                  </Button>
                  <Popover
                     className="group rounded-lg bg-gray-100  text-xl  shadow-2xl transition dark:bg-dark-700"
                     style={{ zIndex: '10' }}
                  >
                     <OverlayArrow>
                        <svg
                           width={12}
                           height={12}
                           viewBox="0 0 12 12"
                           className="block rotate-180 fill-gray-100 dark:fill-dark-700"
                        >
                           <path d="M0 0 L6 6 L12 0" />
                        </svg>
                     </OverlayArrow>
                     <Dialog className="flex w-full flex-col p-2 text-left">
                        <ModalComponent
                           button={
                              <Button
                                 className="w-full rounded-lg p-2 font-bold text-blue-400 hover:bg-gray-200 dark:hover:bg-dark-300"
                                 aria-label="edit modal"
                              >
                                 Edit
                              </Button>
                           }
                        >
                           <EditSubjectModalContent
                              subjectName={name}
                              subjectType={type}
                              subjectCompleted={completed}
                              subjectGrade={grade}
                              subjectId={id}
                           />
                        </ModalComponent>

                        <button
                           className="w-full rounded-lg p-2 font-bold text-red-400 hover:bg-gray-200 dark:hover:bg-dark-300"
                           onClick={handleDelete}
                        >
                           Delete
                        </button>
                     </Dialog>
                  </Popover>
               </DialogTrigger>
            </div>
         </div>
         <div className="flex w-full flex-col gap-5 p-3">
            {tasks.map((task) => (
               <SubjectTask key={task._id} task={task} />
            ))}
            <ModalComponent
               button={
                  <Button
                     className="mb-7 w-full rounded-lg border border-dashed border-gray-600 p-3 text-left text-lg transition hover:bg-gray-200 dark:hover:bg-dark-700"
                     aria-label="add task"
                  >
                     Add Task+
                  </Button>
               }
            >
               <AddTaskModalContent subjectId={id} />
            </ModalComponent>
         </div>
         <div className="absolute bottom-3 left-3">
            {type === 'completion' ? (
               completed ? (
                  <p className="font-bold text-green-house-500">Completed</p>
               ) : (
                  <p className="font-bold text-red-400">Not Completed</p>
               )
            ) : (
               ''
            )}
            {type === 'grade' && (
               <p
                  className={cn('font-bold text-red-400', {
                     'text-green-house-500': grade && grade > 1,
                  })}
               >
                  Grade: {grade}
               </p>
            )}
         </div>
      </div>
   );
};
export default Subject;
