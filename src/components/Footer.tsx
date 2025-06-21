import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-teal-800 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Business Info */}
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-xl font-semibold">Sea Interior</h2>
          <p>34/B Kabitirtha Sarani, Kidderpore, Kolkata - 700023</p>
          <p>
            Contact:{" "}
            <a href="tel:7439315210" className="text-teal-200 underline">
              7439315210
            </a>
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:workmail.rezaul@gmail.com"
              className="text-teal-200 underline"
            >
              workmail.rezaul@gmail.com
            </a>
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-5 text-xl">
          <a
            href="https://wa.me/7439315210"
            target="_blank"
            className="hover:text-teal-200"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            className="hover:text-teal-200"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:text-teal-200"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Developer Info */}
      <div className="mt-8 text-center text-sm text-zinc-300">
        Developed by <span className="text-teal-200 font-semibold">Rezaul Haque</span>
        <div>
          Email:{" "}
          <a
            href="mailto:workmail.rezaul@gmail.com"
            className="text-teal-200 underline"
          >
            workmail.rezaul@gmail.com
          </a>{" "}
          | Phone:{" "}
          <a href="tel:7439315210" className="text-teal-200 underline">
            7439315210
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-zinc-400 pt-6 border-t border-zinc-700 mt-6">
        &copy; {new Date().getFullYear()} Sea Interior. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;