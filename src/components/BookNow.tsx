export default function Button({ color = "bg-custom-orange" }) {
  // Determine text color based on background
  const textColor =
    color === "bg-custom-orange" ? "text-black" : "text-white";

  return (
    <button className={` px-5 rounded-full py-3 lg:text-lg md:text-lg text-xs cursor-pointer  font-normal font-kiwi ${color} ${textColor}`}>
    Book Now
    </button>
  );
}
