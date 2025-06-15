import { useNavigate } from "react-router-dom";

type ReadmoreProps = {
  color?: string;
  text?: string;
  link?: string; 
};

export default function Readmore({
  color = "bg-custom-black",
  text = "Read More",
  link = "/about", 
}: ReadmoreProps) {
  const navigate = useNavigate();
  const textColor = color === "bg-custom-black" ? "text-white" : "text-black";

  const handleClick = () => {
    if (link) navigate(link);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`xl:w-50 md:w-40 sm:w-40 w-40 rounded-full py-3 lg:text-lg md:text-lg text-sm font-normal cursor-pointer ${color} ${textColor}`}
      >
        {text}
      </button>
    </div>
  );
}
