import { api } from "../baseApi";

const CourseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourse: builder.query({
      query: ({ per_page = 10, page = 1 }) =>
        `courses?per_page=${per_page}&page=${page}`,
    }),
    getallOnlineProgams: builder.query({
      query: ({ per_page = 10, page = 1, search }) =>
        `/admin/course?per_page=${per_page}&page=${page}&search_by_title=${search}`,
    }),

    getcategorys: builder.query({
      query: () => `/categories`,
    }),

    getCourseDetails: builder.query({
      query: (id) => `/admin/course/show/${id}`,
    }),
    getinstrucotorDetials: builder.query({
      query: (id) => `/student/tutor/profile/${id}`,
    }),

    getAllCourseByCategory: builder.query({
      query: ({ per_page = 10, page = 1, id }) =>
        `/admin/course/?per_page=${per_page}&page=${page}&category_id=${id}`,
    }),
  }),
});

export const {
  useGetAllCourseQuery,
  useGetcategorysQuery,
  useGetCourseDetailsQuery,
  useGetinstrucotorDetialsQuery,
  useGetAllCourseByCategoryQuery,
  useGetallOnlineProgamsQuery,
} = CourseApi;
