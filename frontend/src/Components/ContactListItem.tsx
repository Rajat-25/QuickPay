import { DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import Avatar from './Avatar';

const ContactListItem: React.FC<ContactListItemPropsType> = ({
  fullName,
  phoneNo,
  userId,
  children,
}) => {
  return (
    <div key={userId} className='flex items-center  justify-between '>
      <div className='flex justify-start items-center   gap-[.5rem]  '>
        <Avatar initial={fullName[0].toUpperCase()} />
        <div className='flex flex-col'>
          <span
            className='text-grayTwo font-medium lg:font-semibold 
      text-base sm:text-lg    '
          >
            {fullName}
          </span>
          <div className='text-grayLight flex items-center '>
            <DevicePhoneMobileIcon className=' w-[.9rem] sm:w-[1.1rem]' />
            <span className='text-xs '>{phoneNo}</span>
          </div>
        </div>
      </div>

      <div className='flex gap-4 '>{children}</div>
    </div>
  );
};

export default ContactListItem;
