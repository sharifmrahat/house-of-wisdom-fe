import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddReviewMutation } from "@/redux/features/books/bookApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type AddReviewProps = {
  bookId: string;
};

const AddReview = ({ bookId }: AddReviewProps) => {
  const { register, handleSubmit } = useForm();
  const [submitReview, { isLoading, isSuccess, error }] =
    useAddReviewMutation();

  const onSubmit = (input: any) => {
    const option = {
      id: bookId,
      data: input,
    };
    console.log(option);
    if (option) {
      submitReview(option);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Review successfully added");
      navigate(`/books/${bookId}`);
    }
    if (error) {
      toast.error((error as any)?.data?.message);
    }
  }, [isSuccess, error]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Label className="block mb-2 text-gray-800" htmlFor="email">
          Write Review
        </Label>
        <Textarea
          placeholder="Description"
          id="description"
          {...register("description", { required: false })}
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:none text-primary_dark"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 text-primary_light bg-primary_dark hover:bg-primary_dark/90 rounded-md"
      >
        {isLoading ? "Loading..." : "Submit Review"}
      </button>
    </form>
  );
};

export default AddReview;
