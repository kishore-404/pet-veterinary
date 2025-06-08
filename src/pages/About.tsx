import Header from "../components/Header";
import Footer from "../components/Footer";
import Our_story from "../assets/images/about/our_story.png";
import Readmore from "../components/Readmore";
import Paw6 from "../assets/images/pawss 6.png";
import SmartFamily from "../assets/images/about/smart_family.png";
import SmartTeam from "../assets/images/about/smart_team.png";
import Team from "../components/Team";
function About() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      {/* Our Story */}
      <section className="my_container xl:pt-20 pt-8 mb-10">
        <div className="grid grid-cols-12">
          <div className="lg:col-span-6 col-span-12">
            <div className="flex lg:hidden justify-center items-center pb-5 gap-5 xl:pt-10">
              {" "}
              <img src={Paw6} alt="" className="w-20" />
              <p className="md:text-3xl   text-2xl">Our Story</p>
            </div>
            <img src={Our_story} className="w-full " alt="" />
          </div>
          <div className="lg:col-span-6 col-span-12 lg:ms-12">
            <div className="lg:flex hidden justify-center items-center gap-5 xl:pt-10">
              {" "}
              <img src={Paw6} alt="" />
              <p className="xl:text-6xl md:4xl text-2xl">Our Story</p>
            </div>
            <p className="lg:text-right pt-10 lg:pt-0 xl:pt-10 text-sm xl:text-base ">
              Mauris commodo lacinia nisl, ut sodales ex vestibulum sed. Sed
              cndimentum, nibh vitae dignissim laoreet, ex nisl imperdiet ex, at
              varius magna velit quis purus. Suspendisse at magna congue,
              rhoncus ligula tincidunt, efficitur purus. Vestibulum in vulputate
              odio. Curabitur gravida eleifend nulla, ut pulvinar velit
              ullamcorper et. Nullam venenatis egestas felis in imperdiet.
              Mauris suscipit magna massa, sit amet lobortis nunc consequat
              eget. Pellentesque vestibulum id purus et cursus. Donec id
              elementum lorem. Quisque ornare, tortor ut finibus porttitor, erat
              nibh mattis leo, faucibus rutrum ligula leo a nisl. Nam justo
              lorem, gravida nec{" "}
            </p>
            <div className="flex justify-end pt-10">
              {" "}
              <Readmore />
            </div>
          </div>
        </div>
      </section>
      {/* Join the  SmartCare family */}
      <section className="my_container xl:pt-0 md:pt-8 pt-12 mb-10 bg-custom-orange rounded-3xl">
        <div className="grid grid-cols-12 items-center">
          <div className="lg:col-span-4 col-span-12  lg:order-1 order-2">
            <div className="flex justify-center align-bottom">
              <img src={SmartFamily} alt="" className="lg:pt-27" />
            </div>
          </div>
          <div className="lg:col-span-8 col-span-12 lg:order-2 order-1">
            <div className="flex justify-center flex-col ">
              <p className="text-5xl font-medium text-center  mb-3">Join the</p>
              <p className="text-2xl text-center  mb-3"> SmartCare family</p>
            </div>
            <p className="text-lg text-center    leading-relaxed mx-8">
              We are growing rapidly and have lots of job opportunities, in both
              clinical and non-clinical roles, across Georgia. If you’re
              thinking of moving on from practice ownership, we can help
              safeguard the future of your practice and the people within it.
            </p>
            <div className="flex flex-wrap gap-5 py-5 justify-center">
              {" "}
              <Readmore text="Your Career" />
              <Readmore text="Your Practice" />
            </div>
          </div>
        </div>
      </section>
      {/*View SmartCare Team   */}
      <section className="my_container xl:pt-20 pt-8 mb-10">
        <div className="grid grid-cols-12">
          <div className="lg:col-span-7 col-span-12">
            <p className="text-[40px] pb-8">View SmartCare Team </p>
            <p className="text-[16] pb-8 pe-3">
              Working in collaboration with practices, we care for people, their
              pets and  our profession, and have created a culture of warmth and
              belonging. No two practices are the same. We embrace and encourage
              that independent  spirit, while at the same time supporting
              practices to provide outstanding  care for patients and an
              excellent service for clients.
            </p>
            <Readmore text="See Team" />
          </div>
          <div className="lg:col-span-5 col-span-12">
            <img src={SmartTeam} alt="" className="w-full pt-5 lg:pt-0" />
          </div>
        </div>
      </section>
      <Team />
      <Footer />
    </div>
  );
}

export default About;
