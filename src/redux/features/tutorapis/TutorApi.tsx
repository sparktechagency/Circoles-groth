import { api } from "../../baseApi";

export const TutorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    tutorstatics: builder.query({
      query: (filter = "all") => `/tutor/dashboard?filter=${filter}`,

    }),

    upcommingseassions: builder.query({
      query: () => `/tutor/upcoming-session`,
      providesTags: ["upcommingseassions"],
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


    mytutor: builder.query({
      query: () => `/student/my-tutor`,
    }),

    studentUpcommingseassions: builder.query({
      query: () => `/student/upcoming-session`,
    }),

    // --- ADD THIS NEW MUTATION ---
    updateSessionZoomLink: builder.mutation({
      query: (formData) => ({
        url: `/tutor/update-link`, // Example API endpoint
        method: "PUT", // Or PUT, depending on your API design
        body: formData,
      }),
      // This will automatically refresh the upcoming sessions data after a successful update
      invalidatesTags: ["upcommingseassions"],
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
  useStoretutorpaymentMutation,
  useMytutorQuery,
  useStudentUpcommingseassionsQuery,

  useUpdateSessionZoomLinkMutation
} = TutorApi;
