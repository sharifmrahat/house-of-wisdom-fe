import SignupForm from "@/components/common/SignupForm";
import libraryImage from "@/assets/images/libraryBuilding.jpg";

import { Link } from "react-router-dom";
const Signup = () => {
  const handleSignupSubmit = (data: any) => {
    console.log("Signup:", data);
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
            <SignupForm onSubmit={handleSignupSubmit} />
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
