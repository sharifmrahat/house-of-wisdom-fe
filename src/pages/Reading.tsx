import AllBooks from "@/components/common/AllBooks";

import { useAppSelector } from "@/redux/hook";
import { IBook } from "@/types/book";

const Reading = () => {
  const { user: currentUser } = useAppSelector((state) => state.user);
  const allBooks = currentUser?.bookmark?.map(
    (userBook) => userBook?.status === "Reading" && userBook.book
  );
  return (
    <section>
      <section>
        {allBooks?.length && (
          <AllBooks heading="Reading" allBooks={allBooks as IBook[]}></AllBooks>
        )}
      </section>
    </section>
  );
};

export default Reading;
