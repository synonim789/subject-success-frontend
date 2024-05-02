import { useGetSubjectsQuery } from '../../app/api/subjectApiSlice';
import AddSubject from './AddSubject';
import Subject from './Subject';

const Subjects = () => {
   const { data, isLoading } = useGetSubjectsQuery();
   if (isLoading) {
      return <p>Loading...</p>;
   }
   console.log(data);
   return (
      <div className="flex flex-wrap justify-center gap-5">
         {data?.map((subject) => (
            <Subject
               key={subject._id}
               name={subject.name}
               completed={subject.completed}
               grade={subject.grade}
               tasks={subject.tasks}
               id={subject._id}
            />
         ))}
         <AddSubject />
      </div>
   );
};
export default Subjects;
