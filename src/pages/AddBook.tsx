import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddBookMutation } from "@/redux/features/books/bookApi";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AddBook = () => {
  const [addBook, { isSuccess, isLoading, error }] = useAddBookMutation();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (input: any) => {
    const data = {
      title: input.title,
      author: input.author,
      genre: input.genre,
      imageUrl: input.image,
      price: Number(input.price),
      publishedDate: input.selectedDate,
    };
    if (data) {
      addBook(data);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Books successfully added");
      navigate("/books");
    }
    if (error) {
      toast.error((error as any)?.data?.message);
    }
  }, [isSuccess, error]);

  return (
    <div className="w-fit mx-auto my-12">
      <div className="bg-primary_light p-6 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label className="block mb-2 text-gray-800" htmlFor="name">
              Title
            </Label>
            <Input
              type="text"
              id="title"
              placeholder="Book Title"
              {...register("title", { required: true })}
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:none text-primary_dark"
            />
            {errors.title && <p className="text-red-700">Title is required</p>}
          </div>

          <div className="mb-4">
            <Label className="block mb-2 text-gray-800" htmlFor="email">
              Author
            </Label>
            <Input
              type="text"
              id="author"
              placeholder="Book Author Name"
              {...register("author", { required: true })}
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:none text-primary_dark"
            />
            {errors.author && (
              <p className="text-red-700">Author is required</p>
            )}
          </div>

          <div className="mb-4">
            <Label className="block mb-2 text-gray-800" htmlFor="email">
              Genre
            </Label>
            <Input
              type="text"
              id="genre"
              placeholder="Book Genre"
              {...register("genre", { required: true })}
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:none text-primary_dark"
            />
            {errors.genre && <p className="text-red-700">Genre is required</p>}
          </div>
          <div className="mb-4">
            <Label className="block mb-2 text-gray-800" htmlFor="email">
              Image URL
            </Label>
            <Input
              type="text"
              id="image"
              placeholder="Book Image"
              {...register("image", { required: false })}
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:none text-primary_dark"
            />
            {/* {errors.image && <p className="text-red-700">Image is required</p>} */}
          </div>
          <div className="mb-4">
            <Label className="block mb-2 text-gray-800" htmlFor="email">
              Price
            </Label>
            <Input
              type="number"
              id="price"
              placeholder="Book Price"
              {...register("price", { required: true })}
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:none text-primary_dark"
            />
            {errors.price && <p className="text-red-700">Price is required</p>}
          </div>
          <div className="mb-4">
            <Label className="block mb-2 text-gray-800" htmlFor="email">
              Published Date
            </Label>
            <Controller
              name="selectedDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => setValue("selectedDate", date)}
                />
              )}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-primary_light bg-primary_dark hover:bg-primary_dark/90 rounded-md"
          >
            {isLoading ? "Loading..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
