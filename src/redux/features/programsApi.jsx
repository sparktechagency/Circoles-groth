import { api } from "../baseApi";

const programsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getallprograms: builder.query({
      query: ({ per_page = 10, page = 1 }) =>
        `/all-programs?per_page=${per_page}&page=${page}`,
    }),
  }),
});

export const { useGetallprogramsQuery } = programsApi;
