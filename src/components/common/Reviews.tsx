import { StarIcon } from "@heroicons/react/24/outline";
import { useSingleBookQuery } from "@/redux/features/books/bookApi";
import { IReview } from "@/types/book";
import { Alert, AlertTitle } from "../ui/alert";
import { useAppSelector } from "@/redux/hook";

type ReviewProps = {
  bookId: string;
};

const Reviews = ({ bookId }: ReviewProps) => {
  const { data } = useSingleBookQuery(bookId);
  const { user: currentUser, loggedIn } = useAppSelector((state) => state.user);

  const reviews: IReview[] = data?.data?.reviews?.map(
    (review: IReview) => review
  );
  return (
    <div>
      <div className="flex flex-row justify-between items-center pt-10 pb-2 border-b border-b-primary_dark/50">
        <h2 className="text-xl lg:text-2xl font-bold">Reviews</h2>
        {currentUser && loggedIn && (
          <div>
            <button className="bg-primary_light rounded text-primary_dark flex justify-center items-center gap-2 font-semibold px-4 py-1">
              <StarIcon className="w-4 h-4" />
              <p>Write Review</p>
            </button>
          </div>
        )}
      </div>
      {reviews?.length ? (
        <div className="mb-10 my-5 ">
          {reviews?.map((review: IReview) => (
            <div className="bg-primary_light p-4 rounded-md flex flex-col mb-5">
              <div className="grid grid-flow-col justify-start items-start gap-4">
                <div>
                  <img
                    src={review?.user?.photoUrl}
                    className="w-12 h-12 rounded-full"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-1 justify-between items-start overflow-scroll">
                  <p className="text-primary_dark font-semibold">
                    {review?.user?.name}
                  </p>
                  <p className="text-slate-600 w-fit">{review?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div>
            <Alert className="w-fit mx-auto my-5">
              <StarIcon className="h-4 w-4 inline-block" />
              <AlertTitle className="px-4"> No Review Found!</AlertTitle>
            </Alert>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
