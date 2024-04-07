import { wrapperAPI } from "../helper/wrapperApi";

export const NewsApi = wrapperAPI.injectEndpoints({
    reducerPath: "NewsApi",
    endpoints: (builder) => ({
        getNewsList: builder.query({
            providesTags: ["News"],
            query: (id) => `https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=33ba70d6367648b49a76910dfad62ad4`,
        })
    })
})

export const {
    useGetNewsListQuery,
} = NewsApi;
