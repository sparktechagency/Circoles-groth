import { api } from "../../baseApi";

export const TutorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    tutorstatics: builder.query({
      query: (filter = "all") => `/tutor/dashboard?filter=${filter}`,

    }),



  }),
});

export const {
  useTutorstaticsQuery,

} = TutorApi;
