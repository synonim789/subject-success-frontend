import { Task } from '../../types/TaskModel';
import { api } from './apiSlice';

const taskApiSlice = api.injectEndpoints({
   endpoints: (build) => ({
      addTask: build.mutation<
         Task,
         { name: string; subjectId: string; date: Date | undefined }
      >({
         query: ({ subjectId, name, date }) => ({
            url: '/task',
            method: 'POST',
            body: { subjectId, title: name, date: date },
         }),
         invalidatesTags: ['Subject', 'Dates'],
      }),
      setCompleted: build.mutation<
         Task,
         { completed: boolean; taskId: string }
      >({
         query: ({ completed, taskId }) => ({
            url: `task/completed/${taskId}`,
            method: 'PUT',
            body: { completed },
         }),
         invalidatesTags: ['Subject'],
      }),
      deleteTask: build.mutation<{ message: string }, { taskId: string }>({
         query: ({ taskId }) => ({
            url: `/task/${taskId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Subject', 'Dates'],
      }),
      editTaskName: build.mutation<
         Task,
         { name: string; taskId: string; date: Date | undefined }
      >({
         query: ({ name, taskId, date }) => ({
            url: `/task/title/${taskId}`,
            method: 'PUT',
            body: { title: name, date: date },
         }),
         invalidatesTags: ['Subject', 'Dates'],
      }),
      getAllTask: build.query<Task[], void>({
         query: () => ({
            url: '/task',
            method: 'GET',
         }),
      }),
      getTaskDates: build.query<Task[], void>({
         query: () => ({
            url: '/task/dates',
            method: 'GET',
         }),
         providesTags: ['Dates'],
      }),
      getRecommendedTasks: build.query<Task[], void>({
         query: () => ({
            url: '/task/recommended',
            method: 'GET',
         }),
      }),
      getTaskCount: build.query<
         { taskAmount: number; completedTasks: number },
         void
      >({
         query: () => ({
            url: '/task/completed',
            method: 'GET',
         }),
      }),
   }),
});

export const {
   useAddTaskMutation,
   useSetCompletedMutation,
   useDeleteTaskMutation,
   useEditTaskNameMutation,
   useGetAllTaskQuery,
   useGetTaskDatesQuery,
   useGetRecommendedTasksQuery,
   useGetTaskCountQuery,
} = taskApiSlice;
