import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getRequestHeaders } from '../../utils';

const accountApi = createApi({
  reducerPath: 'account_api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_ACCOUNT_URL,
  }),
  tagTypes: ['transact_main', 'transact_contacts'],
  endpoints(builder) {
    return {
      balanceInfo: builder.query<BalanceInfoResType, AuthTokenType>({
        providesTags: () => {
          return [{ type: 'transact_main', id: 'transact_main' }];
        },
        query: ({ token }) => {
          return {
            method: 'GET',
            url: '/balance/info',
            headers: getRequestHeaders(token),
          };
        },
      }),

      TransactionsInfo: builder.query<
        TransactionsInfoResType,
        TransactionsInfoReqType
      >({
        providesTags: (res) => {
          const tags: TransactTagType[] = [];
          if (res && res.data) {
            const arr = res.data;
            arr.forEach((item) =>
              tags.push({
                type: 'transact_contacts',
                id: item.userTransactionId,
              })
            );
          }
          tags.push({
            type: 'transact_main',
            id: 'transact_main',
          });
          return tags;
        },
        query: ({ token, currPg }) => {
          return {
            method: 'GET',
            url: `/transactions/info/${currPg}`,
            headers: getRequestHeaders(token),
          };
        },
      }),

      addBalance: builder.mutation<GenResType, AddBalanceReqType>({
        invalidatesTags: () => {
          return [{ type: 'transact_main', id: 'transact_main' }];
        },
        query: ({ token, amount }) => {
          return {
            method: 'POST',
            url: '/add/balance',
            body: { amount },
            headers: getRequestHeaders(token),
          };
        },
      }),

      initiateTransaction: builder.mutation<GenResType, InitTransReqType>(
        {
          invalidatesTags: () => {
            return [{ type: 'transact_main', id: 'transact_main' }];
          },
          query: ({ amount, token, receiverUserId, receiverName }) => {
            return {
              method: 'POST',
              url: '/initiate/transaction',
              body: {
                receiverUserId,
                amount,
                receiverName,
              },
              headers: getRequestHeaders(token),
            };
          },
        }
      ),
    };
  },
});

export default accountApi;

export const {
  useInitiateTransactionMutation,
  useTransactionsInfoQuery,
  useAddBalanceMutation,
  useBalanceInfoQuery,
} = accountApi;
