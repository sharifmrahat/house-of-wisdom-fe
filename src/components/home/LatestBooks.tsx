import {
  useGetBooksQuery,
  useGetFilteredBooksQuery,
} from "@/redux/features/books/bookApi";
import { IBook, IGenre } from "@/types/book";
import Spinner from "../common/Spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import BookCard from "../common/BookCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { format } from "date-fns";

const LatestBooks = () => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const { data, isLoading, error } = useGetFilteredBooksQuery({
    query: { genre: selectedGenre, publishedYear: selectedYear },
  });

  const { data: allBooks } = useGetBooksQuery({});
  let genreArray: IGenre[] = [
    "All Genre",
    "Self Development",
    "Religious",
    "Programming",
  ];

  // const yearArray = allBooks?.data.map((book: IBook) => book.publishedDate);
  // yearArray.push;

  const handleGenreChange = (event: any) => {
    if (event === "All Genre") {
      setSelectedGenre("");
    } else {
      setSelectedGenre(event);
    }
  };

  const handleYearChange = (event: any) => {
    setSelectedYear(event);
  };
  return (
    <>
      <div className="mx-auto py-12  max-w-2xl lg:max-w-7xl  bg-white dark:bg-slate-700">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl lg:text-2xl font-bold pb-10">
            Latest Published Books
          </h2>
          <div className="flex gap-2 items-center">
            <div>
              <Select
                onValueChange={handleGenreChange}
                defaultValue="All Genre"
              >
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="All Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Genre</SelectLabel>
                    {genreArray.map((genre, i) => (
                      <SelectItem key={i} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select onValueChange={handleYearChange}>
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Published Year</SelectLabel>
                    {allBooks?.data?.map((book: IBook) => (
                      <SelectItem
                        key={book._id}
                        value={format(new Date(book.publishedDate), "yyyy")}
                      >
                        {format(new Date(book.publishedDate), "yyyy")}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
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
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{(error as any)?.data?.message}</AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
};

export default LatestBooks;
