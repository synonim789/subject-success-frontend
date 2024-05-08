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
   }),
});

export const { useAddTaskMutation } = taskApiSlice;
