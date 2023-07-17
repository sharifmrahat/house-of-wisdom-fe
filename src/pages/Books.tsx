import AllBooks from "@/components/common/AllBooks";
import { useGetBooksQuery } from "@/redux/features/books/bookApi";

const Books = () => {
  const { data: allBooks } = useGetBooksQuery({});
  return (
    <>
      <section>
        <AllBooks heading="All Books" allBooks={allBooks?.data}></AllBooks>
      </section>
    </>
  );
};

export default Books;
