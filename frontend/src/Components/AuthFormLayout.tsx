import { ReactNode } from 'react';

const AuthFormLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title: String;
}) => {
  return (
    <div className='flex justify-center items-center'>
      <div className='w-[20rem] sm:w-[24rem]  flex flex-col gap-[.25rem] px-[1.4rem] py-[1.2rem] border rounded-xl shadow-xl'>
        <h1 className='text-grayDark text-center font-medium sm:font-semibold text-lg  sm:text-xl lg:text-2xl'>
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default AuthFormLayout;
