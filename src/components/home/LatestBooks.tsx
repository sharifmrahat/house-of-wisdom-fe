import { useGetBooksQuery } from "@/redux/features/books/bookApi";

import AllBooks from "../common/AllBooks";

const LatestBooks = () => {
  const { data: allBooks } = useGetBooksQuery(
    { limit: 10 },
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 30000,
    }
  );
  return (
    <>
      <AllBooks
        heading="Latest Published Books"
        allBooks={allBooks?.data}
      ></AllBooks>
    </>
  );
};

export default LatestBooks;
