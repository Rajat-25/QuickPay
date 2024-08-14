import { StarIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { useFavouritesInfoQuery, useRemoveFavouriteMutation } from '../store';
import ContactListItem from '../Components/ContactListItem';

const Favourites = () => {
  const { token } = useSelector((state: indexState) => state.user_slice);
  const { data: favData, isLoading: favLoading } = useFavouritesInfoQuery({
    token,
  });
  const [removeFav] = useRemoveFavouriteMutation();

  let content;

  const removeFavHandler = ({ e, bookmarkUserId }: favRemoveHandlerType) => {
    const ele = e.currentTarget as SVGSVGElement;
    ele.classList.remove('fill-yellow-300');
    removeFav({ token, bookmarkUserId });
  };

  if (favLoading) {
    content = <div className='text-lg sm:text-xl lg:text-2xl font-semibold text-center'>Loading...</div>;
  } else if (favData && favData.data) {
    if (!favData.data.length) {
      content = (
        <div className='text-lg sm:text-xl lg:text-2xl font-semibold text-center'>
          No Favorites saved
        </div>
      );
    } else {
      const elements = favData.data.map(
        ({ fullName, phoneNo, bookmarkUserId }) => (
          <ContactListItem
            key={bookmarkUserId}
            fullName={fullName}
            phoneNo={phoneNo}
            userId={bookmarkUserId}
          >
            <StarIcon
              onClick={(e) => removeFavHandler({ e, bookmarkUserId })}
              className='fill-yellow-300 text-yellow-300 cursor-pointer hover:scale-125 w-[1rem] sm:w-[1.2rem] md:w-[1.5rem] '
            />
          </ContactListItem>
        )
      );
      content = (
        <div className='flex flex-col gap-y-[2rem] '>
          <h2 className='text-lg sm:text-xl lg:text-2xl font-semibold text-center '>Your Favourites</h2>
          <div className='flex flex-col gap-y-[1rem] '>{elements}</div>
        </div>
      );
    }
  }
  return <div>{content}</div>;
};

export default Favourites;
