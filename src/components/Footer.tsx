import Whatsapp from "../assets/images/home/whatsapp.png"
import Instagram from "../assets/images/home/instagram.png"
import Linkdin from "../assets/images/home/linkedin.png"
import Facebook from "../assets/images/home/facebook.png"


function Footer() {
  return (
    <>
      <section className="my_container mb-10">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 justify-between">
  {/* Left Column */}
  <div className="flex flex-col gap-10">
    <p className="text-3xl">Take care of your pets!</p>
    <p className="text-xl">Befriend Us</p>
    <div className="flex gap-5">
      <a href=""><img src={Instagram} alt="Instagram" className="w-15" /></a>
      <a href=""><img src={Whatsapp} alt="Whatsapp" className="w-15" /></a>
      <a href=""><img src={Facebook} alt="Facebook" className="w-15" /></a>
      <a href=""><img src={Linkdin} alt="LinkedIn" className="w-15" /></a>
    </div>
    <p className="text-xl pb-5">
      2023 <br />
      By Tamar Okropiridze
    </p>
  </div>

  {/* Right Column */}
  <div className="flex flex-col justify-end">
    <p className="text-xl pb-10">MailBox</p>
    <div className="flex gap-10 flex-wrap xl:pb-20 pb-10">
      <input
        type="text"
        placeholder="Enter your email"
        className="border rounded-full h-12 px-4"
      />
      <button className="bg-custom-orange rounded-full  px-23  py-3 text-lg cursor-pointer">
        Submit
      </button>
    </div>
    <div className="flex justify-center lg:justify-end">
      <p className="text-lg">© 2017 “SmartCare”</p>
    </div>
  </div>
</div>

      </section>
    </>
  );
}

export default Footer;
