import { Subject } from '../../types/SubjectModel';
import { AddSubjectFields } from '../../types/addSubjectSchema';
import { api } from './apiSlice';

const subjectApiSlice = api.injectEndpoints({
   endpoints: (build) => ({
      getSubjects: build.query<Subject[], void>({
         query: () => ({
            url: '/subject',
            method: 'GET',
         }),
         providesTags: ['Subject'],
      }),
      addSubject: build.mutation<Subject, AddSubjectFields>({
         query: ({ name, type }) => ({
            url: '/subject',
            method: 'POST',
            body: { name, type },
         }),
         invalidatesTags: ['Subject'],
      }),
   }),
});

export const { useGetSubjectsQuery, useAddSubjectMutation } = subjectApiSlice;
