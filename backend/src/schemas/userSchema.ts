import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    trim: true,
  },
  phoneNo: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    minLength: [6, 'Password must be atleast 6 characters long'],
    required: true,
    trim: true,
  },
});



const User = model('User', userSchema);

export default User;
