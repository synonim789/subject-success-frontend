import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useGetSubjectsQuery } from '../../app/api/subjectApiSlice';
import AddSubject from './AddSubject';
import Subject from './Subject';

const Subjects = () => {
   const { data, isLoading } = useGetSubjectsQuery();

   if (isLoading) {
      return (
         <AiOutlineLoading3Quarters
            className="animate-spin dark:text-white"
            size={40}
         />
      );
   }

   return (
      <div className="mx-auto w-full">
         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data?.map((subject) => (
               <Subject
                  key={subject._id}
                  name={subject.name}
                  completed={subject.completed}
                  grade={subject.grade}
                  tasks={subject.tasks}
                  id={subject._id}
                  type={subject.type}
               />
            ))}
            <AddSubject />
         </div>
      </div>
   );
};
export default Subjects;
