import { api } from "../baseApi";

const tutorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    topRatedTutors: builder.query({
      query: ({ per_page = 10, page = 1 }) =>
        `/top-rated-tutors?per_page=${per_page}&page=${page}`,
    }),

    // getTutorDetailsById: builder.query({
    //   query: (id) => `/student/tutor/profile/${id}`,
    // }),
  }),
});

export const { useTopRatedTutorsQuery } = tutorApi;
