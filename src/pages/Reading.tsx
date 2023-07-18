import AllBooks from "@/components/common/AllBooks";
import { useGetBooksQuery } from "@/redux/features/books/bookApi";

const Reading = () => {
  const { data: allBooks } = useGetBooksQuery({});
  return (
    <section>
      <AllBooks heading="Reading" allBooks={allBooks?.data}></AllBooks>
    </section>
  );
};

export default Reading;
