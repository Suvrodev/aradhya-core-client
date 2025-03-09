export type TStudent = {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: "user" | "admin";
  isBlocked: boolean;
  studentId: string;
  phone: string;
  gender: string;
  ageRange: string;
  deviceType: string;
  internetType: string;
  areaType: string;
  presentAddress: string;
  permanentAddress: string;
  currentEducation: string;
  educationInstitute: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  whatsappNumber: string;
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
  title: string;
  motto: string;
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

export type TBatch = {
  batchId: string;
  batchName: string;
  batchStatus: string;
  start: string;
  end?: string;
};

export type TCategory = {
  _id: string;
  name: string;
  order: number;
  serviceId: string;
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

export type TCurriculum = {
  _id: string;
  title: string;
  courseId: string;
  order: number;
};

export type TPromoCode = {
  promoId: string;
  promoCode: string;
  promoPercent: number;
  promoStatus: string;
};
