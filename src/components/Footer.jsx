import { Link } from "react-router-dom";
import { Droplet, MapPin, MailIcon, Phone } from "lucide-react";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
function Footer() {
  return (
    <section className="bg-[#0B3B5B] pt-10 md:px-15 px-5 flex flex-row gap-10 md:gap-26 md:flex-wrap flex-wrap">
      <ul className="flex flex-col gap-4 md:w-auto w-full mb-10 ">
        <li className="">
          {" "}
          <Link
            to={"/"}
            className="flex flex-row gap-2 items-center text-sm md:text-[24px] font-bold text-[#FFFFFF]"
          >
            {" "}
            <div className="bg-white rounded-full px-2">
              {/* <Droplet size={20} /> */}
              <img src="/logo.png" alt="logo" className="w-10 h-14 object-fit"/>
            </div>
            NGW
          </Link>
        </li>
        <li className="text-[#DBEAFE] md:w-70 w-50 text-xs md:text-[16px]">
          We are dedicated to providing innovative solutions that empower
          businesses and individuals to achieve their digital goals.
        </li>
        <li className="text-[#DBEAFE] flex flex-row gap-2">
          <FaTwitter className="fill-current" />{" "}
          <FaFacebook className="fill-current" /> <FaInstagram />{" "}
          <FaLinkedin className="fill-current" />
        </li>
      </ul>
      <ul className="text-[#DBEAFE] mb-10">
        <li className="font-bold text-sm md:text-[16px] pb-4 text-[#FFFFFF]">
          Quick Links
        </li>
        <li className="pb-2 text-xs md:text-[16px]">Home</li>
        <li className="pb-2 text-xs md:text-[16px]">About Us</li>
        <li className="pb-2 text-xs md:text-[16px]">Services</li>
        <li className="pb-2 text-xs md:text-[16px]">Contact</li>
        <li className="pb-2 text-xs md:text-[16px]">Blog</li>
      </ul>
      <ul className="text-[#DBEAFE]">
        <li className="font-bold text-sm md:text-[16px] pb-4 text-[#FFFFFF]">
          Resources
        </li>
        <li className="pb-2 text-xs md:text-[16px]">Documentation</li>
        <li className="pb-2 text-xs md:text-[16px]">Help Center</li>
        <li className="pb-2 text-xs md:text-[16px]">Privacy Policy</li>
        <li className="pb-2 text-xs md:text-[16px]">Terms of Service</li>
        <li className="pb-2 text-xs md:text-[16px]">FAQ</li>
      </ul>
      <ul className="text-[#DBEAFE]">
        <li className="font-bold text-sm md:text-[16px] pb-4 text-[#FFFFFF]">
          Contact Us
        </li>
        <li className="flex flex-row gap-4 items-center pb-2 text-xs md:text-[16px]">
          <MapPin className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#FFFFFF]" />{" "}
          123 Business Street <br />
          Suite 100 <br />
          San Francisco{" "}
        </li>
        <li className="flex flex-row gap-4 items-center pb-2 text-xs md:text-[16px]">
          <MailIcon className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#FFFFFF]" />
          contact@company.com
        </li>
        <li className="flex flex-row gap-4 items-center pb-2 text-xs md:text-[16px]">
          <Phone
            className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 fill-white"
          />
          +1 (555) 123-4567
        </li>
      </ul>
      <ul className="w-full flex flex-row text-[#DBEAFE] text-[7px] md:text-sm mt-6 border-t border-[#1E40AF] md:p-4 pt-4 pb-4 px-1 justify-between">
        <li>© 2025 Company Name. All rights reserved.</li>
        <li className="flex flex-row gap-4">
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>Cookie Policy</p>
        </li>
      </ul>
    </section>
  );
}

export default Footer;
