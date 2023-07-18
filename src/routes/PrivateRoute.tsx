import Spinner from "@/components/common/Spinner";
import { useAppSelector } from "@/redux/hook";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { isLoading, loggedIn } = useAppSelector((state) => state.user);

  const { pathname } = useLocation();

  if (loggedIn) {
    if (isLoading) {
      return (
        <div className="h-screen mx-auto my-20 flex flex-col justify-center items-center gap-4">
          <Spinner></Spinner>
          <p className="text-xl font-semibold text-primary_dark text-center">
            loading...
          </p>
        </div>
      );
    } else {
      return children;
    }
  } else {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }
}
