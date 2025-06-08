import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";
import { roles, teamData } from "../Data/Team";
import Search_icon from "../assets/images/Search_fill.png";
import Filter_icon from "../assets/images/Filter.png";
import View_all from "../assets/images/about/view all.png";
import Left_Arrow from "../assets/images/about/left_arrow.png";
import Right_Arrow from "../assets/images/about/right_arrow.png";
import Team_Header from "../assets/images/about/team_header.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TeamSection = () => {
  const [activeRoles, setActiveRoles] = useState<string[]>(["View All"]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [tempSelectedRoles, setTempSelectedRoles] = useState<string[]>([]);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );
  const [currentSlide, setCurrentSlide] = useState(1);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsSmallDevice(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredTeam = teamData.filter((member) => {
    const roleMatch =
      activeRoles.includes("View All") || activeRoles.includes(member.role);
    const searchMatch = member.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return roleMatch && searchMatch;
  });

  const toggleTempRole = (role: string) => {
    if (role === "View All") {
      setTempSelectedRoles(["View All"]);
    } else {
      setTempSelectedRoles((prev) => {
        const isSelected = prev.includes(role);
        let newSelection;
        if (isSelected) {
          newSelection = prev.filter((r) => r !== role);
          if (newSelection.length === 0) newSelection = ["View All"];
          else newSelection = newSelection.filter((r) => r !== "View All");
        } else {
          newSelection = [...prev.filter((r) => r !== "View All"), role];
        }
        return newSelection;
      });
    }
  };

  const openFilter = () => {
    setTempSelectedRoles(activeRoles);
    setFilterVisible((prev) => !prev);
  };

  const submitFilter = () => {
    setActiveRoles(tempSelectedRoles);
    setFilterVisible(false);
  };

  const slidesCount = Math.ceil(filteredTeam.length / 6);

  const onSlideChange = (swiper: any) => {
    setCurrentSlide(swiper.realIndex + 1);
  };

  return (
    <section className="my_container py-12">
      <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-8 pb-8">
        <div>
          <img src={Team_Header} alt="" />
        </div>
        <div>
          <p className="lg:text-[64px] text-2xl border rounded-full p-5 border-[#f19a56]">
            Meet Our Team !
          </p>
        </div>
      </div>
      {/* Filters */}
      <div className="relative flex flex-wrap w-full justify-evenly lg:justify-center 2xl:gap-3 mb-6">
        <div className="flex justify-center items-center gap-1">
          <button
            onClick={() => setSearchVisible((v) => !v)}
            className="p-2 rounded"
          >
            <img src={Search_icon} alt="" />
          </button>
          <div className="border-l-2 border-gray-500 pe-5 2xl:pe-8 h-10 hidden lg:block"></div>
        </div>

        {roles.map((role) => {
          if (isSmallDevice && role !== "View All") return null;
          const isActive = activeRoles.includes(role);
          return (
            <button
              key={role}
              onClick={() => setActiveRoles([role])}
              className={`2xl:px-8 xl:px-5 lg:px-3 px-12 py-2 rounded-full text-xs 2xl:text-[16px] duration-200 ${
                isActive
                  ? "bg-custom-orange text-black"
                  : "text-gray-600 border-gray-300 hover:border-blue-400"
              }`}
            >
              {role}
            </button>
          );
        })}

        <div className="relative" ref={filterRef}>
          <button onClick={openFilter} className="p-2 rounded">
            <img src={Filter_icon} alt="" />
          </button>

        {filterVisible && (
  <>
    {/* Mobile Overlay Backdrop */}
    <div className="fixed inset-0 z-40  bg-opacity-30 lg:hidden" onClick={() => setFilterVisible(false)} />

    {/* Dropdown Container */}
    <div
      className={`
        z-50 bg-white border rounded-3xl shadow-lg p-4 w-[90vw] max-w-md
        ${isSmallDevice
          ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          : "absolute top-full mt-2 right-0"
        }
      `}
    >
      <p className="font-semibold mb-2 text-sm text-gray-700">Select roles:</p>
      <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => toggleTempRole(role)}
            className={`px-3 py-2 rounded-3xl text-sm border transition ${
              tempSelectedRoles.includes(role)
                ? "bg-custom-orange text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {role}
          </button>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={submitFilter}
          className="px-4 py-2 bg-custom-orange text-white rounded-3xl transition"
        >
          Apply
        </button>
      </div>
    </div>
  </>
)}

        </div>

        <button className="p-2 rounded hidden xl:block">
          <img src={View_all} alt="" />
        </button>
      </div>

      {/* Search Input */}
     {searchVisible && (
  <div className="relative max-w-md mx-auto mb-6">
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search by name..."
      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#f19a56]"
    />
    {searchTerm && (
      <button
        onClick={() => setSearchTerm("")}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black"
        aria-label="Clear search"
      >
        &#10005;
      </button>
    )}
  </div>
)}


      {/* Team Display */}
      {isSmallDevice ? (
        <Swiper
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 40 },
            577: { slidesPerView: 2, spaceBetween: 20 },
          }}
        >
          {filteredTeam.map((member, index) => (
            <SwiperSlide key={index}>
              <div className="bg-[#EEEEEE] rounded-3xl shadow-md p-4 text-start sm:w-75 h-100 flex flex-col justify-center items-center">
                <div>
                  <img
                    src={member.img}
                    alt={member.name}
                    className="img-fluid mb-4"
                  />
                </div>
                <div className="flex justify-between w-full pt-5">
                  <p className="text-2xl text-left w-50">{member.name}</p>
                  <div className="img-container">
                    <div>
                      <img
                        src={View_all}
                        className="img-fluid cursor-pointer"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            onSwiper={setSwiperInstance}
            onSlideChange={onSlideChange}
            slidesPerView={1}
            spaceBetween={30}
            allowTouchMove={false}
          >
            {Array.from({ length: slidesCount }).map((_, slideIndex) => {
              const slideItems = filteredTeam.slice(
                slideIndex * 6,
                slideIndex * 6 + 6
              );
              return (
                <SwiperSlide key={slideIndex}>
                  <div className="grid grid-cols-3 gap-16 2xl:mx-60">
                    {slideItems.map((member, index) => (
                      <div
                        key={index}
                        className="bg-[#EEEEEE] rounded-3xl shadow-md p-4 text-start flex flex-col justify-center items-center"
                      >
                        <div>
                          <img
                            src={member.img}
                            alt={member.name}
                            className="img-fluid mb-4"
                          />
                        </div>
                        <div className="flex justify-between w-full pt-5">
                          <p className="text-2xl text-left w-50">
                            {member.name}
                          </p>
                          <div className="img-container">
                            <div>
                              {" "}
                              <img
                                src={View_all}
                                className="img-fluid cursor-pointer"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Slide Controls */}
          <div className="flex gap-10 justify-center mt-4">
            <button
              ref={prevRef}
              onClick={() => swiperInstance?.slidePrev()}
              aria-label="Previous"
            >
              <img src={Left_Arrow} alt="" />
            </button>
            <span className="text-[24px] font-bold bg-[#F19A56] flex justify-center items-center text-2xl  w-12 h-12 rounded-full">
              {currentSlide}
            </span>
            <button
              ref={nextRef}
              onClick={() => swiperInstance?.slideNext()}
              aria-label="Next"
            >
              <img src={Right_Arrow} alt="" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamSection;
