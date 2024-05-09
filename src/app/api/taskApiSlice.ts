import { Task } from '../../types/TaskModel';
import { api } from './apiSlice';

const taskApiSlice = api.injectEndpoints({
   endpoints: (build) => ({
      addTask: build.mutation<Task, { name: string; subjectId: string }>({
         query: ({ subjectId, name }) => ({
            url: '/task',
            method: 'POST',
            body: { subjectId, title: name },
         }),
         invalidatesTags: ['Subject'],
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
         invalidatesTags: ['Subject'],
      }),
      editTaskName: build.mutation<Task, { name: string; taskId: string }>({
         query: ({ name, taskId }) => ({
            url: `/task/title/${taskId}`,
            method: 'PUT',
            body: { title: name },
         }),
         invalidatesTags: ['Subject'],
      }),
   }),
});

export const {
   useAddTaskMutation,
   useSetCompletedMutation,
   useDeleteTaskMutation,
   useEditTaskNameMutation,
} = taskApiSlice;
