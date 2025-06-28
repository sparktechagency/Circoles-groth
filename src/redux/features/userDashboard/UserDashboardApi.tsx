import { api } from "../../baseApi";

export const UserDashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStudentStatus: builder.query({
      query: () => `/student/dashboard-states`,
    }),
    enrolledCourseProgress: builder.query({
      query: () => `/student/course-progress`,
    }),
    EnrolledCourses: builder.query({
      query: ({ per_page = 1, page = 1 }) => `/student/enrolled-courses?per_page=${per_page}&page=${page}`,
    }),
  }),
});

export const { useGetStudentStatusQuery, useEnrolledCourseProgressQuery, useEnrolledCoursesQuery } = UserDashboardApi;
