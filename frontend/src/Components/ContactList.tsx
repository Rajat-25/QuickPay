import { StarIcon } from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useHelperHook from '../hooks/useHelperHook';
import {
  addReceiverUser,
  useAddFavouriteMutation,
  useContactsInfoQuery,
  useFavouritesInfoQuery,
  useRemoveFavouriteMutation,
} from '../store';
import { path } from '../utils';
import ContactListItem from './ContactListItem';
import Pagination from './Pagination';

const ContactList: React.FC<ContactListType> = ({ filterStr }) => {
  const { pgNo } = useParams();
  const currPg = parseInt(pgNo!);
  const { navigate, dispatch } = useHelperHook();

  const { token } = useSelector((state: indexState) => state.user_slice);

  const [addFavourite] = useAddFavouriteMutation();
  const [removeFavourite] = useRemoveFavouriteMutation();

  const { data: contactData, isLoading: contactLoading } = useContactsInfoQuery(
    {
      token,
      data: { currPg: currPg, filterStr },
    }
  );

  const { data: favData, isLoading: favLoading } = useFavouritesInfoQuery({
    token,
  });

  useEffect(() => {
    if (filterStr) {
      navigate(path.home + '/1'); // Reset to page 1 on search change
    }
  }, [filterStr]);

  const favColor = 'fill-yellow-300';

  const toggleFavouriteHandler = ({ e, data }: toggleFavHandlerType) => {
    const ele = e.currentTarget as SVGSVGElement;

    if (ele.classList.contains(favColor)) {
      removeFavourite({ token, bookmarkUserId: data.bookmarkUserId });
    } else {
      addFavourite({ token, data });
    }
    ele.classList.toggle(favColor);
  };

  const setReceiverUser = (arg: ContactType) => {
    dispatch(addReceiverUser(arg));
    navigate(path.sendMoney + `/${arg.firstName}${arg.lastName}`);
  };

  let content;

  const iconStyle =
    'cursor-pointer hover:scale-125 w-[1rem] sm:w-[1.2rem] md:w-[1.5rem]';

  if (contactLoading || favLoading) {
    content = <div>Loading...</div>;
  } else if (contactData) {
    const idBox = new Set();
    favData?.data?.forEach((item) => idBox.add(item.bookmarkUserId));

    const { data, nextPg, prevPg } = contactData;

    const elements = data!.map((item) => {
      const { firstName, lastName, userId, phoneNo } = item;

      const fullName = firstName + ' ' + lastName;

      return (
        <ContactListItem
          key={userId}
          fullName={fullName}
          userId={userId}
          phoneNo={phoneNo}
        >
          <StarIcon
            className={`${
              idBox && idBox.has(userId) ? 'fill-yellow-300 ' : ''
            }  text-yellow-300 ${iconStyle}`}
            onClick={(e) =>
              toggleFavouriteHandler({
                e,
                data: { fullName, phoneNo, bookmarkUserId: userId },
              })
            }
          />
          <PaperAirplaneIcon
            className={`fill-green-500  ${iconStyle} `}
            onClick={() => setReceiverUser(item)}
          />
        </ContactListItem>
      );
    });
    content = (
      <>
        {elements}
        {nextPg && (
          <Pagination
            urlPath={path.home}
            currPg={currPg}
            next={nextPg!}
            prev={prevPg!}
          />
        )}
      </>
    );
  }
  return <div className='flex flex-col gap-y-[1rem]'>{content}</div>;
};

export default ContactList;
