import Header from '../../components/Header';
import AddSubject from './AddSubject';
import Subjects from './Subjects';

const SubjectsPage = () => {
   return (
      <section>
         <Header text="subjects" />
         <div className="flex w-full flex-col flex-wrap gap-10 md:flex-row">
            <Subjects />
            <AddSubject />
         </div>
      </section>
   );
};
export default SubjectsPage;
