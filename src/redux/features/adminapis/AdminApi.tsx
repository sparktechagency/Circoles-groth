import { api } from "../../baseApi";

export const AdminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    statics: builder.query({
      query: (filter = "all") => `/admin/dashboard?filter=${filter}`,
    }),
    earning: builder.query({
      query: (filter = "monthly") => `/admin/total-earning-graph?filter=${filter}`,
    }),
  }),
});

export const { useStaticsQuery, useEarningQuery } = AdminApi;
