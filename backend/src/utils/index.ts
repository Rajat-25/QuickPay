import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import z from 'zod';
import { UserType } from './types';
const JWT_SECRET = process.env.JWT_SECRET!;

enum code {
  'serv' = 501,
  'succ' = 200,
  'cred' = 401,
  'credMsg' = 'Invalid Credentials',
  'servMsg' = 'Internal server error',
}

const getToken = (userId: Types.ObjectId) => {
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};



const getFormattedData=(data:UserType[],id:Types.ObjectId)=>{
  return data.map((user) => {
    const { firstName, lastName, _id, phoneNo } = user;
    return {
      userId: _id,
      firstName,
      lastName,
      phoneNo,
    };
  });
}

const signUpBody = z.object({
  firstName: z.string().min(2, {
    message: 'firstName  must be 2 characters long ',
  }),
  lastName: z.string().min(2, {
    message: 'lastName  must be 2 characters long ',
  }),
  username: z.string().email({
    message: 'Invalid email',
  }),
  password: z.string().min(6, {
    message: 'Password  must be 6 characters long ',
  }),
  phoneNo: z.string().regex(/^[1-9]\d{9}$/, {
    message: 'Phone No must be 10 characters long / Phone No invalid',
  }),
});

const signInBody = z.object({
  username: z.string().email({
    message: 'Invalid email',
  }),
  password: z.string().min(6, {
    message: 'Password  must be 6 characters long ',
  }),
});

export { code, getFormattedData, getToken, signInBody, signUpBody };

  export * from './types';
