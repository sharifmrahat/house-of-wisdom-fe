import AllBooks from "@/components/common/AllBooks";
import { useGetBooksQuery } from "@/redux/features/books/bookApi";

const Finished = () => {
  const { data: allBooks } = useGetBooksQuery({});
  return (
    <section>
      <AllBooks heading="Reading" allBooks={allBooks?.data}></AllBooks>
    </section>
  );
};

export default Finished;
