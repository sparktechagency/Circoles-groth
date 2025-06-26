import { api } from "../../baseApi";

export const TutorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    tutorstatics: builder.query({
      query: (filter = "all") => `/tutor/dashboard?filter=${filter}`,

    }),

    upcommingseassions: builder.query({
      query: () => `/tutor/upcoming-session`,
    }),

  }),
});

export const {
  useTutorstaticsQuery,
  useUpcommingseassionsQuery
} = TutorApi;
