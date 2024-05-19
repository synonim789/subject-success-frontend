import { Subject } from '../../types/SubjectModel';
import { AddSubjectFields, EditSubjectFields } from '../../types/schemas';
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
      deleteSubject: build.mutation<Subject, { subjectId: string }>({
         query: ({ subjectId }) => ({
            url: `subject/${subjectId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Subject', 'Dates'],
      }),
      editSubject: build.mutation<
         { message: string },
         EditSubjectFields & { subjectId: string }
      >({
         query: ({ subjectId, name, type, completion, grade }) => ({
            url: `/subject/${subjectId}`,
            method: 'PUT',
            body: { name, type, completed: completion, grade },
         }),
         invalidatesTags: ['Subject'],
      }),
   }),
});

export const {
   useGetSubjectsQuery,
   useAddSubjectMutation,
   useDeleteSubjectMutation,
   useEditSubjectMutation,
} = subjectApiSlice;
