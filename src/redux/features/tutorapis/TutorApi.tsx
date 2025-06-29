import { api } from "../../baseApi";

export const TutorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    tutorstatics: builder.query({
      query: (filter = "all") => `/tutor/dashboard?filter=${filter}`,

    }),

    upcommingseassions: builder.query({
      query: () => `/tutor/upcoming-session`,
    }),

    getsubjects: builder.query({
      query: () => `/admin/subject`,
    }),

    tutorProfileSetup: builder.mutation({
      query: (formData) => ({
        url: "/tutor/update-profile",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),

    tutorVerify: builder.mutation({
      query: (formDataToSend) => ({
        url: "/tutor/verify-tutor-info",
        method: "POST",
        body: formDataToSend,
      }),
      invalidatesTags: ["user"],
    }),

    bookAtutor: builder.mutation({
      query: (formData) => ({
        url: "/student/book-tutor",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),


    storetutorpayment: builder.mutation({
      query: ({ body = {} }) => ({
        url: `/student/book-tutor/callback`,
        method: "POST",
        body,
      }),
    }),



  }),
});

export const {
  useTutorstaticsQuery,
  useUpcommingseassionsQuery,
  useGetsubjectsQuery,
  useTutorProfileSetupMutation,
  useTutorVerifyMutation,
  useBookAtutorMutation,
  useStoretutorpaymentMutation
} = TutorApi;
