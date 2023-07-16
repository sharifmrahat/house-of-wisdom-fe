import { useGetBooksQuery } from "@/redux/features/books/bookApi";
import { useAppSelector } from "@/redux/hook";

const Books = () => {
  const { data, isLoading, error } = useGetBooksQuery(undefined);

  console.log(data);
  // const { priceRange, status } = useAppSelector((state) => state.books);
  return <div>Books Page</div>;
};

export default Books;
