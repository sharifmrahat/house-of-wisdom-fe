import { IBook } from "@/types/book";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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

const initialState = {
  user: {} as Partial<IUser>,
  token: "",
  loggedIn: "",
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<IUser>>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    handleLogout: (state) => {
      state.user = {};
      state.token = "";
      state.loggedIn = "";
    },
  },
});

export const { setUser, setLoading, handleLogout } = userSlice.actions;

export default userSlice.reducer;
