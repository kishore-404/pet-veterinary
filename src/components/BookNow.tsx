import { useNavigate } from "react-router-dom";

type ButtonProps = {
  color?: string;
};

export default function Button({ color = "bg-custom-orange" }: ButtonProps) {
  const navigate = useNavigate();
  const textColor =
    color === "bg-custom-orange" ? "text-black" : "text-white";

  const handleClick = () => {
    navigate("/book-now");
  };

  return (
    <button
      onClick={handleClick}
      className={`px-5 rounded-full py-3 lg:text-lg md:text-lg text-xs cursor-pointer font-normal font-kiwi ${color} ${textColor}`}
    >
      Book Now
    </button>
  );
}
