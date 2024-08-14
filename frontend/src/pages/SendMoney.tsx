import { useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../Components/Avatar';
import Button from '../Components/Button';
import useHelperHook from '../hooks/useHelperHook';
import {
  useAddBalanceMutation,
  useInitiateTransactionMutation,
} from '../store';
import { path } from '../utils';

const SendMoney = () => {
  const { navigate } = useHelperHook();
  const [modal, setModal] = useState(true);
  const [amount, setAmount] = useState<number>(0);

  const { token, receiverUser, currentUser } = useSelector(
    (state: indexState) => state.user_slice
  );

  const [initiateTransaction] = useInitiateTransactionMutation();
  const [addBalance] = useAddBalanceMutation();
  const { userId, firstName, lastName } = receiverUser!;

  const transferMoney = async () => {
    if (currentUser!.userId == receiverUser!.userId) {
      addBalance({ token, amount });
    } else {
      await initiateTransaction({
        receiverUserId: userId,
        amount,
        token,
        receiverName: `${firstName} ${lastName}`,
      });
    }

    setModal(false);
    setAmount(0);
    navigate(path.home + '/1');
  };

  let content = (
    <div
      onClick={() => setModal(false)}
      className='flex fixed bg-black/[.75]  inset-0 justify-center items-center'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=' w-[21rem] sm:w-[25rem] rounded-2xl  bg-white p-6  flex flex-col    fixed  gap-[.9rem] '
      >
        <div className='flex items-center gap-x-[.8rem]'>
          <Avatar initial={firstName[0].toUpperCase()} />
          <h2 className='text-grayDark font-medium text-lg sm:text-xl'>
            To:&nbsp;
            <span className=''>
              {currentUser!.userId == receiverUser!.userId
                ? 'Self'
                : `${firstName} ${lastName}`}
            </span>
          </h2>
        </div>
        <p className='font-medium text-grayOne'>Amount (in Rs)</p>
        <input
          value={amount === 0 ? '' : amount}
          type='number'
          autoFocus
          placeholder='Enter Amount....'
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className=' px-[1rem] py-[.3rem] rounded-full outline-none border border-grayLight'
        />
        <Button style='success'extraClass='font-medium' onClick={transferMoney}>
          Send Money
        </Button>
      </div>
    </div>
  );

  return <div>{modal && content}</div>;
};

export default SendMoney;
