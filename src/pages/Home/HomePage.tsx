import Header from '../../components/Header';
import TaskCalendar from '../../components/TaskCalendar';
import TaskList from '../../components/TaskList';

const HomePage = () => {
   return (
      <section>
         <Header text="Home" />
         <div className="flex flex-col justify-between gap-5 md:flex-row">
            <TaskList />
            <TaskCalendar />
         </div>
      </section>
   );
};
export default HomePage;
