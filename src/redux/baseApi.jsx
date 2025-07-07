import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Cookies from "js-cookie";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://137.59.180.219:8050/api",
    baseUrl: "http://103.186.20.110:7000/api",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Accept", `*/*`);

        headers.set("Access-Control-Allow-Origin", `*/*`);
      }
      return headers;
    },
  }),

  tagTypes: [
    "user",
    "blog",
    "faq",
    "about",
    "notification",
    "verifyuser",
    "transaction",
    "category",
    "course",
    "section",
    "lecture",
  ],

  endpoints: () => ({}),
});

// export const imageUrl = "http://137.59.180.219:8050";
export const imageUrl = "http://103.186.20.110:7000";
