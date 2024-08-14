import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { MouseEvent } from 'react';
import useHelperHook from '../hooks/useHelperHook';

const Pagination: React.FC<PaginationPropType> = ({
  next,
  prev,
  urlPath,
  currPg,
}) => {
  const { navigate } = useHelperHook();
  const nextHandler = (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    const pgNo = currPg + 1;
    navigate(urlPath + `/${pgNo}`);
  };

  const prevHandler = (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    const pgNo = currPg - 1;
    navigate(urlPath + `/${pgNo}`);
  };

  return (
    <div className='  mt-[.5rem] flex justify-center items-center  gap-x-[.75rem] '>
      {prev && (
        <ChevronLeftIcon
          onClick={prevHandler}
          className='w-[.9rem] sm:w-[1.2rem]'
        />
      )}

      <span className='text-grayOne text-base sm:text-lg lg:text-xl'>
        {currPg}
      </span>
      {next && (
        <ChevronRightIcon
          onClick={nextHandler}
          className='w-[.9rem]  sm:w-[1.2rem]'
        />
      )}
    </div>
  );
};

export default Pagination;
