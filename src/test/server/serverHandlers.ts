import { HttpResponse, PathParams, http } from 'msw';

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

type setNewPasswordBody = {
   password: string;
   confirmPassword: string;
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
      setNewPasswordBody,
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
];
