import Spinner from "@/components/common/Spinner";
import { useSingleBookQuery } from "@/redux/features/books/bookApi";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useSingleBookQuery(id);
  console.log(data);
  return (
    <>
      {isLoading && (
        <div className="w-fit mx-auto my-10 flex flex-col justify-center items-center gap-4">
          <Spinner></Spinner>
          <p className="text-xl font-semibold text-primary_dark text-center">
            Book is loading...
          </p>
        </div>
      )}
      {data?.data && <p>{data.data?.title}</p>}
    </>
  );
};

export default BookDetails;
