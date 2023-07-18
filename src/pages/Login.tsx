import LoginForm from "@/components/common/LoginForm";
import { Link, useNavigate } from "react-router-dom";
import libraryImage from "@/assets/images/libraryBuilding.jpg";
import { useLoginUserMutation } from "@/redux/features/users/userApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "@/redux/features/users/userSlice";

const Login = () => {
  const [login, { data: loginResult, isSuccess, isLoading, error }] =
    useLoginUserMutation();

  const handleLoginSubmit = (data: any) => {
    if (data) {
      login(data);
    }
  };
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("accessToken", loginResult?.data?.accessToken);
      localStorage.setItem("loggedIn", "true");
      dispatch(setUser(loginResult?.data?.user));
      dispatch(setLoading(false));
      toast.success("Login Success");
      navigate("/");
      // refetch();
    }
    // console.log(loginResult?.success, myProfile?.data);
    // if (loginResult?.success && myProfile?.success) {
    //   toast.success("Login Success");
    //   navigate("/");
    // }
    if (error) {
      toast.error((error as any)?.data?.message);
    }
  }, [isSuccess, error, isSuccess, loginResult]);

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
            <LoginForm onSubmit={handleLoginSubmit} isLoading={isLoading} />
            <p className="text-center mt-5 text-sm text-slate-700">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary_dark underline focus:outline-none ml-2"
              >
                Signup
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
