export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isBlocked: boolean;
  iat: number;
  exp: number;
};

export type TService = {
  _id: string;
  serviceId: string;
  name: string;
  image: string;
  order: number;
};

export type TBanner = {
  id: number;
  image: string;
};

export type TBlog = {
  _id: string;
  title: string;
  content: string;
  image: string;
  writer: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TCategory = {
  id: string;
  name: string;
};

export type TCourseBox = {
  _id: string;
  courseId: string;
  courseTitle: string;
  courseImage: string;
  courseClassNumber: number;
  courseProjectNumber: number;
};
export type TCourse = {
  _id: string;
  refService: string;
  refServiceId: string;
  courseId: string;
  courseTitle: string;
  courseImage: string;
  courseDescription: string;
  coursePrice: number;
  courseDiscount?: number;
  courseDiscountReason?: string;
  courseCoupon?: string;
  courseCouponStatus?: boolean;
  courseYoutubeVideo?: string;
  courseClassNumber: number;
  courseStartDate: string;
  courseDuration: string;
  courseProjectNumber: number;
  courseReview?: number;
  computerConfiguration: string;
  courseStatus: "onGoing" | "upComming";
  courseExists: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
