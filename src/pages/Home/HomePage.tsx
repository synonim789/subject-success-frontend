import Header from '../../components/Header';
import SubjectList from '../../components/SubjectList';
import TaskCalendar from '../../components/TaskCalendar';
import TaskList from '../../components/TaskList';

const HomePage = () => {
   return (
      <section>
         <Header text="Home" />
         <div className="flex flex-col gap-10 lg:flex-row">
            <SubjectList />
            <TaskList />
            <TaskCalendar />
         </div>
      </section>
   );
};
export default HomePage;
