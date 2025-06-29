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
      providesTags: ["course", "section", "lecture"],
    }),
    getinstrucotorDetials: builder.query({
      query: (id) => `/student/tutor/profile/${id}`,
    }),

    getAllCourseByCategory: builder.query({
      query: ({ per_page = 10, page = 1, id }) =>
        `/admin/course/?per_page=${per_page}&page=${page}&category_id=${id}`,
    }),

    getAvarageRating: builder.query({
      query: ({ per_page = 10, page = 1, id }) =>
        `/student/tutor/average-rating/${id}?page=${page}&per_page=${per_page}`,
    }),

    purchaseCourse: builder.mutation({
      query: ({ body = {} }) => ({
        url: `/student/course-booking`,
        method: "POST",
        body,
      }),
    }),

    storepayment: builder.mutation({
      query: ({ body = {} }) => ({
        url: `/student/course-payment/callback`,
        method: "POST",
        body,
      }),
    }),

    search: builder.query({
      query: ({ search, category_id, type, subject_id }) => {
        let url = `/search/?`;

        if (search) url += `search=${search}&`;
        if (category_id) url += `category_id=${category_id}&`;
        if (type) url += `type=${type}&`;

        // ✅ Format array as JSON-like string
        if (Array.isArray(subject_id)) {
          url += `subject_id=[${subject_id.join(",")}]`;
        } else if (subject_id) {
          url += `subject_id=[${subject_id}]`;
        }

        return url;
      },
    }),

    // getStatistics: builder.query({
    //   query: (filter = "all") => ({
    //     url: `/admin/dashboard?filter=${filter}`,
    //     method: "GET",
    //   }),
    // }),
  }),
});

export const {
  useGetAllCourseQuery,
  useGetcategorysQuery,
  useGetCourseDetailsQuery,
  useGetinstrucotorDetialsQuery,
  useGetAllCourseByCategoryQuery,
  useGetallOnlineProgamsQuery,
  useGetAvarageRatingQuery,
  usePurchaseCourseMutation,
  useStorepaymentMutation,
  useSearchQuery,
} = CourseApi;
