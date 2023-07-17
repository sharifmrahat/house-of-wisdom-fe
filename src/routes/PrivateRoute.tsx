import Spinner from "@/components/common/Spinner";
import { useAppSelector } from "@/redux/hook";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { user, isLoading } = useAppSelector((state) => state.user);

  const { pathname } = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen mx-auto my-20 flex flex-col justify-center items-center gap-4">
        <Spinner></Spinner>
        <p className="text-xl font-semibold text-primary_dark text-center">
          loading...
        </p>
      </div>
    );
  }

  if (!user.email && !isLoading) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
}
