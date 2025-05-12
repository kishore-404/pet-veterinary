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
import Barking from "../assets/images/home/barking.png"
import Socialize from "../assets/images/home/socialize.png"
import Nutirition from "../assets/images/home/nutrition.png"
import Blog from "../assets/images/home/blog.png"
import Toy from "../assets/images/home/product-img-1.png"
import Shop from "../assets/images/home/shop.png"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function Home() {
  return (
    <>
      <div className="flex flex-col items-center">
        <Header />
        {/* Banner */}
        <section className="my_container ">
          <div className="flex lg:flex-row gap-4   flex-col-reverse xl:px-5 xl:pt-20 md:pt-8 w-full">
            {/* images */}
            <div className=" lg:w-3/4    flex justify-center">
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
                  <p className="xl:text-5xl md:text-4xl sm:text-3xl text-3xl   ">
                    100+ Reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Welcome to SmartCare */}
        {/* <section className="my_container mb-10">
          <div className="bg-custom-orange border-0 rounded-3xl pb-10">
            <div className="flex justify-center  md:justify-between  text-center pt-5 md:px-15  ">
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
                {Home_smart_care.map((item) => (
                  <div className="bg-white 2xl:w-100 xl:w-80 lg:w-60     rounded-3xl pb-5">
                    <div className="flex justify-around pt-5 ps-4">
                      <p className="text-2xl"> {item.title}</p>
                      <img src={item.icon} alt="" />
                    </div>
                    <p className="text-lg px-10 pt-4 pb-5">
                      {item.description}
                    </p>
                    <div className="flex justify-center">
                      {" "}
                      <Readmore />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section> */}
        {/* Our Company Services   */}
        {/* <section className="my_container mb-10">
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
          <div className="flex flex-wrap lg:flex-nowrap justify-center xl:gap-10 md:gap-5 gap-5 mt-10">
            <div className="bg-custom-blue rounded-3xl xl:px-15 px-5 xl:pt-5 text-white">
              <div className="flex  md:justify-between ">
                <div className="flex flex-col xl:gap-8 md:gap-5 gap-4 py-5 2xl:w-150 md:w-100">
                  <p className="xl:text-4xl md:text-3xl  sm:text-2xl ">
                    Surgery
                  </p>
                  <p className="xl:text-lg md:text-md sm:text-sm ">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latinone of the more obscure Latin words,
                    consectetur, from a Lorem Ipsum passage, and going through
                    the cites of the word in classical literature, discovered
                    the undoubtable source.
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
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latinone of the more obscure Latin words,
                    consectetur, from a Lorem Ipsum passage, and going through
                    the cites of the word in classical literature, discovered
                    the undoubtable source.
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
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latinone of the more obscure Lati
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
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latinone of the more obscure Lati
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
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin liteyears
                    old.Richard McClintock, a Latinone of the more obscure Lati
                    Contrary to popular belief, Lorem Ipsum is not simply ratin
                    literature from 45 BC, making it over 2000 years old.
                    Richard McClintock, a Latinone of the more obscure
                  </p>
                  <div className="flex justify-center">
                    {" "}
                    <BookNow color="bg-black" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* Pet’s Habits & Advices */}
        {/* <section className="my_container mb-10">
          <div className="bg-custom-yellow flex flex-wrap-reverse lg:flex-nowrap justify-around rounded-3xl ">
            <img src={Habits} alt="" className="rounded-3xl" />
            <div className="w-200 pt-5  flex flex-col gap-3  lg:gap-10 pe-4">
              <p className="xl:text-4xl md:text-3xl  text-2xl pt-8 px-4 sm:px-0">Pet’s Habits & Advices</p>
              <p className="xl:text-2xl md:text-2xl text-lg px-4 sm:px-0">Why Dogs Bark and Curbing Excessive Barking</p>
              <p  className="xl:text-2xl md:text-xl text-sm px-4 sm:px-0">
                No one should expect a dog to never bark. That’s as unreasonable
                as expecting a child to never talk. But some dogs bark
                excessively. If that’s a problem in your home, the first step is
                figuring out what causes your dog to bark too much. Once you
                know why they are barking, you can start to treat their barking
                problem.
              </p>
             <div className="flex px-4 sm:px-0  lg:justify-end my-3 lg:me-5"> <Readmore color="bg-white" /></div>
            </div>
          </div>
        </section> */}
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
                <p className="xl:text-2xl md:text-lg sm:text-md font-bold  ">
                  {" "}
                  View More
                </p>
                <img src={View_more_right} alt="" className="h-10 " />
              </div>
            </a>
          </div>
          {/* Products */}
         <div className="flex gap-5">
           <div className="bg-white ms-15 pb-5 mt-10  w-60 rounded-3xl flex flex-col gap-2 px-5 ">
<p className="text-lg pt-5 ps-2">Toys</p>
<img src={Toy} alt="" />
<div className="flex justify-center"><button className="bg-black text-white rounded-full  px-10 py-3">Shop </button></div>
          </div>
           <div className="bg-white ms-15 pb-5 mt-10  w-60 rounded-3xl flex flex-col gap-2 px-5 ">
<p className="text-lg pt-5 ps-2">Toys</p>
<img src={Toy} alt="" />
<div className="flex justify-center"><button className="bg-black text-white rounded-full  px-10 py-3">Shop </button></div>
          </div>
           <div className="bg-white ms-15 pb-5 mt-10  w-60 rounded-3xl flex flex-col gap-2 px-5 ">
<p className="text-lg pt-5 ps-2">Toys</p>
<img src={Toy} alt="" />
<div className="flex justify-center"><button className="bg-black text-white rounded-full  px-10 py-3">Shop </button></div>
          </div>
           <div className="bg-white ms-15 pb-5 mt-10  w-60 rounded-3xl flex flex-col gap-2 px-5 ">
<p className="text-lg pt-5 ps-2">Toys</p>
<img src={Toy} alt="" />
<div className="flex justify-center"><button className="bg-black text-white rounded-full  px-10 py-3">Shop </button></div>
          </div>
           <div className="bg-white ms-15 pb-5 mt-10  w-60 rounded-3xl flex flex-col gap-2 px-5 ">
<p className="text-lg pt-5 ps-2">Toys</p>
<img src={Toy} alt="" />
<div className="flex justify-center"><button className="bg-black text-white rounded-full  px-10 py-3">Shop </button></div>
          </div>
         </div>
         <div className="flex justify-between ">
          <img src={Shop} alt="" />
           <div className="flex gap-3 h-80 pe-10">
           <div className="bg-white ms-15 pb-5 mt-10  w-60 rounded-3xl flex flex-col gap-2 px-5 ">
<p className="text-lg pt-5 ps-2">Toys</p>
<img src={Toy} alt="" />
<div className="flex justify-center"><button className="bg-black text-white rounded-full  px-10 py-3">Shop </button></div>
          </div>
           <div className="bg-white ms-15 pb-5 mt-10  w-60 rounded-3xl flex flex-col gap-2 px-5 ">
<p className="text-lg pt-5 ps-2">Toys</p>
<img src={Toy} alt="" />
<div className="flex justify-center"><button className="bg-black text-white rounded-full  px-10 py-3">Shop </button></div>
          </div>
           <div className="bg-white ms-15 pb-5 mt-10  w-60 rounded-3xl flex flex-col gap-2 px-5 ">
<p className="text-lg pt-5 ps-2">Toys</p>
<img src={Toy} alt="" />
<div className="flex justify-center"><button className="bg-black text-white rounded-full  px-10 py-3">Shop </button></div>
          </div>          
         </div>
         </div>
          </div>
        </section>
        {/* Blog  */}
        {/* <section className="my_container mb-10">
        <div className="bg-[#CBC5C5] rounded-3xl xl:ps-20">
         <div className="flex justify-center  md:justify-between  text-center pt-5 md:px-15">
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
         <div className="flex justify-between">
<div className="flex flex-col  xl:gap-20 md:gap-10 lg:px-15">
           <p className="xl:text-[40px] lg:text-2xl md:text-2xl text-2xl  pt-5">Don’t forget to take care of your pets !</p>
            <div className="grid grid-cols-3 gap-10" >
                <img src={Barking} alt="" />
                <img src={Socialize} alt="" />
                <img src={Nutirition} alt="" />
            </div>
         </div>
         <div>
          <img src={Blog} alt="" />
         </div>
         </div>

        </div>
        </section> */}
         <Swiper className="mySwiper">
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
        <Footer />
      </div>
    </>
  );
}

export default Home;
