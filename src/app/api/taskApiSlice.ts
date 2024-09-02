import { Task } from '../../types/TaskModel';
import { api } from './apiSlice';

const taskApiSlice = api.injectEndpoints({
   endpoints: (build) => ({
      addTask: build.mutation<
         Task,
         { name: string; subjectId: string; date: string | undefined }
      >({
         query: ({ subjectId, name, date }) => ({
            url: '/task',
            method: 'POST',
            body: { subjectId, title: name, date: date },
         }),
         invalidatesTags: ['Subject', 'Dates', 'Task', 'Completed'],
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
         invalidatesTags: ['Subject', 'Task', 'Completed'],
      }),
      deleteTask: build.mutation<{ message: string }, { taskId: string }>({
         query: ({ taskId }) => ({
            url: `/task/${taskId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Subject', 'Dates', 'Task', 'Completed'],
      }),
      editTaskName: build.mutation<
         Task,
         { name: string; taskId: string; date: string | undefined }
      >({
         query: ({ name, taskId, date }) => ({
            url: `/task/title/${taskId}`,
            method: 'PUT',
            body: { title: name, date: date },
         }),
         invalidatesTags: ['Subject', 'Dates', 'Task', 'Completed'],
      }),
      getAllTask: build.query<Task[], void>({
         query: () => ({
            url: '/task',
            method: 'GET',
         }),
         providesTags: ['Task'],
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
      deleteAllTasks: build.mutation<{ message: string }, void>({
         query: () => ({
            url: '/task/all',
            method: 'DELETE',
         }),
         invalidatesTags: ['Task', 'Subject'],
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
   useDeleteAllTasksMutation,
} = taskApiSlice;
