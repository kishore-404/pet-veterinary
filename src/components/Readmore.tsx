export default function Readmore({ color = "bg-custom-black" }) {
  // Determine text color based on background
  const textColor =
    color === "bg-custom-black" ? "text-white" : "text-black";

  return (
    <div className="">
        <button className={`xl:w-50 md:w-40 sm:w-40 w-40 rounded-full py-3 lg:text-lg md:text-lg text-sm  font-normal  ${color} ${textColor}`}>
    Read More
    </button>
    </div>
  );
}
