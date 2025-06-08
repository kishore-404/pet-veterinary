import { useEffect , useRef } from "react";
import Header from "../components/Header";
import BookNow from "../components/BookNow";
import Readmore from "../components/Readmore";
import Footer from "../components/Footer";
import Banner from "../assets/images/home/home-banner.png";
import Review from "../assets/images/home/reviews.png";
import View_more_left from "../assets/images/home/view-more-left.png";
import View_more_right from "../assets/images/home/view-more-right.png";
import Care_home from "../assets/images/home/smart-care.png";
import Home_smart_care from "../Data/Home_smart_care";
import Service_img_1 from "../assets/images/home/service-img-1.png";
import Service_img_2 from "../assets/images/home/service-img-2.png";
import Service_img_3 from "../assets/images/home/service-img-3.png";
import Habits from "../assets/images/home/habits.png";
import Barking from "../assets/images/home/barking.png";
import Socialize from "../assets/images/home/socialize.png";
import Nutirition from "../assets/images/home/nutrition.png";
import Blog from "../assets/images/home/blog.png";
// import Toy from "../assets/images/home/product-img-1.png";
import Shop from "../assets/images/home/shop.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";
import Services from "../Data/Service";
import Products from "../Data/Shop_products";
import { animateCounter } from "../Animation/animation.tsx";


