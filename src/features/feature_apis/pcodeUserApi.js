import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { apiConfig } from "../../config/api/api-config";

// Create a base query using the API configuration
const baseQuery = fetchBaseQuery(apiConfig)

export const pcodeUserApi = createApi({
    reducerPath: "pcodeUserApi",
    baseQuery,
    endpoints: (builder) => ({
        postPcode: builder.mutation({
            query: (data) => ({
                url: "/user/postcode/filter",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {usePostPcodeMutation} = pcodeUserApi;
  