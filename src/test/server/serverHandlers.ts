import { HttpResponse, PathParams, http } from 'msw';
import { User } from '../../types/UserModel';

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
   http.get<PathParams, null, User, 'http://localhost:3000/user/user'>(
      'http://localhost:3000/user/user',
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
   http.put(
      'http://localhost:3000/user/update-profile-image',
      async ({ request }) => {
         const data = await request.formData();
         console.log(data);
         return HttpResponse.json(
            { message: 'Update image success' },
            { status: 200 },
         );
      },
   ),
];
