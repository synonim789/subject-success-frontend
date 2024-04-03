import { HttpResponse, PathParams, http } from 'msw'

type LoginRequestBody = {
  email: string
  password: string
}

export const handlers = [
  http.post<
    PathParams,
    LoginRequestBody,
    string,
    'http://localhost:3000/auth/login'
  >('http://localhost:3000/auth/login', ({ params, request }) => {
    return HttpResponse.json('yctycytcy', { status: 201 })
  }),
]
