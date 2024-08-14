import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import React from 'react';

const SearchBar: React.FC<SearchBarPropsType> = ({ val, changeHandler }) => {
  return (
    <div className='flex justify-between items-center border bg-white px-[.45rem] py-[.35rem] sm:px-[.55rem] sm:py-[.45rem] lg:px-[.6rem] lg:py-[.5rem] rounded-full'>
      <input
        onChange={changeHandler}
        value={val}
        type='text'
        className='text-sm w-full text-grayDark outline-none'
        autoFocus
        placeholder='Search Contacts ...'
      />
      <MagnifyingGlassIcon className='text-grayLight w-[1.2rem] sm:w-[1.35rem] lg:w-[1.5rem] hover:scale-110 ' />
    </div>
  );
};

export default SearchBar;
