import { IoIosCheckmarkCircleOutline } from "react-icons/io";

interface SuccessProps {
  message: string;
}

const Success = ({ message }: SuccessProps) => {
  return (
    <div className="bg-emerald-500 px-3 py-2 rounded-md text-secondary font-semibold flex items-center justify-center gap-x-2">
      <IoIosCheckmarkCircleOutline className="w-5 h-5" />
      {message}
    </div>
  );
};

export default Success;
