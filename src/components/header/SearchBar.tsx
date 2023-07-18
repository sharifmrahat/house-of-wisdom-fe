import { Command, CommandInput } from "@/components/ui/command";
import { useGetBooksQuery } from "@/redux/features/books/bookApi";
import { IBook } from "@/types/book";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleResult, setVisibleResult] = useState(false);
  const wrapperRef = useRef(null);
  const { data, isLoading, error } = useGetBooksQuery({
    query: "searchTerm",
    value: searchQuery,
  });

  const handleOnChange = (e: any) => {
    setSearchQuery(e.target.value);
    setVisibleResult(true);
  };

  useEffect(() => {
    const handleDocumentClick = (event: any) => {
      if (
        wrapperRef.current &&
        !(wrapperRef.current as any).contains(event.target)
      ) {
        setVisibleResult(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  return (
    <>
      <Command ref={wrapperRef} className="w-[500px] bg-white shadow rounded">
        <CommandInput
          onMouseDownCapture={() => setVisibleResult(true)}
          onKeyDownCapture={handleOnChange}
          placeholder="Search books, genres, authors"
        />

        <div className={!visibleResult ? "hidden" : `block`}>
          <div
            className={`absolute w-[500px] bg-white shadow rounded top-16 max-h-40 overflow-y-scroll text-primary_dark`}
          >
            {isLoading && <p className="px-4 py-1">Loading...</p>}
            {error && <p className="px-4 py-1">Internal Server Error</p>}

            {!isLoading && !error && data?.data?.length > 0 ? (
              data.data.map((book: IBook) => (
                <div
                  key={book?._id}
                  className="px-4 py-1 hover:bg-primary_light"
                >
                  <Link
                    to={`/books/${book._id}`}
                    onClick={() => setVisibleResult(false)}
                    className="flex flex-row justify-start items-center gap-3"
                  >
                    <img src={book.imageUrl} className="h-6 w-6" alt="" />
                    <span>{book?.title}</span>
                  </Link>
                </div>
              ))
            ) : (
              <p className="px-4 py-1">No books found!</p>
            )}
          </div>
        </div>
      </Command>
    </>
  );
};

export default SearchBar;
