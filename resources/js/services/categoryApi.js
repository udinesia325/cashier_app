import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: route("api.category") }),
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => "",
        }),
    }),
});

export const { useGetCategoryQuery } = categoryApi;
