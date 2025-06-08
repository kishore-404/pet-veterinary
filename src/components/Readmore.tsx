export default function Readmore({ 
  color = "bg-custom-black", 
  text = "Read More" 
}) {
  // Determine text color based on background
  const textColor = color === "bg-custom-black" ? "text-white" : "text-black";

  return (
    <div>
      <button
        className={`xl:w-50 md:w-40 sm:w-40 w-40 rounded-full py-3 lg:text-lg md:text-lg text-sm font-normal cursor-pointer ${color} ${textColor}`}
      >
        {text}
      </button>
    </div>
  );
}
