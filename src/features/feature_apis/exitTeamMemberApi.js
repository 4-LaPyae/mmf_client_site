import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { apiConfig } from "../../config/api/api-config";

// Create a base query using the API configuration
const baseQuery = fetchBaseQuery(apiConfig);

export const exitTeamMemberApi = createApi({
    reducerPath: "exitTeamMemberApi",
    baseQuery,
    tagTypes: ["ExitTeamMembers"],
    endpoints: (builder) => ({
        getExitTeamMember: builder.query({
            query: () => ({
                url: "admin/exit-team-member/lists",
                method: "GET",
            }),
            providesTags: ["ExitTeamMembers"],
        }),
    }),
});
export const { useGetExitTeamMemberQuery } = exitTeamMemberApi;
