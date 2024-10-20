import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { apiConfig } from "../../config/api/api-config";

// Create a base query using the API configuration
const baseQuery = fetchBaseQuery(apiConfig)

export const reportApi = createApi({
    reducerPath: "reportApi",
    baseQuery,
    endpoints: (builder) => ({
    postReportList: builder.mutation({
        query: ({data,page,limit}) => ({
        url: `/user/report/filter?page=${page}&limit=${limit}`,
        method: "POST",
        body: data,
        }),
      }),
    postReport: builder.mutation({
            query: (data) => ({
              url: "/user/report",
              method: "POST",
              body: data,
            }),
          }),
    }),
  });
  export const {usePostReportListMutation,usePostReportMutation} = reportApi;