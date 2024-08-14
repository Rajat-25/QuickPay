import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getRequestHeaders } from '../../utils';

const userApi = createApi({
  reducerPath: 'user_api',

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_USER_URL,
  }),
  tagTypes: ['fav_userid', 'fav_main'],
  endpoints(builder) {
    return {
      signUp: builder.mutation<SignUpResType, SignUpReqType>({
        query: (bodyData) => {
          return {
            url: '/signup',
            method: 'POST',
            body: bodyData,
          };
        },
      }),

      signIn: builder.mutation<SignInResType, SignInReqType>({
        query: (bodyData) => {
          return {
            url: '/signin',
            method: 'POST',
            body: bodyData,
          };
        },
      }),

      contactsInfo: builder.query<ContactsInfoResType, ContactsInfoReqType>({
        query: ({ token, data }) => {
          return {
            url: '/contacts/info',
            method: 'GET',
            params: {
              filterStr: data.filterStr,
              currPg: data.currPg,
            },
            headers: getRequestHeaders(token),
          };
        },
      }),

      deleteUser: builder.mutation<GenResType, AuthTokenType>({
        query: ({ token }) => {
          return {
            url: '/del',
            method: 'DELETE',
            headers: getRequestHeaders(token),
          };
        },
      }),

      favouritesInfo: builder.query<FavouriteInfoResType, AuthTokenType>({
        providesTags: (res) => {
          const tags: FavTagType[] = [];
          if (res && res.data) {
            res.data.forEach((item) =>
              tags.push({
                type: 'fav_userid',
                id: item.bookmarkUserId,
              })
            );
          }
          tags.push({ type: 'fav_main', id: 'fav_main' });
          return tags;
        },
        query: ({ token }) => {
          return {
            method: 'GET',
            url: '/favourites/info',
            headers: getRequestHeaders(token),
          };
        },
      }),

      addFavourite: builder.mutation<GenResType, AddFavouriteReqType>({
        invalidatesTags: () => {
          return [{ type: 'fav_main', id: 'fav_main' }];
        },
        query: ({ token, data }) => {
          return {
            method: 'POST',
            url: '/favourites/add',
            body: data,
            headers: getRequestHeaders(token),
          };
        },
      }),

      removeFavourite: builder.mutation<GenResType, RemoveFavouriteReqType>({
        invalidatesTags: (_a, _b, req) => {
          return [{ type: 'fav_userid', id: req.bookmarkUserId }];
        },
        query: ({ token, bookmarkUserId }) => {
          return {
            method: 'DELETE',
            url: '/favourites/remove',
            body: { bookmarkUserId },
            headers: getRequestHeaders(token),
          };
        },
      }),
    };
  },
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useDeleteUserMutation,
  useContactsInfoQuery,
  useAddFavouriteMutation,
  useFavouritesInfoQuery,
  useRemoveFavouriteMutation,
} = userApi;

export default userApi;
