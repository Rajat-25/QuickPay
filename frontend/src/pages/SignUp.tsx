import AuthForm from '../Components/AuthForm';
import AuthFormLayout from '../Components/AuthFormLayout';
import useHelperHook from '../hooks/useHelperHook';
import { logIn, useSignUpMutation } from '../store';
import { path, signUpData, signUpFieldProps } from '../utils';

const SignUp = () => {
  const { navigate, dispatch } = useHelperHook();

  const [userSignUp] = useSignUpMutation();

  const logInUser = async (arg: SignUpReqType) => {
    const { token, user } = await userSignUp(arg).unwrap();
    if (token) {
      dispatch(logIn({ token, user }));
      navigate(path.home);
    }
  };

  return (
    <AuthFormLayout title='Sign Up'>
      <AuthForm
        linkTitle='Sign In'
        subHeading='Already have an account?'
        data={signUpData}
        fieldProps={signUpFieldProps}
        autoFocusTitle='firstName'
        directTo={path.signin}
        fnCall={logInUser}
      />
    </AuthFormLayout>
  );
};

export default SignUp;
