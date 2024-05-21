import { Link } from 'react-router-dom';
import { useGetRecommendedSubjectQuery } from '../app/api/subjectApiSlice';
import SubjectItem from './SubjectItem';

const SubjectList = () => {
   const { data: subjects } = useGetRecommendedSubjectQuery();

   return (
      <section className="w-full rounded-lg bg-white p-8 shadow-2xl dark:bg-dark-400">
         <h2 className="mb-4 text-3xl dark:text-white/85">Subjects</h2>
         <div className="flex flex-col gap-7">
            {subjects?.map((subject) => (
               <SubjectItem subject={subject} key={subject._id} />
            ))}
            {subjects && subjects.length > 1 ? (
               <Link
                  className="flex w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-500 p-4 text-xl font-bold text-gray-500 transition hover:border-black hover:text-black dark:hover:border-gray-300 dark:hover:text-white"
                  to="/Subjects"
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
export default SubjectList;
