import Header from "../components/Header";
import Footer from "../components/Footer";
import Cat_button from "../assets/images/petcare/cat_button.png";
import Dog_button from "../assets/images/petcare/dog_button.png";
import Parrot_button from "../assets/images/petcare/parrot_button.png";
import Hamster_button from "../assets/images/petcare/hamster_button.png";
import Fish_button from "../assets/images/petcare/fish_button.png";
import Others_button from "../assets/images/petcare/others_button.png";
import Paw3 from "../assets/images/service/pawss3.png";
import Selected_pet from "../assets/images/petcare/selected_pet.png";
import Blog from "../assets/images/home/blog.png";
import { Pet_Care } from "../Data/Pet_care";
import type { PetCardType, PetCareSection } from "../Data/Pet_care";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Readmore from "../components/Readmore";
import Left_arrow from "../assets/images/about/left_arrow.png";
import Right_arrow from "../assets/images/about/right_arrow.png";
import Search from "../assets/images/Search_fill.png";
// import Pet_Care_banner from "../assets/images/petcare/petcare_banner.png";
// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const buttons = [
  { label: "Cats", key: "cat", img: Cat_button },
  { label: "Dogs", key: "dog", img: Dog_button },
  { label: "Parrots", key: "parrot", img: Parrot_button },
  { label: "Hamsters", key: "hamster", img: Hamster_button },
  { label: "Fishes", key: "fish", img: Fish_button },
  { label: "Other Pets", key: "other", img: Others_button },
];

