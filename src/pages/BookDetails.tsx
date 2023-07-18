import Spinner from "@/components/common/Spinner";
import { Badge } from "@/components/ui/badge";
import {
  useDeleteBookMutation,
  useSingleBookQuery,
} from "@/redux/features/books/bookApi";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  BookOpenIcon as BookOpenIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";
import Reviews from "@/components/common/Reviews";
import { useAppSelector } from "@/redux/hook";
import { useUpdateBookmarkMutation } from "@/redux/features/users/userApi";
import { toast } from "react-toastify";
import EditBook from "./EditBook";
import { useEffect } from "react";

const BookDetails = () => {
  const { id } = useParams();
  const { user: currentUser, loggedIn } = useAppSelector((state) => state.user);
  const { data, isLoading, error } = useSingleBookQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  const [updateStatus, { isLoading: updateLoading }] =
    useUpdateBookmarkMutation();

  const [deleteBook, { error: errorDelete, isSuccess: deleteSuccess }] =
    useDeleteBookMutation();

  const bookmarkExist = currentUser?.bookmark?.find(
    (userBook) => userBook?.book?._id === data?.data?._id
  );

  const validUser = data?.data?.publisher?._id === currentUser._id;

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

  const navigate = useNavigate();

  const handleDeleteBook = () => {
    deleteBook(id);
  };

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Books successfully deleted");
      navigate("/books");
    }
    if (error) {
      toast.error((errorDelete as any)?.data?.message);
    }
  }, [deleteSuccess, error]);
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
                  {currentUser && loggedIn && validUser && (
                    <div className="bg-primary_light text-primary_dark flex flex-row justify-evenly rounded-md mt-4 font-semibold">
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="px-2 py-1 flex gap-2 justify-center items-center cursor-pointer">
                            <PencilSquareIcon className="w-4 h-4"></PencilSquareIcon>{" "}
                            Edit
                          </div>
                        </DialogTrigger>

                        <DialogContent className="w-fit">
                          <DialogHeader>
                            {/* <DialogTitle>Edit profile</DialogTitle> */}
                          </DialogHeader>
                          <EditBook book={data?.data} />
                        </DialogContent>
                      </Dialog>

                      <div className="bg-primary_dark/50 w-[1px]"></div>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <div className="px-2 py-1 flex gap-2 justify-center items-center cursor-pointer">
                            <TrashIcon className="w-4 h-4"></TrashIcon> Delete
                          </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure to delete?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Book Name: {data?.data?.title}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteBook}
                              className="bg-red-700 hover:bg-red-700"
                            >
                              Confirm
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
