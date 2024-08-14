const path = {
  signin: '/signin',
  signup: '/signup',
  history: '/history',
  home: '/home',
  sendMoney: '/sendMoney',
  favourites: '/favourites',
  account:'/account'
};

const getRequestHeaders = (token: string) => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

const signInData = {
  username: '',
  password: '',
};

const signUpData = {
  firstName: '',
  lastName: '',
  phoneNo: '' ,
  username: '',
  password: '',
};

const signInFieldProps = [
  {
    label: 'Email',
    id: '@username_si',
    type: 'email',
    title: 'username',
    placeholder: 'Enter email',
  },

  {
    label: 'Password',
    id: '@password_si',
    type: 'password',
    title: 'password',
    placeholder: 'Enter password',
  },
];

const signUpFieldProps = [
  {
    label: 'First Name',
    id: '@firstname_su',
    type: 'text',
    title: 'firstName',
    placeholder: 'Enter firstname',
  },

  {
    label: 'Last Name',
    id: '@lastname_su',
    type: 'text',
    title: 'lastName',
    placeholder: 'Enter lastname',
  },
  {
    label: 'Phone No.',
    id: '@phone_su',
    type: 'text',
    title: 'phoneNo',
    placeholder: 'Enter Phone No.',
  },
  {
    label: 'Email',
    id: '@username_su',
    type: 'email',
    title: 'username',
    placeholder: 'Enter email',
  },

  {
    label: 'Password',
    id: '@password_su',
    type: 'password',
    title: 'password',
    placeholder: 'Enter password',
  },
];


function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const nDate = `${day}-${month}-${year} ${hours}:${minutes}`;
  return nDate;
}

export {
  path,
  getRequestHeaders,
  signInData,
  signUpData,
  signInFieldProps,
  signUpFieldProps,
  formatDate
};
