import Whatsapp from "../assets/images/home/whatsapp.png"
import Instagram from "../assets/images/home/instagram.png"
import Linkdin from "../assets/images/home/linkedin.png"
import Facebook from "../assets/images/home/facebook.png"


function Footer() {
  return (
    <>
      <section className="my_container mb-10">
        <div className="flex flex-wrap justify-between px-30">
          <div className="flex flex-col gap-10">
            <p className="text-3xl">take care of your pets !</p>
            <p className="text-xl">Befriend Us</p>
            <div className="flex gap-5">
               <a href=""> <img src={Instagram} alt="" className="w-15" /></a>
                <a href=""><img src={Whatsapp} alt="" className="w-15" /></a>
               <a href=""> <img src={Facebook} alt="" className="w-15" /></a>
               <a href=""> <img src={Linkdin} alt="" className="w-15" /></a>
            </div>
            <p className="text-xl">
              2023 <br />
              By Tamar Okropiridze
            </p>
          </div>
          <div className="flex flex-col justify-end ">
            <p className="text-xl pb-10">MailBox</p>
            <div className="flex gap-10 pb-20">
                <input type="text" className=" border rounded-full h-12 px-4" />
            <button className="bg-custom-orange rounded-full px-20  py-3 text-lg">Submit</button>
            </div>
            <div className="flex justify-end"><p className="text-lg">© 2017 “SmartCare”</p></div>
          </div>

        </div>
      </section>
    </>
  );
}

export default Footer;
