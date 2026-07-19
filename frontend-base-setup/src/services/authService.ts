import api from './api';

export interface RegisterPayload {
  name: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

// Each function just calls the matching backend route.
// They return response.data directly so components don't need to know about axios.
export const registerUser = (payload: RegisterPayload) =>
  api.post('/auth/register', payload).then((res) => res.data);

export const loginUser = (payload: LoginPayload) =>
  api.post('/auth/login', payload).then((res) => res.data);

export const forgotPassword = (payload: ForgotPasswordPayload) =>
  api.post('/auth/forgot-password', payload).then((res) => res.data);
