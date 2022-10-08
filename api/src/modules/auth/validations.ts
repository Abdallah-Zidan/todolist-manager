import z from 'zod';
import { UserModel } from './user.model';

export const createUserSchema = z.object({
  name: z.string({
    required_error: 'name is required',
    invalid_type_error: 'name must be a valid string',
  }).trim().max(150, 'name can\'t exceed 150 characters length')
    .min(4, 'name must be at least 4 non empty characters long'),

  email: z.string({
    required_error: 'email is required',
    invalid_type_error: 'email must be a valid email string',
  }).email({
    message: 'email must be a valid email format',
  }).trim(),

  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a valid string',
  }).min(6, 'password must be at least 6 characters long')
    .max(150, 'password can\'t exceed 150 character'),

  passwordConfirmation: z.string({
    required_error: 'passwordConfirmation is required',
    invalid_type_error: 'passwordConfirmation must be a valid string',
  }).min(6, 'passwordConfirmation must be at least 6 characters long')
    .max(150, 'passwordConfirmation can\'t exceed 150 character'),
}).superRefine(async ({ password, passwordConfirmation, email }, ctx) => {
  if (password !== passwordConfirmation) {
    ctx.addIssue({
      code: 'custom',
      message: 'password and password confirmation don\'t match',
      path: ['passwordConfirmation'],
    });
  }

  if (await UserModel.exists({
    email,
  })) {
    ctx.addIssue({
      code: 'custom',
      message: 'email already in use',
      path: ['email'],
    });
  }
});

export const loginUserSchema = z.object({
  email: z.string({
    required_error: 'email is required',
    invalid_type_error: 'email must be a valid email string',
  }).email({
    message: 'email must be a valid email format',
  }).trim(),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a valid string',
  }),
})

