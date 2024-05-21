import { CiCircleList } from 'react-icons/ci';
import { RecommendedSubject } from '../types/RecommendedSubject.Model';

type Props = {
   subject: RecommendedSubject;
};

const SubjectItem = ({ subject }: Props) => {
   const calculatePercent = (completed: number, total: number) => {
      if (completed === 0 || total === 0) {
         return 0;
      }
      return completed / total;
   };

   const calculatedPercent = calculatePercent(
      subject.completedTasks,
      subject.totalTask,
   );

   return (
      <div className="rounded-lg bg-dark-700 p-5">
         <h4 className="text-xl font-bold dark:text-white/85">
            {subject.name}
         </h4>
         <div className="mt-5 flex justify-between">
            <div className="flex items-center gap-2">
               <CiCircleList size={30} className="dark:text-white/60" />
               <p className="dark:text-white/60">Progress</p>
            </div>
            <div className="text-xl dark:text-white/85">
               <span className="text-gray-400">{subject.completedTasks}</span>
               <span> / </span>
               <span>{subject.totalTask} </span>
            </div>
         </div>
         <div className="mt-4 h-2 w-full rounded-full bg-gray-200 dark:bg-dark-900">
            {calculatedPercent < 0.5 ? (
               <div
                  className="h-2 rounded-full bg-red-400"
                  style={{ width: `${calculatedPercent * 100}%` }}
               ></div>
            ) : calculatedPercent < 0.8 ? (
               <div
                  className="h-2 rounded-full bg-orange-400"
                  style={{ width: `${calculatedPercent * 100}%` }}
               ></div>
            ) : (
               <div
                  className="h-2 rounded-full bg-green-house-400"
                  style={{ width: `${calculatedPercent * 100}%` }}
               ></div>
            )}
         </div>
      </div>
   );
};
export default SubjectItem;