function PetCare() {
  const [selected, setSelected] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectedKey = buttons[selected].key;
  const selectedCards: PetCareSection = Pet_Care[selectedKey];
  const [activeHistory, setActiveHistory] = useState<PetCardType | null>(null);

  const filteredCards = Object.values(selectedCards).filter(
    (card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (card.sub_title?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false)
  );

  // Helper to split cards into groups of 4
  function chunkArray<T>(arr: T[], size: number): T[][] {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }

  const cardChunks = chunkArray(filteredCards, 4);

  const [currentSlide, setCurrentSlide] = useState(1);
  return (
    <div className="flex flex-col items-center">
      <Header />
      <section className="my_container mt-20 mb-10">
        <div className="w-full">
          {/* Mobile Filter & Selected Button */}
          <div className="lg:hidden flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-40">
              <div className="flex justify-center relative">
                <button
                  className="relative flex flex-col items-center px-10 py-3 rounded-2xl bg-[#CBC5C5] shadow-2xl z-50"
                  style={{ transform: "scale(1.5) translateY(-10px)" }}
                >
                  <img
                    src={buttons[selected].img}
                    alt=""
                    className="h-24 object-contain"
                  />
                  <p className="text-black font-semibold">
                    {buttons[selected].label}
                  </p>
                  <img
                    src={Paw3}
                    className="absolute top-0 right-0 w-6"
                    alt=""
                  />
                  <img
                    src={Selected_pet}
                    className="absolute bottom-1 h-5 right-5"
                    alt=""
                  />
                </button>
              </div>

              <div className="flex justify-center items-center relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-white text-black px-4 py-2 md:-ms-10 rounded-full border border-gray-300"
                >
                  <ChevronDown size={20} />
                  Filter
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full mt-5 z-50 bg-white shadow-lg rounded-lg py-2 w-48 text-center">
                    {buttons.map((btn, idx) => (
                      <div
                        key={btn.label}
                        onClick={() => {
                          setSelected(idx);
                          setDropdownOpen(false);
                          setSearchTerm("");
                        }}
                        className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                          selected === idx
                            ? "font-semibold text-custom-blue"
                            : ""
                        }`}
                      >
                        {btn.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="absolute right-0 -me-1 md:-me-2 md:top-25 top-70">
                <img src={Blog} className="w-35 md:w-50" alt="" />
              </div>
            </div>
          </div>

          {/* Desktop Button Row */}
          <div className="hidden lg:flex justify-evenly bg-custom-orange rounded-4xl w-full pt-4 flex-wrap xl:gap-10 overflow-visible relative">
            {buttons.map(({ img, label }, idx) => {
              const isSelected = selected === idx;
              return (
                <button
                  key={label}
                  onClick={() => {
                    setSelected(idx);
                    setSearchTerm("");
                  }}
                  className={`relative flex flex-col items-center space-y-1 px-10 transition-transform duration-300 ease-out ${
                    isSelected
                      ? "2xl:scale-120 xl:scale-120 lg:scale-115 shadow-2xl z-50 bg-[#CBC5C5] pt-5 rounded-2xl"
                      : ""
                  }`}
                  style={{
                    transformOrigin: "center",
                    transform: isSelected
                      ? "scale(1.25) translateY(-10px)"
                      : "scale(1)",
                  }}
                >
                  <img
                    src={img}
                    alt={label}
                    className="2xl:h-30 xl:h-15 lg:h-10 object-contain transition-transform duration-300"
                  />
                  <p
                    className={`text-sm transition-colors duration-300 ${
                      isSelected ? "text-black font-semibold" : "text-white"
                    }`}
                  >
                    {label}
                  </p>

                  {isSelected && (
                    <>
                      <img
                        className="absolute top-2 right-5 w-6"
                        src={Paw3}
                        alt=""
                      />
                      <img
                        src={Selected_pet}
                        className="absolute bottom-1 h-5 right-5"
                        alt=""
                      />
                    </>
                  )}

                  {idx !== 0 && !isSelected && (
                    <div className="absolute left-0 top-0 h-full w-1 bg-white/30 backdrop-blur-sm rounded-r-lg" />
                  )}
                </button>
              );
            })}
          </div>

          {/* --- Search Input for All Devices --- */}
          <div className="flex justify-end mt-15 mb-10 px-5">
            <div className="relative w-90 max-w-xl bg-[#CBC5C5] rounded-full text-white">
              {/* Search icon positioned inside the input */}
              <img
                src={Search}
                alt="Search"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                style={{ width: "40px", height: "40px" }}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="what are you looking for ?"
                className="w-full px-15 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-orange text-black placeholder-white"
              />
            </div>
          </div>

          {/* --- Cards with Swiper --- */}
          <div className="mt-4 px-5">
            {filteredCards.length === 0 ? (
              <p className="text-center text-gray-500">
                No cards match your search.
              </p>
            ) : (
              <>
                {/* Swiper Slider */}
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={20}
                  slidesPerView={1}
                  onSlideChange={(swiper) =>
                    setCurrentSlide(swiper.activeIndex + 1)
                  }
                  navigation={{
                    nextEl: ".custom-next",
                    prevEl: ".custom-prev",
                  }}
                >
                  {cardChunks.map((chunk, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="grid grid-cols-12 gap-5">
                        {chunk.map((card, i) => (
                          <div key={i} className="md:col-span-6 col-span-12">
                            <div className="bg-[#CBC5C5] rounded-4xl p-6 h-full">
                              <div className="flex flex-col xl:flex-row gap-5 items-start h-full">
                                {/* Image Wrapper (No forced size, keeps native image size) */}
                                <div className="flex-shrink-0">
                                  <img
                                    src={card.img}
                                    alt=""
                                    className="rounded-2xl"
                                    style={{
                                      width: "300px",
                                      height: "202.13px",
                                    }} // you can remove this if you truly want to use the image's native size from the file
                                  />
                                </div>

                                {/* Text Content */}
                                <div className="flex flex-col justify-between flex-grow w-full">
                                  <div>
                                    <p className="text-sm text-gray-700">
                                      {card.title}
                                    </p>
                                    <p className="text-2xl py-5 mt-1 text-black">
                                      {card.sub_title}
                                    </p>
                                  </div>
                                  <div className="flex justify-end mt-4">
                                    <div
                                      onClick={() => setActiveHistory(card)}
                                    >
                                      <Readmore />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Navigation + Just Active Slide Number */}
                <div className="w-full flex justify-center mt-8">
                  <div className="flex items-center gap-6">
                    {/* Prev Button */}
                    <button className="custom-prev ">
                      <img src={Left_arrow} alt="Previous" />
                    </button>

                    {/* Just Active Slide Number */}
                    <span className="text-xl font-bold bg-[#CBC5C5] w-12 h-12 rounded-full text-center flex justify-center items-center ">
                      {currentSlide}
                    </span>

                    {/* Next Button */}
                    <button className="custom-next ">
                      <img src={Right_arrow} alt="Next" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Active History Modal */}
          {activeHistory && (
            <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-md flex items-center justify-center px-6">
              <div className="bg-white max-w-xl w-full p-6 rounded-3xl shadow-lg relative">
                <button
                  onClick={() => setActiveHistory(null)}
                  className="absolute top-3 right-3 text-black text-xl font-bold"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">
                  {activeHistory.sub_title}
                </h2>
                <p className="text-gray-700">{activeHistory.history}</p>
                <div className="w-full mt-5">
                  <Readmore text="Book Now " />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default PetCare;
