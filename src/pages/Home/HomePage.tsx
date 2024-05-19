import Header from '../../components/Header';
import TaskCalendar from '../../components/TaskCalendar';

const HomePage = () => {
   return (
      <section>
         <Header text="Home" />
         <div>
            <TaskCalendar />
         </div>
      </section>
   );
};
export default HomePage;