function Home() {
const swiperRef = useRef<any>(null);

 const counterRef = useRef(null);

//  review counter
  useEffect(() => {
    if (counterRef.current) {
      animateCounter(counterRef.current, 100, "+ Reviews");
    }
  }, []);

  useEffect(() => {
    if (!swiperRef.current) return;

    const interval = setInterval(() => {
      if (swiperRef.current.isBeginning) {
        // If at first slide, jump to last slide instantly to avoid flicker
        swiperRef.current.slideTo(swiperRef.current.slides.length - 1, 0);
      } else {
        swiperRef.current.slidePrev();
      }
    }, 1500); // 3 seconds interval

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="flex flex-col items-center">
        <Header />
        {/* Banner */}
        <section className="my_container ">
          <div className="flex lg:flex-row gap-4   flex-col-reverse  xl:pt-20 md:pt-8 w-full">
            {/* images */}
            <div className=" w-full    flex justify-center">
              <img src={Banner} alt="" />
            </div>
            {/* text */}
            <div className="flex flex-col w-full  gap-4 ">
              <div className="flex flex-col-reverse xl:flex-col">
                <p className="text-lg   text-center    lg:text-right xl:pt-4 pt-8 leading-6">
                  Rustaveli Avenue 10, Tbilisi{" "}
                  <br className="hidden  xl:block" />
                  +995 511 233 789 <br className="hidden  xl:block" />
                  Twenty-four hours a day
                </p>
                <p className="xl:text-7xl md:text-5xl    text-3xl text-center   lg:text-right xl:leading-24 md:leading-15  xl:pt-4 pt-12  word-spacing-wide">
                  Veterinary Company in Georgia
                </p>
              </div>
              <p className="text-lg  max-w-[100px ]  text-justify md:text-center    lg:text-right   pt-5">
                As Georgia’s leading animal health company, SmartCare is{" "}
                <br className="hidden md:block xl:block" /> driven by a singular
                purpose: to nurture Georgia and{" "}
                <br className="hidden md:block xl:block" /> humankind by
                advancing care for animals.
              </p>
              {/* reviews */}
              <div className="lg:flex lg:justify-end justify-center hidden   md:mb-15 xl:mb-20">
                <div className="bg-custom-peach w-96 rounded-4xl flex flex-col items-center mt-5 gap-4 py-5">
                  <img src={Review} alt="" className="" />
                  <p
      ref={counterRef}
      className="xl:text-5xl md:text-4xl sm:text-3xl text-3xl font-bold"
    >
      0+ Reviews
    </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Welcome to SmartCare */}
        <section className="my_container mb-10">
          <div className="bg-custom-orange border-0 rounded-3xl pb-7">
            <div className="flex justify-center   md:justify-between  text-center pt-5 md:px-15  ">
              <p className="xl:text-[40px] lg:text-3xl md:text-2xl text-2xl    ">
                Welcome to SmartCare
              </p>
              <a href="" className="hidden md:block">
                {" "}
                <div className="flex justify-center flex-nowrap text-center gap-3 ps-10  ">
                  <img src={View_more_left} alt="" className="h-10 " />
                  <p className="xl:text-2xl md:text-lg sm:text-md font-bold  ">
                    {" "}
                    View More
                  </p>
                  <img src={View_more_right} alt="" className="h-10 " />
                </div>
              </a>
            </div>
            <div className="flex lg:px-10 px-4 sm:px-8 md:px-10 lg:me-5 justify-center xl:justify-between pt-8 xl:gap-5 lg:gap-10   ">
              <div className="bg-white rounded-3xl xl:w-100 2xl:w-140 lg:w-95  px-10   flex xl:gap-5 md:gap-8 gap-5 flex-col item-center pb-10    ">
                <img src={Care_home} alt="" className="pt-10" />
                <p className="text-2xl ">About us</p>
                <p className="text-lg">
                  SmartCare is a digital platform for pet lovers and pet owners
                  that simplifies the care of their pet friend. We offer
                  everything a pet needs to provide the best care for your
                  four-legged friends.
                </p>
                <div className="flex justify-center">
                  {" "}
                  <Readmore />
                </div>
              </div>
              <div className="hidden lg:grid lg:grid-cols-2 xl:gap-x-20 lg:gap-x-15 gap-y-10">
                {Home_smart_care.map((item, index) => (
                  <div
                    key={item.id ?? index} // Use unique id if exists, else fallback to index
                    className="bg-white 2xl:w-100 xl:w-80 lg:w-60 rounded-3xl pb-5"
                  >
                    <div className="flex justify-around pt-5 ps-4">
                      <p className="text-2xl">{item.title}</p>
                      <img src={item.icon} alt="" />
                    </div>
                    <p className="text-lg px-10 pt-4 pb-5">
                      {item.description}
                    </p>
                    <div className="flex justify-center">
                      <Readmore />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 block lg:hidden px-5 ">
              <Swiper
                className="mySwiper"
                breakpoints={{
                  640: { slidesPerView: 1, spaceBetween: 20 },
                  768: { slidesPerView: 2, spaceBetween: 30 },
                }}
                slidesPerView={1}
                spaceBetween={20}
                loop={true}
                modules={[Pagination]}
                pagination={{
                  el: ".custom-pagination",
                  clickable: true,
                  renderBullet: (index, className) => {
                    return `<span class="${className} inline-block w-3 h-3 rounded-full mx-1 bg-white opacity-40 transition-all duration-300 transform"></span>`;
                  },
                }}
              >
                {Home_smart_care.map((item, index) => (
                  <SwiperSlide key={index} className="rounded-3xl">
                    <div className="w-full h-75 pb-5">
                      <div className="flex flex-col justify-between">
                        <div className="flex justify-around pt-5 ps-4">
                          <div className="flex flex-wrap w-35">
                            <p className="text-2xl">{item.title}</p>
                          </div>
                          <div>
                            <img src={item.icon} alt="" className="w-10" />
                          </div>
                        </div>
                        <p className="text-lg px-10 pt-4 pb-5">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex justify-center pb-2">
                        <Readmore />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

                {/* Custom pagination container (centered) */}
                <div className="custom-pagination flex justify-center mt-4 pb-2"></div>
              </Swiper>
            </div>
          </div>
        </section>
        {/* Our Company Services   */}
        <section className="my_container mb-10">
          <div className="flex justify-center  md:justify-between  text-center pt-5 md:px-15">
            <p className="xl:text-[40px] lg:text-3xl md:text-2xl text-2xl   ">
              Our Company Services
            </p>
            <a href="" className="hidden md:block">
              {" "}
              <div className="flex justify-center flex-nowrap text-center gap-3   ">
                <img src={View_more_left} alt="" className="h-10 " />
                <p className="xl:text-2xl md:text-lg sm:text-md font-bold  ">
                  {" "}
                  View More
                </p>
                <img src={View_more_right} alt="" className="h-10 " />
              </div>
            </a>
          </div>
          <div className="hidden lg:block">
            <div className="flex flex-wrap lg:flex-nowrap justify-center xl:gap-10 md:gap-5 gap-5 mt-10">
              <div className="bg-custom-blue lg:h-[500px] rounded-3xl xl:px-15 px-5 xl:pt-5 text-white">
                <div className="flex  md:justify-between ">
                  <div className="flex flex-col xl:gap-8 md:gap-5 gap-4 py-5 2xl:w-150 md:w-100">
                    <p className="xl:text-4xl md:text-3xl  sm:text-2xl ">
                      Surgery
                    </p>
                    <p className="xl:text-lg md:text-md sm:text-sm ">
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text. It has roots in a piece of classical Latin
                      literature from 45 BC, making it over 2000 years old.
                      Richard McClintock, a Latinone of the more obscure Latin
                      words, consectetur, from a Lorem Ipsum passage, and going
                      through the cites of the word in classical literature,
                      discovered the undoubtable source.
                    </p>
                    <Readmore color="bg-white " />
                  </div>
                  <div className="md:flex flex-col-reverse pb-5 hidden">
                    <img src={Service_img_1} alt="" />
                  </div>
                </div>
              </div>
              <div className="bg-custom-blue rounded-3xl xl:px-15 px-5 xl:pt-5 text-white">
                <div className="flex  justify-between">
                  <div className="flex flex-col gap-8 py-5 2xl:w-150 md:w-100">
                    <p className="xl:text-4xl md:text-3xl  sm:text-2xl">
                      Healthcare
                    </p>
                    <p className="xl:text-lg md:text-md sm:text-sm">
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text. It has roots in a piece of classical Latin
                      literature from 45 BC, making it over 2000 years old.
                      Richard McClintock, a Latinone of the more obscure Latin
                      words, consectetur, from a Lorem Ipsum passage, and going
                      through the cites of the word in classical literature,
                      discovered the undoubtable source.
                    </p>
                    <Readmore color="bg-white " />
                  </div>
                  <div className="md:flex flex-col-reverse pb-5 hidden">
                    <img src={Service_img_2} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3  gap-5 ">
              <div className="bg-custom-blue rounded-3xl xl:px-15 px-5 xl:pt-5 text-white pt-5 mt-5">
                <div className="flex ">
                  <div className="flex flex-col w-90 gap-5 pb-5">
                    <p className="xl:text-4xl md:text-3xl  sm:text-2xl">
                      Grooming
                    </p>
                    <p className="xl:text-lg md:text-md sm:text-sm lg:pb-15 xl:pb-0">
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text. It has roots in a piece of classical Latin
                      literature from 45 BC, making it over 2000 years old.
                      Richard McClintock, a Latinone of the more obscure Lati
                    </p>
                    <Readmore color="bg-white" />
                  </div>
                  <div className="xl:flex flex-col-reverse pb-5 hidden">
                    <img src={Service_img_3} alt="" />
                  </div>
                </div>
              </div>
              <div className="bg-custom-blue rounded-3xl xl:px-15 px-5 xl:pt-5 pt-5 text-white mt-5">
                <div className="flex ">
                  <div className="flex flex-col w-90 gap-5 pb-5">
                    <p className="xl:text-4xl md:text-3xl  sm:text-2xl">
                      Grooming
                    </p>
                    <p className="xl:text-lg md:text-md sm:text-sm pb-15">
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text. It has roots in a piece of classical Latin
                      literature from 45 BC, making it over 2000 years old.
                      Richard McClintock, a Latinone of the more obscure Lati
                    </p>
                    <Readmore color="bg-white" />
                  </div>
                </div>
              </div>
              <div className="bg-custom-orange rounded-3xl xl:px-15 px-5 xl:pt-5 pt-5 text-white mt-5">
                <div className="flex ">
                  <div className="flex flex-col  gap-5 pb-5">
                    <p className="xl:text-4xl md:text-3xl  sm:text-2xl text-black">
                      Make a meet
                    </p>
                    <p className="xl:text-lg md:text-md sm:text-sm text-center">
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text. It has roots in a piece of classical Latin
                      liteyears old.Richard McClintock, a Latinone of the more
                      obscure Lati Contrary to popular belief, Lorem Ipsum is
                      not simply ratin literature from 45 BC, making it over
                      2000 years old. Richard McClintock, a Latinone of the more
                      obscure
                    </p>
                    <div className="flex justify-center">
                      {" "}
                      <BookNow color="bg-black" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:hidden mt-8">
            <Swiper
              className="service_swipe border-0r"
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  centeredSlides: true,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                  centeredSlides: true,
                },
              }}
              slidesPerView={1} // default for mobile <640px
              spaceBetween={20}
              loop={true}
              centeredSlides={true} // center active slide globally
              modules={[Pagination]}
              pagination={{ clickable: true }}
            >
              {Services.map((item, index) => (
                <SwiperSlide key={index} className="">
                  <div className="bg-custom-blue h-[500px] rounded-3xl text-white px-3 m-3 border-0 flex flex-col gap-5 py-5 ">
                    <p className="text-2xl">{item.title}</p>
                    <p className="text-justify">{item.description}</p>
                    <Readmore color="bg-white" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
        {/* Pet’s Habits & Advices */}
        <section className="my_container mb-10">
          <div className="bg-custom-yellow flex flex-wrap-reverse lg:flex-nowrap justify-around rounded-3xl ">
            <img src={Habits} alt="" className="rounded-3xl" />
            <div className="w-200 pt-5  flex flex-col gap-3  lg:gap-10 pe-4">
              <p className="xl:text-4xl md:text-3xl  text-2xl pt-8 px-4 ">
                Pet’s Habits & Advices
              </p>
              <p className="xl:text-2xl md:text-2xl text-lg px-4 ">
                Why Dogs Bark and Curbing Excessive Barking
              </p>
              <p className="xl:text-2xl md:text-xl text-sm px-4 ">
                No one should expect a dog to never bark. That’s as unreasonable
                as expecting a child to never talk. But some dogs bark
                excessively. If that’s a problem in your home, the first step is
                figuring out what causes your dog to bark too much. Once you
                know why they are barking, you can start to treat their barking
                problem.
              </p>
              <div className="flex px-4   justify-center lg:justify-end my-3 lg:me-5">
                {" "}
                <Readmore color="bg-white" />
              </div>
            </div>
          </div>
        </section>
        {/* Shop */}
        <section className="my_container mb-10 ">
          <div className=" bg-custom-pink rounded-3xl ">
            <div className="flex justify-center  md:justify-between  text-center pt-5 md:px-15">
              <p className="xl:text-[40px] lg:text-3xl md:text-2xl text-2xl   ">
                Shop
              </p>
              <a href="" className="hidden md:block">
                {" "}
                <div className="flex justify-center flex-nowrap text-center gap-3   ">
                  <img src={View_more_left} alt="" className="h-10 " />
                  <p className="xl:text-2xl md:text-lg sm:text-md font-bold cursor-pointer ">
                    {" "}
                    View More
                  </p>
                  <img src={View_more_right} alt="" className="h-10 " />
                </div>
              </a>
            </div>
            {/* Products */}
            <div className=" md:px-10 xl:px-10 sm:px-5 px-5">
              <Swiper
                className="mySwiper mt-5  "
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                  1200: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                  },
                }}
                spaceBetween={40}
                loop={true}
                
                autoplay={{ delay: 1500 }}
              >
                {Products.map((item) => (
                  <SwiperSlide className="rounded-3xl py-5 ">
                    <div className="flex justify-between flex-col gap-2 h-70">
                      <div>
                        <p className="text-3xl pt-5 ps-2">{item.title}</p>

                        <div className="flex justify-center pt-5">
                          <div className="">
                            <img
                              src={item.icon}
                              alt=""
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center px-4">
                        <button className="bg-black text-white cursor-pointer rounded-full xl:px-15 px-15 md:px-8 py-3">
                          Shop
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="w-full overflow-hidden lg:hidden  ">
              <img src={Shop} alt="" className="w-full h-auto object-cover" />
            </div>
            <div className="lg:flex justify-between xl:me-10 hidden lg:pe-4 ">
              <img src={Shop} alt="" className="w-full lg:pe-4 pe-0" />

              <Swiper
                className="mySwiper mt-35 lg:mb-40   "
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                breakpoints={{
                  1024: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  1300: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                }}
                spaceBetween={10}
                loop={true}
               
                autoplay={{ delay: 1500 }}
              >
                {Products.map((item) => (
                  <SwiperSlide className="rounded-3xl py-5 xl:ms-2   ">
                    <div className="flex justify-between flex-col gap-2 h-70  ">
                      <div>
                        <p className="text-3xl pt-5 ps-2">{item.title}</p>

                        <div className="flex justify-center pt-5">
                          <div className="">
                            <img
                              src={item.icon}
                              alt=""
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center px-4">
                        <button className="bg-black cursor-pointer text-white rounded-full xl:px-15 px-15 md:px-8 py-3">
                          Shop
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

        {/* Blog */}
        <section className="my_container mb-10">
          <div className="bg-[#CBC5C5] rounded-3xl ">
            <div className="flex justify-center  md:justify-between text-center pt-5 md:pt-10 lg:pt-15 md:px-15">
              <p className="xl:text-[40px] lg:text-3xl md:text-2xl text-2xl   ">
                Blog
              </p>
              <a href="" className="hidden md:block">
                {" "}
                <div className="flex justify-center flex-nowrap text-center gap-3   ">
                  <img src={View_more_left} alt="" className="h-10 " />
                  <p className="xl:text-2xl md:text-lg sm:text-md font-bold  ">
                    {" "}
                    View More
                  </p>
                  <img src={View_more_right} alt="" className="h-10 " />
                </div>
              </a>
            </div>
            <div className="flex flex-col md:ps-15 xl:gap-20 gap-3 lg:py-0">
              <p className="md:py-10 p-5 xl:pt-10  text-2xl lg:text-[40px]">
                Don’t forget to take care of your pets !
              </p>

              <div className="flex md:flex-nowrap flex-wrap px-5   sm:px-0 lg:px-0">
                <Swiper
                  className="mySwiper     "
                  breakpoints={{
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    1300: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                  }}
                  spaceBetween={10}
                  loop={true}
                  modules={[Pagination, Autoplay]} 
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 1500 }}
                >
                  <SwiperSlide className="rounded-3xl">
                    <div className=" ">
                      <img src={Barking} alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="rounded-3xl">
                    <div className=" ">
                      <img src={Socialize} alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="rounded-3xl">
                    <div className=" ">
                      <img src={Nutirition} alt="" />
                    </div>
                  </SwiperSlide>
                </Swiper>
                <img
                  src={Blog}
                  alt=""
                  className="rounded-3xl lg:w-65 xl:w-100  hidden md:block"
                />
              </div>
              <img src={Blog} alt="" className="rounded-3xl -mr-5 sm:hidden" />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default Home;
