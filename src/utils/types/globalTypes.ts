export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isBlocked: boolean;
  iat: number;
  exp: number;
};

export type TBanner = {
  id: number;
  image: string;
};

export type TCategory = {
  id: string;
  name: string;
};
