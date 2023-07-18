import Spinner from "@/components/common/Spinner";
import { Badge } from "@/components/ui/badge";
import { useSingleBookQuery } from "@/redux/features/books/bookApi";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
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
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import {
  BookOpenIcon as BookOpenIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";
import Reviews from "@/components/common/Reviews";
import { useAppSelector } from "@/redux/hook";
import { useUpdateBookmarkMutation } from "@/redux/features/users/userApi";
import { toast } from "react-toastify";

const BookDetails = () => {
  const { id } = useParams();
  const { user: currentUser, loggedIn } = useAppSelector((state) => state.user);
  const { data, isLoading, error } = useSingleBookQuery(id);
  const [updateStatus, { isLoading: updateLoading }] =
    useUpdateBookmarkMutation();

  const bookmarkExist = currentUser?.bookmark?.find(
    (userBook) => userBook.book._id === data?.data?._id
  );

  const handleUpdateBookmark = (status: string) => {
    const option = {
      id: id,
      data: { status },
    };
    toast.promise(updateStatus(option), {
      success: `${status} Updated`,
      error: `Failed to update ${status}`,
    });
  };
  return (
    <>
      <div className="max-w-7xl mx-auto">
        {isLoading && (
          <div className="w-fit mx-auto my-10 flex flex-col justify-center items-center gap-4">
            <Spinner></Spinner>
            <p className="text-xl font-semibold text-primary_dark text-center">
              Book is loading...
            </p>
          </div>
        )}
        {data?.data && (
          <>
            <section className="my-12">
              <div className="flex flex-row justify-center gap-10">
                <div>
                  <img
                    src={data?.data?.imageUrl}
                    className="w-[250px] h-[350px] object-cover rounded-md"
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-between">
                  {/* Details Section */}
                  <div className="bg-primary_light text-primary_dark flex flex-col justify-between rounded-md h-full">
                    <div
                      className=" flex flex-col gap-3 
                 p-5"
                    >
                      <h4 className="text-xl font-semibold">
                        {" "}
                        {data?.data?.title}
                      </h4>
                      <p className=" text-primary_dark my-2 text-lg">
                        <span className="text-slate-500">By</span>{" "}
                        {data?.data?.author}
                      </p>
                      <div className="">
                        Genre:{" "}
                        <Badge className="bg-primary_dark text-primary_light hover:bg-primary_dark rounded">
                          {data?.data?.genre}
                        </Badge>
                      </div>
                      <div>
                        Publish Date:{" "}
                        <span className="text-slate-600">
                          {format(
                            new Date(data?.data?.publishedDate),
                            "dd MMMM, yyyy"
                          )}
                        </span>
                      </div>
                    </div>
                    {currentUser && loggedIn && (
                      <div className="border-t border-t-primary_dark/20 text-primary_dark">
                        <div className="flex flex-row justify-between items-center py-3 px-5 overflow-hidden">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <div
                                  className={`${
                                    updateLoading && "cursor-wait"
                                  }`}
                                  onClick={() =>
                                    handleUpdateBookmark("Wishlist")
                                  }
                                >
                                  {bookmarkExist?.status === "Wishlist" ? (
                                    <HeartIconSolid className="w-5 h-5" />
                                  ) : (
                                    <HeartIcon className="w-5 h-5" />
                                  )}
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
                                <div
                                  className={`${
                                    updateLoading && "cursor-wait"
                                  }`}
                                  onClick={() =>
                                    handleUpdateBookmark("Reading")
                                  }
                                >
                                  {bookmarkExist?.status === "Reading" ? (
                                    <BookOpenIconSolid className="w-5 h-5" />
                                  ) : (
                                    <BookOpenIcon className="w-5 h-5" />
                                  )}
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
                                <div
                                  className={`${
                                    updateLoading && "cursor-wait"
                                  }`}
                                  onClick={() =>
                                    handleUpdateBookmark("Finished")
                                  }
                                >
                                  {bookmarkExist?.status === "Finished" ? (
                                    <CheckCircleIconSolid className="w-5 h-5" />
                                  ) : (
                                    <CheckCircleIcon className="w-5 h-5" />
                                  )}
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
                  {/* Edit & Delete Section */}
                  {currentUser && loggedIn && (
                    <div className="bg-primary_light text-primary_dark flex flex-row justify-evenly rounded-md mt-4 font-semibold">
                      <div className="px-2 py-1 flex gap-2 justify-center items-center cursor-pointer">
                        <PencilSquareIcon className="w-4 h-4"></PencilSquareIcon>{" "}
                        Edit
                      </div>
                      <div className="bg-primary_dark/50 w-[1px]"></div>
                      <div className="px-2 py-1 flex gap-2 justify-center items-center cursor-pointer">
                        <TrashIcon className="w-4 h-4"></TrashIcon> Delete
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
            <section className="my-12 w-3/5 mx-auto">
              <Reviews bookId={id as string} />
            </section>
          </>
        )}
        {!isLoading && error && (
          <Alert className="w-fit mx-auto" variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="ml-4">
              {(error as any)?.data?.message}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
};

export default BookDetails;
