import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import ContactList from '../Components/ContactList';
import SearchBar from '../Components/SearchBar';
import useHelperHook from '../hooks/useHelperHook';
import { addReceiverUser, useBalanceInfoQuery } from '../store';
import { path } from '../utils';

const Home = () => {
  const { token, currentUser } = useSelector(
    (state: indexState) => state.user_slice
  );

  const { data: balanceData, isLoading: balanceLoading } = useBalanceInfoQuery({
    token,
  });

  const { navigate, dispatch } = useHelperHook();

  const [filterVal, setfilterVal] = useState<string>('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setfilterVal(val);
  };

  const updateBalance = (arg: ContactType) => {
    navigate(path.sendMoney + `/self`);
    dispatch(addReceiverUser(arg));
  };

  let content;

  if (balanceLoading) {
    content = <div className='text-center font-semibold text-xl lg:text-2xl'>Loading...</div>;
  } else if (balanceData && balanceData.data) {
    const { firstName, lastName, phoneNo, userId } = currentUser!;

    content = (
      <div className='p-[.4rem] flex flex-col gap-y-[.7rem] '>
        <div className='flex justify-between  items-center '>
          <h2 className='text-grayDark font-medium md:font-semibold text-lg sm:text-xl lg:text-2xl '>
            Hello, {firstName} {lastName}
          </h2>

          <div className=' p-[.3rem] sm:p-[.4rem] flex justify-between items-center gap-x-[.4rem]  '>
            <h2 className='text-grayDark font-medium md:font-semibold text-base sm:text-xl lg:text-2xl'>
              Balance :&nbsp;<span className=''>{balanceData?.data} |</span>
            </h2>

            <PlusCircleIcon
              onClick={() =>
                updateBalance({ firstName, lastName, userId, phoneNo })
              }
              className='cursor-pointer hover:scale-125 w-[1.6rem] md:w-[2rem]  fill-green-500'
            />
          </div>
        </div>
        <SearchBar changeHandler={onChangeHandler} val={filterVal} />
        <div className='flex justify-between items-center '>
          <h2 className=' text-grayDark font-medium md:font-semibold text-base sm:text-lg lg:text-xl'>Contact Name </h2>
          <h2 className=' text-grayDark font-medium md:font-semibold text-base sm:text-lg lg:text-xl'>Send Money </h2>
        </div>
        <ContactList filterStr={filterVal} />
      </div>
    );
  }

  return <>{content}</>;
};

export default Home;
