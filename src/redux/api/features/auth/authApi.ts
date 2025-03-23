import { baseApi } from "../../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (data) => {
        console.log("Data in redux: ", data);
        return {
          url: "/auth/register",
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
    updatePasswordAfterOTP: builder.mutation({
      query: (data) => {
        return {
          url: `/forget-password/update-password-after-otp`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useUpdatePasswordAfterOTPMutation,
} = authApi;
