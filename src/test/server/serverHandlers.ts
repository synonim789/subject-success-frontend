import { HttpResponse, PathParams, http } from 'msw'

type LoginRequestBody = {
  email: string
  password: string
}

export const handlers = [
  http.post<
    PathParams,
    LoginRequestBody,
    string | { message: string },
    'http://localhost:3000/auth/login'
  >('http://localhost:3000/auth/login', async ({ params, request }) => {
    const { email } = await request.json()
    if (email === 'test2@gmail.com') {
      return HttpResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }
    return HttpResponse.json('yctycytcy', { status: 200 })
  }),
]
