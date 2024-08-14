import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import useHelperHook from '../hooks/useHelperHook';
import { logOut } from '../store';
import { path } from '../utils';
import Button from './Button';

const NavBar = () => {
  const { navigate, dispatch } = useHelperHook();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { isUserLoggedIn } = useSelector(
    (state: indexState) => state.user_slice
  );

  const dataObj = [
    {
      title: 'Sign In',
      path: path.signin,
      id: '@signin_nb',
      isLogIn: false,
    },
    {
      title: 'Sign Up',
      path: path.signup,
      id: '@signup_nb',
      isLogIn: false,
    },
    {
      title: 'Home',
      path: path.home + '/1',
      id: '@home_nb',
      isLogIn: true,
    },
    {
      title: 'History',
      path: path.history + '/1',
      id: '@history_nb',
      isLogIn: true,
    },
    {
      title: 'Favourites',
      path: path.favourites,
      id: '@favourites_nb',
      isLogIn: true,
    },
    {
      title: 'Account',
      path: path.account,
      id: '@account_nb',
      isLogIn: true,
    },
  ];

  const onClickHandler = () => {
    dispatch(logOut(undefined));
    navigate(path.signin);
  };

  const loginFeild: ReactNode[] = [];
  const logOutFeild: ReactNode[] = [];

  const navItemStyle = `${
    isOpen ? 'm-1 block ' : ' '
  } md:py-2 md:px-4  md:bg-[#f5f5f5]  md:rounded-full  text-xs font-medium sm:text-base lg:text-lg md:font-semibold  text-gray-600 cursor-pointer hover:scale-105`;

  dataObj.forEach(({ isLogIn, id, title, path }) => {
    const ele = (
      <div className={navItemStyle} onClick={() => navigate(path)} key={id}>
        {title}
      </div>
    );
    isLogIn ? loginFeild.push(ele) : logOutFeild.push(ele);
  });

  return (
    <nav className='flex  justify-between items-center  font px-[1rem]  py-[.5rem]  mt-1 border rounded-2xl shadow-sm '>
      <h1 className='text-lg lg:text-2xl sm:text-xl font-semibold' >QuickPay</h1>
      <div>
        {!isOpen && (
          <Bars3BottomRightIcon
            onClick={() => setIsOpen(!isOpen)}
            className='md:hidden w-[1.5rem]'
          />
        )}
        <div
          className={` ${
            !isOpen ? 'hidden ' : ''
          } md:flex md:gap-3  md:justify-center md:items-center`}
        >
          {isOpen && (
            <XMarkIcon
              onClick={() => setIsOpen(false)}
              className='md:hidden md:w-[1.5rem] w-[1rem] fill-red-600'
            />
          )}
          {isUserLoggedIn ? (
            <>
              {loginFeild}
              <Button style='danger' extraClass=' text-xs font-medium sm:text-base lg:text-lg md:font-semibold' onClick={onClickHandler}>
                Logout
              </Button>
            </>
          ) : (
            <>{logOutFeild}</>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
