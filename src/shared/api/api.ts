import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "../constants/url";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const briefsAdapter = createEntityAdapter();

const initialState = briefsAdapter.getInitialState();

export interface Brief {
  id: number;
  title: string;
  comment: string;
  productId: number;
}

export interface Products {
  id: number;
  name: string;
}

export type BriefResponse = Brief[];

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    getBriefs: build.query<BriefResponse, void>({
      query: () => "briefs",
    }),
    addBrief: build.mutation<Brief, Partial<Brief>>({
      query: (body) => ({
        url: `briefs`,
        method: "POST",
        body,
      }),
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(
          // Push Brief into the cache manually
          apiSlice.util.updateQueryData("getBriefs", undefined, (draft) => {
            draft.push(data);
          })
        );
      },
    }),
    getBrief: build.query<Brief, string>({
      query: (id) => `briefs/${id}`,
      providesTags: (result, error, arg) => [{ type: "Post", id: arg }],
    }),
    /*  updateBrief: build.mutation<void, Pick<Brief, "id"> & Partial<Brief>>({
      query: ({ id, ...patch }) => ({
        url: `briefs/${id}`,
        method: "PUT",
        body: patch,
      }),
    }),
    deleteBrief: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `briefs/${id}`,
          method: "DELETE",
        };
      },
    }), */
  }),
});

// Add some slowness to requests
const sleep = (time: number) => new Promise((res) => setTimeout(res, time));

export const {
  useGetBriefsQuery,
  useGetBriefQuery,
  useAddBriefMutation,
} = apiSlice;

// export const selectBriefResult = apiSlice.endpoints.getBriefs.select();

// const selectBriefData = createSelector(
//   selectBriefResult,
//   (briefsResult) => briefsResult.data
// );

// export const {
//   selectAll: selectAllBriefs,
//   selectById: selectBriefByProductId,
// } = briefsAdapter.getSelectors((state) => selectBriefData(state as any) ?? initialState as any)
