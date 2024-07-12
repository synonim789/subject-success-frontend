import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import { useEffect, useState } from 'react';
import {
   Button,
   Calendar,
   CalendarCell,
   CalendarGrid,
   CalendarGridBody,
   CalendarGridHeader,
   CalendarHeaderCell,
   Heading,
} from 'react-aria-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useGetTaskDatesQuery } from '../app/api/taskApiSlice';
import { Task } from '../types/TaskModel';

const TaskCalendar = () => {
   const { data, isSuccess, isLoading } = useGetTaskDatesQuery();
   const [dates, setDates] = useState<CalendarDate[] | null>();
   const [selectedDate, setSelectedDate] = useState(today(getLocalTimeZone()));
   const [tasks, setTasks] = useState<Task[]>([]);

   useEffect(() => {
      if (isSuccess) {
         const datesArr = data.map((item) => {
            const [year, month, day] = item.date
               .split('T')[0]
               .split('-')
               .map(Number);

            const calendarDate = new CalendarDate(year, month, day);
            return calendarDate;
         });
         setDates(datesArr);
      }
   }, [data, isSuccess]);

   useEffect(() => {
      const areTasksInDate = () => {
         if (data) {
            const date = selectedDate.toDate('UTC').toISOString();
            const taskFoundForDay = data.filter((task) => task.date === date);
            setTasks(taskFoundForDay);
         }
      };
      areTasksInDate();
   }, [data, selectedDate]);

   const isDateInArray = (date: CalendarDate) => {
      if (dates) {
         return dates.some(
            (d) =>
               d.year === date.year &&
               d.month === date.month &&
               d.day === date.day,
         );
      }
   };

   if (isLoading) {
      return <p>Loading...</p>;
   }

   return (
      <section className="flex w-full flex-col items-center rounded-lg bg-white p-5 shadow-2xl dark:bg-dark-400">
         <Calendar
            aria-label="Appointment date"
            className="w-fit dark:text-white"
            defaultValue={today(getLocalTimeZone())}
            onFocusChange={setSelectedDate}
         >
            <header className="flex w-full items-center gap-1 px-1 pb-4">
               <Button
                  slot="previous"
                  className="rounded-full bg-green-house-500"
               >
                  <MdKeyboardArrowLeft size={30} className="text-white" />
               </Button>
               <Heading className="mx-2 flex-1 text-center" />
               <Button slot="next" className="rounded-full bg-green-house-500">
                  <MdKeyboardArrowRight size={30} className="text-white" />
               </Button>
            </header>
            <CalendarGrid className="w-full">
               <CalendarGridHeader>
                  {(day) => (
                     <CalendarHeaderCell className="">{day}</CalendarHeaderCell>
                  )}
               </CalendarGridHeader>
               <CalendarGridBody>
                  {(date) => (
                     <CalendarCell
                        className={({ isSelected, date, isOutsideMonth }) => {
                           return `${isSelected ? 'bg-green-house-500 hover:bg-green-house-300' : isDateInArray(date) && 'bg-yellow-400 text-black hover:bg-yellow-200 '} flex size-9 items-center justify-center rounded-full md:m-1 md:size-10 ${isOutsideMonth ? 'hidden' : ''}`;
                        }}
                        date={date}
                     ></CalendarCell>
                  )}
               </CalendarGridBody>
            </CalendarGrid>
         </Calendar>
         <div className="mt-4 text-xl dark:text-white">
            {tasks.length >= 1 ? (
               <div className="flex w-fit max-w-[300px] flex-col gap-5">
                  {tasks.map((task) => (
                     <div key={task._id}>
                        <p className="text-sm text-gray-400">
                           {task.subject.name}
                        </p>
                        <p>{task.title}</p>
                     </div>
                  ))}
               </div>
            ) : (
               <p>No tasks for this day</p>
            )}
         </div>
      </section>
   );
};
export default TaskCalendar;
