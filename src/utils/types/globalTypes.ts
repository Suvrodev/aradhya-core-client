export type TStudent = {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: "user" | "admin" | "instructor";
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

export type TInstructor = {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: "instructor";
  isBlocked: boolean;
  instructorId: string;
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
  status: string;
};
export type TAssignedStudent = {
  _id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  batchId: string;
  coursePrice: number;
  courseDiscount: number;
  promoCodeStatus: string;
  promoCode: string;
  appliedpromoCode: string;
  promoPercent: number;
  finalPrice: number;
  paymentGateWay: string;
  transactionId: string;
  checkTransactionId: string;
  transactionMobileNumber: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TService = {
  _id: string;
  serviceId: string;
  name: string;
  image: string;
  order: number;
  serviceExists: string;
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
  pin: string;
};

export type TBatch = {
  batchId: string;
  batchName: string;
  underCourse: string;
  coursePrice: number;
  courseDiscount: number;
  start: string;
  end?: string;
  duration: string;
  classNumber: number;
  projectnumber: number;
  instructorId: string;
  instructorname: string;
  instructorimage: string;
  instructorfb: string;
  classdays: string;
  supportdays: string;
  batchStatus: string;
  batchNotice: string;
  schedule: { date: string; topic: string }[];
};

export type TCourseBox = {
  courseId: string;
  refServiceId: string;
  courseTitle: string;
  courseImage: string;
  courseDuration: string;
  courseClassNumber: number;
  courseProjectNumber: number;
  courseExists: string;
  courseDiscount: string;
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
  courseDiscount: number;
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
  courseExists: string;
  kikipaschen: string[]; // Included kikipaschen
  courseCurriculum: string[]; // Included courseCurriculum
  jobposition: string[]; // Included jobposition
  projects: string[]; // Included projects
  neededSoftware: { image: string; title: string }[]; // Included neededSoftware
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
