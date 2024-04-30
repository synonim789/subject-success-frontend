import { Subject } from '../../types/SubjectModel';
import { api } from './apiSlice';

const subjectApiSlice = api.injectEndpoints({
   endpoints: (build) => ({
      getSubjects: build.query<Subject[], void>({
         query: () => ({
            url: '/subject',
            method: 'GET',
         }),
      }),
   }),
});

export const { useGetSubjectsQuery } = subjectApiSlice;
