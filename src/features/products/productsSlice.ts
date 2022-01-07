import { apiSlice } from "../../shared/api/api";

export interface Product {
  id: number;
  name: string;
}

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], number | void>({
      query: () => `/products`,
    }),
  }),
  overrideExisting: false,
});

// injectEndpoints to avoid duplicate slice

export const { useGetProductsQuery } = extendedApiSlice;
