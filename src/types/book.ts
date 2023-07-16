export type IReview = {
  user: string;
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

export type IGenre =
  | "All Genre"
  | "Self Development"
  | "Religious"
  | "Programming";
