import { api } from "../../baseApi";

export const AdminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    statics: builder.query({
      query: (filter = "all") => `/admin/dashboard?filter=${filter}`,
      // providesTags: ["dashboard"],
    }),
    earning: builder.query({
      query: (filter = "monthly") => `/admin/total-earning-graph?filter=${filter}`,
      // providesTags: ["earning"],
    }),
    userManagement: builder.query({
      query: ({ per_page = 10, page = 1, search = "" }) =>
        `/admin/users/all?page=${page}&per_page=${per_page}&search=${search}`,
      providesTags: ["user"],
    }),
    deleteuser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/destroy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),


    verification: builder.query({
      query: ({ per_page = 10, page = 1, search = "" }) =>
        `/admin/tutor/verify-info?page=${page}&per_page=${per_page}&search=${search}`,
      providesTags: ["verifyuser"],

    }),

    deleteVerifyuser: builder.mutation({
      query: (id) => ({
        url: `/admin/tutor/verify-info/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["verifyuser"],
    }),

    transection: builder.query({
      query: ({ per_page = 10, page = 1 }) =>
        `/admin/transactions?page=${page}&per_page=${per_page}`,
      providesTags: ["transaction"],
    }),

    getAllCategory: builder.query({
      query: () =>
        `/admin/category`,
      providesTags: ["category"],
    }),

    createACourse: builder.mutation({
      query: (formdata) => ({
        url: `/admin/course/store`,
        method: "POST",
        body: formdata,

      }),

      invalidatesTags: ["course"],
    }),
    manageallCourse: builder.query({
      query: ({ per_page = 10, page = 1, search, sort, rating }) =>
        `/admin/course?per_page=${per_page}&page=${page}&search_by_title=${search}&sort_by=${sort}&rating=${rating}`,
      providesTags: ["course"],
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/admin/course/destroy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["course"],
    }),



    // COURSE_CURRICULAM SECTION ADD/EDIT/DELETE -------------------------------------------------------------------


    //  SECTION
    createAsection: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/course/curriculum/store/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["section"],
    }),

    updateAsection: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/course/curriculum/update/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["section"],
    }),

    deleteAsection: builder.mutation({
      query: (id) => ({
        url: `/admin/course/curriculum/destroy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["section"],
    }),

    //  SECTION END




    //  LECTURE HANDLERS
    createAlecture: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/course/lecture/store/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["lecture"],
    }),

    updateAlecture: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/course/lecture/update/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["lecture"],
    }),

    deleteAlecture: builder.mutation({
      query: (id) => ({
        url: `/admin/course/lecture/destroy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["lecture"],
    }),

    // LECTURE END

  }),
});

export const {
  useStaticsQuery,
  useEarningQuery,
  useUserManagementQuery,
  useDeleteuserMutation,
  useVerificationQuery,
  useDeleteVerifyuserMutation,
  useTransectionQuery,
  useGetAllCategoryQuery,
  useCreateACourseMutation,
  useManageallCourseQuery,
  useDeleteCourseMutation,
  useCreateAsectionMutation,
  useCreateAlectureMutation,
  useDeleteAsectionMutation,
  useDeleteAlectureMutation,
  useUpdateAsectionMutation,
  useUpdateAlectureMutation,

} = AdminApi;
