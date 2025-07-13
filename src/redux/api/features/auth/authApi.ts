import { baseApi } from "../../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    googleRegistration: builder.mutation({
      query: (data) => {
        return {
          url: "/google-auth/register",
          method: "POST",
          body: data,
        };
      },
    }),
    registration: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/register",
          method: "POST",
          body: data,
        };
      },
    }),

    instructorRegistration: builder.mutation({
      query: (data) => {
        return {
          url: "/i-auth/register",
          method: "POST",
          body: data,
        };
      },
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    instructorLogin: builder.mutation({
      query: (userInfo) => ({
        url: "/i-login",
        method: "POST",
        body: userInfo,
      }),
    }),

    changePassword: builder.mutation({
      query: ({ id, userPassword }) => {
        console.log("id: ", id);
        console.log("User Password: ", userPassword);
        return {
          url: `/auth/updatepassword/${id}`,
          method: "PATCH",
          body: userPassword,
        };
      },
    }),
    forgetPassword: builder.mutation({
      query: (email) => {
        console.log("Email in rtK: ", email);
        return {
          url: `/forget-password`,
          method: "POST",
          body: email,
        };
      },
    }),
    forgetInstructorPassword: builder.mutation({
      query: (email) => {
        console.log("Email in rtK: ", email);
        return {
          url: `/forget-password-ins`,
          method: "POST",
          body: email,
        };
      },
    }),
    updatePasswordAfterOTP: builder.mutation({
      query: (data) => {
        return {
          url: `/forget-password/update-password-after-otp`,
          method: "POST",
          body: data,
        };
      },
    }),
    updateInstructorPasswordAfterOTP: builder.mutation({
      query: (data) => {
        return {
          url: `/forget-password-ins/update-password-after-otp`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGoogleRegistrationMutation,
  useRegistrationMutation,
  useInstructorRegistrationMutation,
  useLoginMutation,
  useInstructorLoginMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useForgetInstructorPasswordMutation,
  useUpdatePasswordAfterOTPMutation,
  useUpdateInstructorPasswordAfterOTPMutation,
} = authApi;
