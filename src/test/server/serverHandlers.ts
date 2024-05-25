import { HttpResponse, PathParams, http } from 'msw';
import { User } from '../../types/UserModel';
import { AddSubjectFields, EditSubjectFields } from '../../types/schemas';

type LoginRequestBody = {
   email: string;
   password: string;
};

type SignUpRequestBody = {
   email: string;
   username: string;
   password: string;
};

type ForgotPasswordBody = {
   email: string;
};

type ResetPasswordBody = {
   password: string;
   confirmPassword: string;
};

type SetNewPasswordBody = {
   password: string;
   confirmPassword: string;
};

type UpdateUsernameBody = {
   username: string;
};

export const handlers = [
   http.post<
      PathParams,
      LoginRequestBody,
      string | { message: string },
      'http://localhost:3000/auth/login'
   >('http://localhost:3000/auth/login', async ({ request }) => {
      const { email } = await request.json();
      if (email === 'test2@gmail.com') {
         return HttpResponse.json(
            { message: 'Invalid credentials' },
            { status: 401 },
         );
      }
      return HttpResponse.json('yctycytcy', { status: 200 });
   }),
   http.post<
      PathParams,
      SignUpRequestBody,
      { message: string },
      'http://localhost:3000/user/sign-up'
   >('http://localhost:3000/user/sign-up', async ({ request }) => {
      const { email } = await request.json();
      if (email === 'test2@gmail.com') {
         return HttpResponse.json(
            { message: 'User already exist' },
            { status: 401 },
         );
      }
      return HttpResponse.json({ message: 'Sign up success' }, { status: 200 });
   }),
   http.post<
      PathParams,
      ForgotPasswordBody,
      { message: string },
      'http://localhost:3000/user/forgot-password'
   >('http://localhost:3000/user/forgot-password', async ({ request }) => {
      const { email } = await request.json();
      if (email === 'test2@gmail.com') {
         return HttpResponse.json(
            { message: 'email dont exist' },
            { status: 401 },
         );
      }
      return HttpResponse.json(
         { message: 'forgot password success' },
         { status: 200 },
      );
   }),
   http.put<
      PathParams,
      ResetPasswordBody,
      { message: string },
      'http://localhost:3000/user/reset-password'
   >('http://localhost:3000/user/reset-password', async ({ request }) => {
      const { password } = await request.json();
      if (password === 'Test!1234') {
         return HttpResponse.json(
            { message: 'cannot reset password' },
            { status: 401 },
         );
      }
      return HttpResponse.json({ message: 'reset success' }, { status: 200 });
   }),
   http.put<
      PathParams,
      SetNewPasswordBody,
      { message: string },
      'http://localhost:3000/user/set-new-password'
   >('http://localhost:3000/user/set-new-password', async ({ request }) => {
      const { password } = await request.json();
      if (password === 'Test!1234') {
         return HttpResponse.json(
            { message: 'cannot reset password' },
            { status: 401 },
         );
      }
      return HttpResponse.json({ message: 'reset success' }, { status: 200 });
   }),
   http.get<PathParams, null, User, 'http://localhost:3000/user'>(
      'http://localhost:3000/user',
      async () => {
         return HttpResponse.json({
            __v: 0,
            _id: 'firgr',
            createdAt: 'yesterday',
            email: 'test@test.com',
            updatedAt: 'today',
            picture: 'picture placeholder',
            username: 'test!1234',
         });
      },
   ),

   http.put<
      PathParams,
      UpdateUsernameBody,
      { message: string },
      'http://localhost:3000/user/update-username'
   >('http://localhost:3000/user/update-username', async ({ request }) => {
      const { username } = await request.json();
      if (username === 'test!12345') {
         return HttpResponse.json(
            { message: 'cannot update username' },
            { status: 401 },
         );
      }

      return HttpResponse.json({ message: 'update success' }, { status: 200 });
   }),
   http.post('http://localhost:3000/auth/logout', async () => {
      return HttpResponse.json(
         { message: 'Logout successful' },
         { status: 200 },
      );
   }),
   http.get('http://localhost:3000/subject', async () => {
      return HttpResponse.json(
         [
            {
               _id: '663cf649d64201f94f27a922',
               tasks: [
                  {
                     _id: '663cf652d64201f94f27a928',
                     title: 'zaliczenie za laboratoria',
                     subject: '663cf649d64201f94f27a922',
                     completed: true,
                     user: '661d5f2a9d21998a6d0ce08d',
                     __v: 0,
                     date: '2024-07-06T00:00:00.000Z',
                  },
               ],
               name: 'zaawansowane programowanie obiektowe - wyklady',
               status: 'noTasks',
               user: '661d5f2a9d21998a6d0ce08d',
               type: 'completion',
               completed: true,
               __v: 1,
               grade: null,
            },
            {
               _id: '663cf66dd64201f94f27a935',
               tasks: [],
               name: 'zaawansowane programowanie obiektowe - laboratoria',
               status: 'noTasks',
               user: '661d5f2a9d21998a6d0ce08d',
               type: 'grade',
               grade: 0,
               __v: 3,
            },
            {
               _id: '663cf677d64201f94f27a93b',
               tasks: [
                  {
                     date: null,
                     _id: '663cf686d64201f94f27a948',
                     title: 'zaliczenie za laboratoria',
                     subject: '663cf677d64201f94f27a93b',
                     completed: true,
                     user: '661d5f2a9d21998a6d0ce08d',
                     __v: 0,
                  },
               ],
               name: 'Api w eksploracji danych - wyklady',
               status: 'noTasks',
               user: '661d5f2a9d21998a6d0ce08d',
               type: 'completion',
               completed: false,
               __v: 2,
               grade: 4,
            },
         ],
         { status: 200 },
      );
   }),

   http.post<PathParams, AddSubjectFields, { message: string }>(
      'http://localhost:3000/subject',
      async ({ request }) => {
         const { name } = await request.json();
         if (name === 'test123') {
            return HttpResponse.json(
               { message: 'there was an error' },
               { status: 500 },
            );
         }
         return HttpResponse.json(
            { message: 'subject added' },
            { status: 200 },
         );
      },
   ),
   http.put<PathParams, EditSubjectFields, { message: string }>(
      'http://localhost:3000/subject/663cf649d64201f94f27a922',
      async ({ request }) => {
         const { name } = await request.json();
         if (name === 'test123') {
            return HttpResponse.json(
               { message: 'there was an error' },
               { status: 500 },
            );
         }
         return HttpResponse.json(
            { message: 'subject edited' },
            { status: 200 },
         );
      },
   ),
   http.delete(
      'http://localhost:3000/subject/663cf649d64201f94f27a922',
      async () => {
         return HttpResponse.json(
            { message: 'subject deleted' },
            { status: 200 },
         );
      },
   ),
   http.post<PathParams, { title: string }, { message: string }>(
      'http://localhost:3000/task',
      async ({ request }) => {
         const { title } = await request.json();
         console.log(title);
         if (title === 'task 2') {
            return HttpResponse.json(
               { message: 'task cant be added' },
               { status: 400 },
            );
         }

         return HttpResponse.json(
            { message: 'task added success' },
            { status: 200 },
         );
      },
   ),
];
