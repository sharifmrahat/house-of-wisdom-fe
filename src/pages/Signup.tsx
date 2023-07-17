import SignupForm from "@/components/common/SignupForm";
import libraryImage from "@/assets/images/libraryBuilding.jpg";

import { Link, useNavigate } from "react-router-dom";
import {
  useLoginUserMutation,
  useSignupUserMutation,
} from "@/redux/features/users/userApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/users/userSlice";
const Signup = () => {
  const [inputData, setInputData] = useState<{
    name: string;
    email: string;
    password: string;
  }>({ name: "", email: "", password: "" });
  const [signup, { data, isLoading, error, isSuccess }] =
    useSignupUserMutation();
  const [
    login,
    {
      data: loginResult,
      isSuccess: loginSuccess,
      isLoading: loginIsLoading,
      error: loginError,
    },
  ] = useLoginUserMutation();

  const handleSignupSubmit = (data: any) => {
    if (data) {
      setInputData(data);
      signup(data);
    }
  };
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      login({ email: inputData.email, password: inputData.password });
    }
    if (error || loginError) {
      toast.error((error as any)?.data?.message);
    }
    if (isSuccess && loginSuccess) {
      toast.success("Signup Success");
      localStorage.setItem("accessToken", loginResult?.data?.accessToken);
      localStorage.setItem("loggedIn", "true");
      dispatch(setUser(data?.data));
      navigate("/");
    }
  }, [isSuccess, error, loginSuccess]);

  return (
    <div className="flex flex-row justify-center items-center h-screen gap-10 overflow-hidden">
      <div className="w-1/2">
        <img
          src={libraryImage}
          className="h-screen w-full object-cover"
          alt=""
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center h-full">
        <section className="pb-10">
          {/* <div>Logo</div> */}
          <Link
            to="/"
            className="text-xl lg:text-3xl font-semibold font-heading cursor-pointer text-primary_dark"
          >
            House of Wisdom
          </Link>
        </section>
        <section className="mb-10">
          <div className="bg-primary_light p-6 rounded-md">
            <SignupForm
              isLoading={isLoading || loginIsLoading}
              onSubmit={handleSignupSubmit}
            />
            <p className="text-center mt-5 text-sm text-slate-700">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary_dark underline focus:outline-none ml-2"
              >
                Login
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signup;
