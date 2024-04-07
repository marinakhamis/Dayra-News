import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const wrapperAPI = createApi({
    reducerPath: "wrapperApi",
    tagTypes: [
        "News"
    ],
    baseQuery: fetchBaseQuery({
        mode: "cors",
        baseUrl
    }),
    endpoints: () => ({}),
})