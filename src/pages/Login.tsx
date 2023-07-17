import LoginForm from "@/components/common/LoginForm";
import { Link } from "react-router-dom";
import libraryImage from "@/assets/images/libraryBuilding.jpg";

const Login = () => {
  const handleLoginSubmit = (data: any) => {
    console.log("Login:", data);
  };

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
            <LoginForm onSubmit={handleLoginSubmit} />
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
