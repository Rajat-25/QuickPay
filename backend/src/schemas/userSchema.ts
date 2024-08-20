import { Schema, model } from 'mongoose';

function getFormatDate(dateObj: Date) {
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}

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
  createdAt: {
    type: String,
    required: true,
    default: () => getFormatDate(new Date()),
  },
});

const User = model('User', userSchema);

export default User;
