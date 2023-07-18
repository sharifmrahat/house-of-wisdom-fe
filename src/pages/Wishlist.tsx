import AllBooks from "@/components/common/AllBooks";
import { useGetBooksQuery } from "@/redux/features/books/bookApi";

const Wishlist = () => {
  const { data: allBooks } = useGetBooksQuery({});
  return (
    <section>
      <AllBooks heading="Wishlist" allBooks={allBooks?.data}></AllBooks>
    </section>
  );
};

export default Wishlist;
