import { RecommendedSubject } from '../../types/RecommendedSubject.Model';
import { Subject } from '../../types/SubjectModel';
import { AddSubjectFields, EditSubjectFields } from '../../validation/subject';
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
         invalidatesTags: ['Subject', 'Completed'],
      }),
      deleteSubject: build.mutation<Subject, { subjectId: string }>({
         query: ({ subjectId }) => ({
            url: `subject/${subjectId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Subject', 'Dates', 'Completed'],
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
         invalidatesTags: ['Subject', 'Completed'],
      }),
      getRecommendedSubject: build.query<RecommendedSubject[], void>({
         query: () => ({
            url: '/subject/recommended',
            method: 'GET',
         }),
         providesTags: ['Completed'],
      }),
      deleteAllSubjects: build.mutation<{ message: string }, void>({
         query: () => ({
            url: '/subject/all',
            method: 'DELETE',
         }),
         invalidatesTags: ['Subject', 'Task'],
      }),
   }),
});

export const {
   useGetSubjectsQuery,
   useAddSubjectMutation,
   useDeleteSubjectMutation,
   useEditSubjectMutation,
   useGetRecommendedSubjectQuery,
   useDeleteAllSubjectsMutation,
} = subjectApiSlice;
