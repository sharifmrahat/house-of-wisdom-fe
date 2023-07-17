import { IUser } from "./user";

export type IReview = {
  user: IUser;
  description: string;
};

export type IBook = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  imageUrl?: string;
  publishedDate: Date;
  publisher: string;
  reviews?: IReview[];
};
