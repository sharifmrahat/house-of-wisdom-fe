import { useGetFilteredBooksQuery } from "@/redux/features/books/bookApi";
import { IBook } from "@/types/book";
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
import { BookOpenIcon } from "@heroicons/react/24/outline";

type AllBooksProps = {
  heading: string;
  allBooks: IBook[];
};

const AllBooks = ({ heading, allBooks }: AllBooksProps) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const { data, isLoading, error } = useGetFilteredBooksQuery({
    query: { genre: selectedGenre, publishedYear: selectedYear },
  });

  const genreArray = Array.from(
    new Set(allBooks?.map((book: IBook) => book.genre))
  );
  genreArray.unshift("All Genre");

  const yearArray = Array.from(
    new Set(
      allBooks?.map((book: IBook) =>
        format(new Date(book.publishedDate), "yyyy")
      )
    )
  );
  yearArray.sort((a, b) => Number(a) - Number(b));
  yearArray?.unshift("All Year");

  const handleGenreChange = (event: any) => {
    if (event === "All Genre") {
      setSelectedGenre("");
    } else {
      setSelectedGenre(event);
    }
  };

  const handleYearChange = (event: any) => {
    if (event === "All Year") {
      setSelectedYear("");
    } else {
      setSelectedYear(event);
    }
  };
  return (
    <>
      <div className="mx-auto lg:max-w-7xl  bg-white dark:bg-slate-700">
        <div className="flex flex-row justify-between items-center py-10">
          <h2 className="text-xl lg:text-2xl font-bold">{heading}</h2>
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
                    {genreArray?.map((genre, i: number) => (
                      <SelectItem key={i} value={genre as string}>
                        {genre as string}
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
                    {yearArray?.map((year, i: number) => (
                      <SelectItem key={i} value={year as string}>
                        {year as string}
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
        {!data?.data.length && (
          <div>
            <Alert className="w-fit mx-auto">
              <BookOpenIcon className="h-4 w-4" />
              <AlertTitle>No Books Found!</AlertTitle>
            </Alert>
          </div>
        )}
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

export default AllBooks;
