import { IBook } from "@/types/book";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  BookOpenIcon,
  CheckCircleIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
export function BadgeDemo() {
  return <Badge>Badge</Badge>;
}

interface BookCardProps {
  book: IBook;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const user = true;
  return (
    <>
      <div
        key={book.title}
        className="flex flex-col overflow-hidden rounded-md bg-primary_light cursor-pointer w-[200px]"
      >
        <Link to={`/books/${book._id}`} className="h-[250px] w-[200px]">
          <img
            className="h-[250px] w-[200px] object-fit"
            src={book.imageUrl}
            alt=""
          />
        </Link>
        <div className="w-fit mx-auto relative bottom-3">
          <Badge className="bg-primary_dark text-primary_light hover:bg-primary_dark rounded">
            {book.genre}
          </Badge>
        </div>
        <Link
          to={`/books/${book._id}`}
          className="h-full flex flex-col justify-between px-4 pb-2 gap-2"
        >
          <div>
            <div>
              <p className="text-lg font-semibold text-primary_dark">
                {book.title.length > 24
                  ? book.title.slice(0, 24) + "..."
                  : book.title}
              </p>
              <p className=" text-primary_dark my-2">
                <span className="text-slate-500">By</span> {book.author}
              </p>
            </div>
            <div>
              <p className="text-slate-600">
                {format(new Date(book.publishedDate), "MMMM yyyy")}
              </p>
            </div>
          </div>
        </Link>
        {user && (
          <div className="border-t border-t-primary_dark/20 text-primary_dark">
            <div className="flex flex-row justify-between items-center py-3 px-5 overflow-hidden">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div>
                      <HeartIcon className="w-5 h-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-primary_dark text-primary_light border-none outline-none rounded">
                    Wishlist
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div>
                      <BookOpenIcon className="w-5 h-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-primary_dark text-primary_light border-none outline-none rounded">
                    Reading
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div>
                      <CheckCircleIcon className="w-5 h-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-primary_dark text-primary_light border-none outline-none rounded">
                    Finished
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookCard;
