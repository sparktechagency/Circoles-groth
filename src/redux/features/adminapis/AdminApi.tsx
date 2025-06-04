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


  }),
});

export const {
  useStaticsQuery,
  useEarningQuery,
  useUserManagementQuery,
  useDeleteuserMutation,
  useVerificationQuery,
  useDeleteVerifyuserMutation,
  useTransectionQuery
} = AdminApi;
