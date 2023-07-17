import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const SignupForm: React.FC<{ onSubmit: SubmitHandler<FieldValues> }> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Label className="block mb-2 text-gray-800" htmlFor="name">
          Name
        </Label>
        <Input
          type="text"
          id="name"
          placeholder="Sharif Rahat"
          {...register("name", { required: true })}
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:none text-primary_dark"
        />
        {errors.name && <p className="text-red-700">Name is required</p>}
      </div>

      <div className="mb-4">
        <Label className="block mb-2 text-gray-800" htmlFor="email">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="mail@sharifrahat.com"
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
          id="password"
          placeholder="************"
          {...register("password", { required: true })}
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:none text-primary_dark"
        />
        {errors.password && (
          <p className="text-red-700">Password is required</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-primary_light bg-primary_dark hover:bg-primary_dark/90 rounded-md"
      >
        Signup
      </button>
    </form>
  );
};

export default SignupForm;
