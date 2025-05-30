import { api } from "../baseApi";

const CourseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourse: builder.query({
      query: ({ per_page = 10, page = 1 }) =>
        `courses?per_page=${per_page}&page=${page}`,
    }),

    getcategorys: builder.query({
      query: () => `/categories`,
    }),
  }),
});

export const { useGetAllCourseQuery, useGetcategorysQuery } = CourseApi;
