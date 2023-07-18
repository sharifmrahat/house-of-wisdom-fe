import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Books from "@/pages/Books";
import BookDetails from "@/pages/BookDetails";
import PrivateRoute from "./PrivateRoute";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import AddBook from "@/pages/AddBook";
import Wishlist from "@/pages/Wishlist";
import Reading from "@/pages/Reading";
import Finished from "@/pages/Finished";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/books/:id",
        element: <BookDetails />,
      },
      {
        path: "/addBook",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "/reading",
        element: (
          <PrivateRoute>
            <Reading />
          </PrivateRoute>
        ),
      },
      {
        path: "/finished",
        element: (
          <PrivateRoute>
            <Finished />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />,
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
