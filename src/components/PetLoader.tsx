import PawIcon from "../assets/images/pawss 6.png";
import type { CSSProperties } from "react";

export default function PetLoader() {
  const bounceStyle = (delay: number): CSSProperties => ({
    width: "60px",
    height: "60px",
    animation: `bounce 0.5s infinite`,
    animationDelay: `${delay}s`,
  });

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-white"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="flex gap-2">
          {[0, 0.1, 0.2].map((delay, index) => (
            <img
              key={index}
              src={PawIcon}
              alt="paw"
              style={bounceStyle(delay)}
            />
          ))}
        </div>
      </div>

      <style>
        {`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}
      </style>
    </>
  );
}
