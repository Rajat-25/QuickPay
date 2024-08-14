import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Pagination from '../Components/Pagination';
import { useTransactionsInfoQuery } from '../store/apis/accountApi';
import { formatDate, path } from '../utils';

const History = () => {
  const { token } = useSelector((state: indexState) => state.user_slice);
  const { pgNo } = useParams();
  const { data: transactData, isLoading: transactLoading } =
    useTransactionsInfoQuery({
      token,
      currPg: pgNo || '1',
    });

  let content;

  if (transactLoading) {
    content = (
      <div className='text-lg sm:text-xl lg:text-2xl font-semibold text-center'>
        Loading...
      </div>
    );
  } else if (transactData?.data) {
    if (transactData.data.length == 0) {
      return <div className='mt-2 text-lg sm:text-xl lg:text-2xl font-semibold text-center'>No Transactions made yet</div>;
    } else {
      const { data, prevPg, nextPg } = transactData;
      const iconStyle = 'font-semibold text-base sm:text-lg lg:text-xl';

      const items = data.map(
        ({ fullName, amount, transactionType, createdAt, _id }) => (
          <div key={_id} className='flex justify-between items-center'>
            <div className=' flex flex-col gap-y-[.15rem] text-lg'>
              <span className='text-grayTwo font-normal sm:font-medium text-base sm:text-lg '>
                {fullName}
              </span>

              <p className='text-grayLight  font-normal text-xs '>
                Sent On : {formatDate(new Date(createdAt))}
              </p>
            </div>

            <div className='flex items-center'>
              {transactionType == 'Credit' ? (
                <>
                  <PlusIcon className='w-[1rem] sm:w-[1.3rem]  fill-greenHisIcon' />
                  <span className={`${iconStyle} text-greenHisIcon`}>
                    {amount}
                  </span>
                </>
              ) : (
                <>
                  <MinusIcon className='w-[1rem] sm:w-[1.3rem] fill-redHisIcon  ' />
                  <span className={`${iconStyle} text-redHisIcon`}>
                    {amount}
                  </span>
                </>
              )}
            </div>
          </div>
        )
      );
      content = (
        <>
          {items}
          {nextPg && (
            <Pagination
              urlPath={path.history}
              currPg={parseInt(pgNo!)}
              prev={prevPg!}
              next={nextPg!}
            />
          )}
        </>
      );
    }
  }
  return (
    <div className='flex flex-col p-[1rem] gap-[1rem] '>
      <div className='text-grayDark flex  items-center justify-between'>
        <div className=' text-lg sm:text-xl lg:text-2xl font-medium sm:font-semibold'>
          Name
        </div>
        <div className=' text-lg sm:text-xl lg:text-2xl font-medium sm:font-semibold'>
          Amount in (Rupees)
        </div>
      </div>
      {content}
    </div>
  );
};

export default History;
