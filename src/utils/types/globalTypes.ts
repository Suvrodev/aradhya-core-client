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
