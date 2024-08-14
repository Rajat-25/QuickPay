import { UserIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import { useFavouritesInfoQuery } from '../store';

const Account = () => {
  const { currentUser, token } = useSelector(
    (state: indexState) => state.user_slice
  );
  const { data } = useFavouritesInfoQuery({ token });

  const itemName = [
    {
      label: 'Firstname',
      val: [currentUser.firstName],
      key: '1A',
    },
    {
      label: 'Lastname',
      val: [currentUser.lastName],
      key: '1B',
    },
    {
      label: 'Email',
      val: [currentUser.username],
      key: '1C',
    },
    {
      label: 'Phone no',
      val: [currentUser.phoneNo],
      key: '1D',
    },
  ];
  const listItemStyle =
    'bg-whiteAcc border-white border-b flex rounded-xl text-grayOne py-[1rem] px-[.5rem] sm:py-[1.5rem] sm:px-[1rem] font-medium  sm:font-semibold text-base sm:text-lg lg:text-xl';

  const content = itemName.map((item) => (
    <div key={item.key} className={listItemStyle}>
      <span className=''>{item.label} -&nbsp; </span>
      <span className=''> {item.val}</span>
    </div>
  ));

  return (
    <div
      className='flex flex-col sm:grid sm:grid-cols-6 
    sm:gap-x-[.2rem] gap-y-[.8rem]  '
    >
      <div className='bg-whiteAcc border-white  border-r-2 flex flex-col items-center justify-center rounded-xl gap-y-[.2rem] py-[1rem]   sm:col-span-2'>
        <UserIcon className=' fill-grayOne w-[7rem] sm:w-[10rem]' />
        <span className=' text-grayDark font-semibold text-lg sm:text-xl lg:text-2xl'>
          {currentUser.firstName} {currentUser.lastName}
        </span>
      </div>

      <div className='flex flex-col  gap-y-[.1rem]  sm:col-span-4'>
        {content}

        <div className={listItemStyle}>
          <span className=''>Favourites -&nbsp; </span>
          <span className=''>{data?.data?.length} </span>
        </div>
      </div>
    </div>
  );
};

export default Account;
