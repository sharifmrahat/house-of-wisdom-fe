import { IBook } from "./book";

export type IBookmark = {
  book: IBook;
  status: "Wishlist" | "Reading" | "Finished";
};

export type IUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  photoUrl: string;
  bookmark?: IBookmark[];
};
