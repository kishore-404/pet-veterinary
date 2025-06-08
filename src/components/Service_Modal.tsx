// components/ServiceModal.tsx
import { X } from "lucide-react";
import Readmore from "./Readmore";
import Right_arrow from "../assets/images/about/right_arrow.png";
import Left_arrow from "../assets/images/about/left_arrow.png";
import Paw3 from "../assets/images/service/pawss3.png";

interface FaqItem {
  q: string;
  a: string;
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    title: string;
    faq?: FaqItem[];
  } | null;  // allow null
}

export default function Service_Modal({ isOpen, onClose, content }: ServiceModalProps) {
  // Guard clause to prevent rendering when modal is closed or content is null
  if (!isOpen || !content) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white bg-opacity-70 flex items-center justify-center px-4">
      <div className="bg-custom-blue relative rounded-3xl p-4 lg:p-8 my_container overflow-y-auto max-h-[90vh] scrollbar-hide">
        <button onClick={onClose} className="absolute top-5 right-5">
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="text-black space-y-4">
          <h2 className="text-4xl font-bold text-white">{content.title}</h2>

          {content.faq && (
            <div className="space-y-10 mt-10 max-w-4xl lg:ms-20">
              <p className="text-white text-2xl">Exact diagnosis of animal diseases:</p>
              <p className="text-white text-lg">Health checks :</p>
              {content.faq.map((faqItem, idx) => (
                <div key={idx}>
                  <p className="text-[16px]">{faqItem.q}</p>
                  <p className="text-white">{faqItem.a}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Arrows and Decorative Paw Images */}
        <div className="absolute mt-5 xl:top-100">
          <img src={Left_arrow} alt="left arrow" className="bg-white rounded-full cursor-pointer" />
        </div>
        <div className="absolute mt-5 right-3 xl:top-100 xl:right-5">
          <img src={Right_arrow} alt="right arrow" className="bg-white rounded-full cursor-pointer" />
        </div>
        <div className="absolute top-40 right-10 md:top-10 md:right-80">
          <img src={Paw3} alt="decorative paw" />
        </div>
        <div className="absolute hidden md:block md:top-10 md:right-50">
          <img src={Paw3} alt="decorative paw" />
        </div>
        <div className="absolute hidden md:block md:top-40 md:right-50">
          <img src={Paw3} alt="decorative paw" />
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-5">
          <Readmore text="Book Now" />
        </div>
      </div>
    </div>
  );
}
