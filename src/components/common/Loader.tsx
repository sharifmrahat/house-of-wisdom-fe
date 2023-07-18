import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div>
      <ClipLoader color={"#7d470f"} loading={true} size={20} />
    </div>
  );
};

export default Loader;
