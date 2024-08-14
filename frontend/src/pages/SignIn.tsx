import AuthForm from '../Components/AuthForm';
import AuthFormLayout from '../Components/AuthFormLayout';
import useHelperHook from '../hooks/useHelperHook';
import { logIn, useSignInMutation } from '../store/';
import { path, signInData, signInFieldProps } from '../utils';

const SignIn = () => {
  const { navigate, dispatch } = useHelperHook();
  const [userSignIn] = useSignInMutation();

  const logInUser = async (arg: SignInReqType) => {
    const { token, user } = await userSignIn(arg).unwrap();
    if (token) {
      dispatch(logIn({ token, user }));
      navigate(path.home);
    }
  };

  return (
    <AuthFormLayout title='Sign In'>
      <AuthForm
        linkTitle=' Sign Up'
        subHeading="Don't have an account?"
        data={signInData}
        fieldProps={signInFieldProps}
        autoFocusTitle='username'
        directTo={path.signup}
        fnCall={logInUser}
      />
    </AuthFormLayout>
  );
};

export default SignIn;
