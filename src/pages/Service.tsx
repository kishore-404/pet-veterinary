import Header from "../components/Header";
import Footer from "../components/Footer";
import { Service_page } from "../Data/Service_page_Data";
import Right_arrow from "../assets/images/about/right_arrow.png";
import Left_arrow from "../assets/images/about/left_arrow.png";
import Doctors from "../assets/images/about/smart_family.png";
import Paw3 from "../assets/images/service/pawss3.png";
import Paw4 from "../assets/images/service/pawss4.png";
import Paw5 from "../assets/images/service/pawss5.png";
import Paw6 from "../assets/images/service/pawss6.png";
import { useState } from "react";
import Service_Modal from "../components/Service_Modal";


function Service() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content :any) => {
    setModalContent(content);
    setModalOpen(true);
  };
  return (
    <div className="flex flex-col items-center">
      <Header />
      <section className="my_container">
        <div className="bg-custom-blue xl:mt-20 mt-8 mb-10 rounded-[70px]">
          <div className="grid grid-cols-12">
            <div className="xl:col-span-5 lg:col-span-7 col-span-12 py-10 lg:py-15">
              <div className="relative ps-4 md:ps-20">
                <img
                  src={Paw4}
                  alt=" "
                  className="absolute left-10 bottom-10"
                />
                <p className="text-white text-[40px] ">
                  {Service_page.card_1.title}
                </p>
                <img
                  src={Paw5}
                  alt=" "
                  className="absolute left-70 bottom-20 md:left-110 md:-bottom-10"
                />
              </div>
              <button className="bg-white p-2 px-3 rounded-full md:ms-20 mt-20 flex justify-between  cursor-pointer ms-4  ">
                <a onClick={() => openModal(Service_page.Health_care)}  className="flex justify-around cursor-pointer items-center md:gap-10 w-70 md:w-100">
                  {" "}
                  <p className=" lg:text-2xl"> Explore it</p>{" "}
                  <img src={Right_arrow} alt="" />
                </a>
              </button>
            </div>
            <div className="xl:col-span-7 lg:col-span-5 col-span-12 py-15">
              <div className="flex justify-center items-center">
                <div className="relative">
                  <img
                    src={Paw3}
                    alt=""
                    className="absolute lg:right-10 xl:right-20 xl:bottom-50"
                  />
                  <img
                    src={Paw6}
                    alt=""
                    className="absolute hidden  md:block -right-10 bottom-0 lg:-bottom-20 lg:-right-0 xl:-right-20 xl:bottom-30"
                  />
                  <img src={Service_page.card_1.img} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-5">
          <div className="xl:col-span-10 col-span-12 ">
            <div className="grid  grid-cols-12 gap-5">
              {/* Left card */}
              <div className="xl:col-span-9 col-span-12">
                <div className="grid grid-cols-12 bg-custom-blue  p-10 rounded-[70px] text-white">
                  {/* Left card Text */}
                  <div className="md:col-span-7  col-span-12">
                    <p className="2xl:text-4xl lg:text-xl  font-medium pb-5">
                      {Service_page.Health_care.title}
                    </p>
                    <p className="2xl:text-2xl lg:text-xl pb-2 ">
                      {Service_page.Health_care.sub_title}
                    </p>
                    {Service_page.Health_care.points.map((point, index) => (
                      <li
                        className="2xl:ps-4 2xl:pe-10 2xl:text-xl  text-[14px] "
                        key={index}
                      >
                        {point}
                      </li>
                    ))}
                  </div>
                  <div className="md:col-span-3 col-span-6 flex pt-5 md:pt-0 ">
                    <img src={Service_page.Health_care.img} alt="" />
                  </div>
                  <div className="md:col-span-2 col-span-6 flex items-center justify-center md:justify-end">
                   <a onClick={() => openModal(Service_page.Health_care)} className="cursor-pointer">
        <img src={Right_arrow} className="bg-white rounded-full p-2" alt="" />
      </a>
                  </div>
                </div>
              </div>
              {/* Left card - right image */}
              <div className="xl:col-span-3 col-span-12 items-center  justify-around flex flex-col md:flex-row gap-5">
                <div className="order-1 flex justif-center items-center gap-5">
                 <div> <img src={Service_page.medicine.img} alt="" /></div>
                   <div><img
                    src={Service_page.surgery.img}
                    className="md:hidden "
                    alt=""
                  /></div>
                </div>
                <div className="xl:hidden order-3 md:order-2  -mb-15 ">
                  <img src={Doctors} alt="" />
                </div>
                <div className="md:order-3">
                  {" "}
                  <img
                    src={Service_page.surgery.img}
                    className="hidden sm:block xl:hidden "
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="grid my-10 grid-cols-12 lg:gap-10">
              {/* Left card */}
               <div className="xl:col-span-9 col-span-12">
                <div className="grid grid-cols-12 bg-custom-blue  p-10 rounded-[70px] text-white">
                  {/* Left card Text */}
                  <div className="md:col-span-7  col-span-12">
                    <p className="2xl:text-4xl lg:text-xl  font-medium pb-5">
                      {Service_page.Day_care.title}
                    </p>
                    <p className="2xl:text-2xl lg:text-xl pb-2 ">
                      {Service_page.Day_care.sub_title}
                    </p>
                    {Service_page.Day_care.points.map((point, index) => (
                      <li
                        className="2xl:ps-4 2xl:pe-10 2xl:text-xl  text-[14px] "
                        key={index}
                      >
                        {point}
                      </li>
                    ))}
                  </div>
                  <div className="md:col-span-3 col-span-6 flex pt-5 md:pt-0 ">
                    <img src={Service_page.Day_care.img} alt="" />
                  </div>
                  <div className="md:col-span-2 col-span-6 flex items-center justify-center md:justify-end">
                   <a onClick={() => openModal(Service_page.Health_care)} className="cursor-pointer">
        <img src={Right_arrow} className="bg-white rounded-full p-2" alt="" />
      </a>
                  </div>
                </div>
              </div>
              {/* Left card - right image */}
              <div className="xl:col-span-3 col-span-12 flex items-center ">
                <div>
                  {" "}
                  <img
                    src={Service_page.surgery.img}
                    className="hidden xl:block"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="xl:col-span-2 col-span-12 hidden  bg-custom-blue rounded-[70px] p-10 xl:p-0  xl:my-10 lg:flex  xl:flex-col justify-around">
            <div className="p-5">
              {" "}
              <img src={Service_page.consulting.img} className="" alt="" />
            </div>

            <div className="flex flex-col justify-around">
              <p className="text-white text-xl px-3 ">
                {Service_page.consulting.text}
              </p>
              <div className="flex justify-end ">
                {" "}
                <a onClick={() => openModal(Service_page.Health_care)} className=" cursor-pointer">
                  {" "}
                  <img
                    src={Right_arrow}
                    className="bg-white rounded-full p-2 me-5 mt-10"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* bottom card */}
        <div className="bg-custom-blue lg:mt-8  mb-10 rounded-[70px]">
          <div className="grid grid-cols-12">
            <div className="xl:col-span-5 lg:col-span-7 col-span-12 py-10 lg:py-15">
              <div className="relative ps-4 md:ps-20">
                <img
                  src={Paw4}
                  alt=" "
                  className="absolute left-10 bottom-10"
                />
                <p className="text-white text-[40px] ">
                  {Service_page.card_1.title}
                </p>
                <img
                  src={Paw5}
                  alt=" "
                  className="absolute left-70 bottom-20 md:left-110 md:-bottom-10"
                />
              </div>
              <button className="bg-white p-2 px-3 rounded-full md:ms-20 mt-10 lg:mt-20 flex justify-between  cursor-pointer ms-4  ">
                <a onClick={() => openModal(Service_page.Health_care)} className="flex justify-around items-center  md:gap-10 w-70 md:w-100">
                  {" "}
                  <p className=" lg:text-2xl"> See More</p>{" "}
                  <img src={Right_arrow} alt="" />
                </a>
              </button>
            </div>
            <div className="xl:col-span-7 lg:col-span-5 col-span-12 pb-10 lg:py-10">
              <div className="flex justify-center items-center">
                <div className="relative">
                  <img
                    src={Paw3}
                    alt=""
                    className="absolute lg:right-10 xl:right-20 xl:bottom-50"
                  />
                  <img
                    src={Paw6}
                    alt=""
                    className="absolute hidden  md:block -right-10 bottom-0 lg:-bottom-20 lg:-right-0 xl:-right-20 xl:bottom-30"
                  />
                  <div className="px-4">
                    {" "}
                    <img src={Service_page.Grooming.img} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
          <Service_Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        content={modalContent}
      />
      <div className="flex gap-5">
        <button className="cursor-pointer">
        <img src={Left_arrow} alt="" />
      </button>
      <div className="flex justify-center items-center text-2xl font-semibold bg-custom-blue w-12 h-12 rounded-full">
        <p>1</p>
      </div>
      <button className="cursor-pointer">
        <img src={Right_arrow} alt=""  />
      </button>
      </div>

      <Footer />
    </div>
  );
}

export default Service;
