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
];
