/// <reference types="vite/client" />

//General
type indexState = ReturnType<typeof store.getState>;

type UserType = {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNo: string;
};

type ContactType = {
  firstName: string;
  lastName: string;
  userId: string;
  phoneNo: string;
};

type BookmarkType = {
  fullName: string;
  phoneNo: string;
  bookmarkUserId: string;
};

type TransactionsType = {
  transactionType: string;
  userTransactionId: string;
  fullName: string;
  amount: number;
  _id: string;
  createdAt: string;
};

type GenResType = {
  msg: string;
};

type AuthTokenType = { token: string };

// Store

// ----------- Account API-------

///-------- Tag Types

/// Fav Tags
type FavTagStringType = 'fav_userid' | 'fav_main';

type FavTagType = {
  type: FavTagStringType;
  id: string;
};

/// Transact Tags
type TransactTagStringType = 'transact_main' | 'transact_contacts';

type TransactTagType = {
  type: TransactTagStringType;
  id: string;
};

// BalanceInfo

type BalanceInfoResType = GenResType & {
  data?: string;
};

//Transaction Info

type TransactionsInfoResType = GenResType & {
  data?: TransactionsType[];
  prevPg?: boolean;
  nextPg?: boolean;
};

type TransactionsInfoReqType = {
  token: string;
  currPg: string;
};

//Add Balance

type AddBalanceReqType = AuthTokenType & {
  amount: number;
};

//Initiate Transactions

type InitTransReqType = {
  amount: number;
  token: string;
  receiverUserId: string;
  receiverName: string;
};

//-----------User Api-------------

/// Sign Up

type SignUpReqType = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  phoneNo: string;
};

type SignUpResType = SignInResType;

/// Sign In

type SignInReqType = {
  username: string;
  password: string;
};

type SignInResType = {
  msg: string;
  token?: string;
  user?: UserType;
};

/// Contacts Info

type ContactsInfoReqType = AuthTokenType & {
  data: {
    currPg: number;
    filterStr: string;
  };
};

type ContactsInfoResType = GenResType & {
  data?: ContactType[];
  prevPg?: boolean;
  nextPg?: boolean;
};

//// Favourite Info

type FavouriteInfoResType = GenResType & {
  data?: BookmarkType[];
};

/////// Add Favourite

type AddFavouriteReqType = AuthTokenType & {
  data: BookmarkType;
};

///////// Remove Favourite

type RemoveFavouriteReqType = AuthTokenType & {
  bookmarkUserId: string;
};

///---------- User Slice ---------------------

type InitialUserStateType = {
  token: string | '';
  isUserLoggedIn: boolean;
  currentUser: UserType | null;
  receiverUser: ContactType | null;
};

/// -----------Components -----------------

// Authform

type AuthFieldPropsType = {
  label: string;
  id: string;
  type: string;
  title: string;
  placeholder: string;
};

type AuthFormType<T> = {
  linkTitle: string;
  subHeading: string;
  data: T;
  fieldProps: AuthFieldPropsType[];
  autoFocusTitle: string;
  directTo: string;
  fnCall: (T) => void;
};

//////    Avatar

type AvatarType = {
  initial: string;
  extraClass?: string;
  user?: boolean;
};

////  Button

type ButtonType = {
  type?: 'button' | 'submit' | undefined;
  children: ReactNode;
  onClick?: () => void;
  extraClass?: string;
  style: 'primary' | 'success' | 'danger';
};

////// ContactList

type ContactListType = {
  filterStr: string;
};

////// ContactListItem

type ContactListItemPropsType =  {
  fullName:string,
  phoneNo:string,
  userId:string,
  children:ReactNode,
};

/////// Pagination

type PaginationPropType = {
  next: boolean;
  prev: boolean;
  urlPath: string;
  currPg: number;
};

///Searchbar

type SearchBarPropsType = {
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  val: string;
};

// ----------------Pages --------------

///// Favourites

type favRemoveHandlerType = {
  e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>;
  bookmarkUserId: string;
};

type toggleFavHandlerType = {
  e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>;
  data: { fullName: string; phoneNo: string; bookmarkUserId: string };
};
