import { useGetBooksQuery } from "@/redux/features/books/bookApi";
import { IBook } from "@/types/boook";
import Spinner from "../common/Spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import BookCard from "../common/BookCard";

const LatestBooks = () => {
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  return (
    <>
      <div className="mx-auto py-12  max-w-2xl lg:max-w-7xl  bg-white dark:bg-slate-700">
        <h2 className="text-xl lg:text-2xl font-bold pb-10">
          Latest Published Books
        </h2>
        {isLoading && (
          <div className="w-fit mx-auto my-10 flex flex-col justify-center items-center gap-4">
            <Spinner></Spinner>
            <p className="text-xl font-semibold text-primary_dark text-center">
              Books are loading...
            </p>
          </div>
        )}
        <div className="grid gap-20 lg:gap-16 md:grid-cols-2 lg:grid-cols-5 mx-5 lg:mx-0">
          {data?.success &&
            data?.data?.map((book: IBook) => <BookCard book={book} />)}
        </div>
        {!isLoading && error && (
          <Alert className="w-fit mx-auto" variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Internal Server Error</AlertTitle>
            <AlertDescription>{(error as any).data.message}</AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
};

export default LatestBooks;
