import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const LoginForm: React.FC<{
  onSubmit: SubmitHandler<FieldValues>;
  isLoading: boolean;
}> = ({ onSubmit, isLoading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Label className="block mb-2 text-gray-800" htmlFor="email">
          Email
        </Label>
        <Input
          type="email"
          placeholder="mail@sharifrahat.com"
          id="email"
          {...register("email", { required: true })}
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:none text-primary_dark"
        />
        {errors.email && <p className="text-red-700">Email is required</p>}
      </div>

      <div className="mb-4">
        <Label className="block mb-2 text-gray-800" htmlFor="password">
          Password
        </Label>
        <Input
          type="password"
          placeholder="************"
          id="password"
          {...register("password", { required: true })}
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:none text-primary_dark"
        />
        {errors.password && (
          <p className="text-red-700">Password is required</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 text-primary_light bg-primary_dark hover:bg-primary_dark/90 rounded-md"
      >
        {isLoading ? "Loading..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
