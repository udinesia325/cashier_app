import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: route("api.products") }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (search = "",page = 1, perPage=20) => `?page=${page}&search=${search}&perPage=${perPage}`,
        }),
    }),
});

export const { useGetProductsQuery } = productApi;
