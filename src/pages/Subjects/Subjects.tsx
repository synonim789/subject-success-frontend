import { useGetSubjectsQuery } from '../../app/api/subjectApiSlice';
import AddSubject from './AddSubject';
import Subject from './Subject';

const Subjects = () => {
   const { data, isLoading } = useGetSubjectsQuery();

   if (isLoading) {
      return <p>Loading...</p>;
   }

   return (
      <div className="flex flex-wrap gap-5">
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
   );
};
export default Subjects;
