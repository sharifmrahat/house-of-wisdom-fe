import AllBooks from "@/components/common/AllBooks";
import { useAppSelector } from "@/redux/hook";
import { IBook } from "@/types/book";

const Wishlist = () => {
  const { user: currentUser } = useAppSelector((state) => state.user);

  const allBooks = currentUser?.bookmark?.map(
    (userBook) => userBook?.status === "Wishlist" && userBook?.book
  );
  return (
    <section>
      {allBooks?.length && (
        <AllBooks heading="Wishlist" allBooks={allBooks as IBook[]}></AllBooks>
      )}
    </section>
  );
};

export default Wishlist;
