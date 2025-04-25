import { Droplet, User, Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const [isScroll, setIsScroll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={`z-10 py-4 md:py-4 fixed w-full transition-all duration-500 ease-in ${
        isScroll
          ? "bg-[#1B4965]"
          : location.pathname === "/"
          ? "bg-transparent"
          : "bg-[#1B4965]"
      }`}
    >
      <ul
        className={`flex flex-row justify-between ${
          isScroll && "justify-end"
        } md:px-10 px-2 text-white font-jakarta items-center`}
      >
        <li
          className={`transition-all duration-700 ease-in-out ${
            isScroll
              ? "opacity-0 scale-50 translate-y-[10px] absolute pointer-events-none"
              : "opacity-100 scale-100 translate-y-0 relative"
          }`}
        >
          {" "}
          <Link
            to={"/"}
            className="flex flex-row gap-2 items-center text-[20px] md:text-[28px] font-bold bg-white/90 px-2  rounded-full"
          >
            {" "}
            {/* <Droplet size={30} /> */}
            <img
              src="/logo.png"
              alt="logo"
              className="md:w-16 md:h-20 w-8 h-12"
            />
            {/* NGW */}
          </Link>
        </li>
        <ul className="md:flex md:flex-row hidden gap-8 items-center text-[16px]">
          <li
            onClick={() => {navigate("/")}}
            className="hidden md:block hover:text-blue-100 cursor-pointer"
          >
            Home
          </li>
          <li className="hidden md:block hover:text-blue-100 cursor-pointer">
            About Us
          </li>
          {/* professionals dropdown */}
          <li className="hidden md:block group relative">
            <span className="cursor-pointer hover:text-blue-100 transition-colors">
              Professionals
            </span>
            <div className="absolute left-0 top-full mt-1 w-56 bg-white shadow-lg rounded-md py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <a
                href="/register/hydrogeologist"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                Licensed Hydrogeologist
              </a>
              <a
                href="/register/engineer"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                Licensed Water / Civil Engineer
              </a>
              <a
                href="/register/drilling-contractor"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                Licensed Driller
              </a>
              <a
                href="/register/drilling-contractor"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                Licensed Contractor
              </a>
              <a
                href="/register/drilling-contractor"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                Licensed Drilling Company
              </a>
            </div>
          </li>
          <li className="hidden md:block hover:text-blue-100 cursor-pointer">
            Press
          </li>
          <li className="hidden md:block hover:text-blue-100 cursor-pointer">
            Contact
          </li>
          <li
            onClick={() => navigate("/feedback")}
            className="hidden md:block hover:text-blue-100 cursor-pointer"
          >
            Feedback
          </li>

          <li className="flex flex-row md:gap-6 gap-2">
            <button>
              <Link to={"/login"}>Log in</Link>
            </button>
            <button>
              <Link to={"/login?signup=true"}>Sign Up</Link>
            </button>
          </li>
        </ul>

        {/* Mobile Navigation Trigger */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <X className="w-6 h-6" /> // Close icon when open
          ) : (
            <div className="relative w-6 h-6">
              {/* Doughnut icon made with CSS
              <div className="absolute inset-0 rounded-full border-2 border-current"></div>
              <div className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-current transform -translate-x-1/2 -translate-y-1/2"></div> */}
              <Menu />
            </div>
          )}
        </button>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute right-4 top-16 bg-white shadow-xl rounded-lg w-64 z-50 border border-gray-200 text-black">
            <ul className="py-2">
              <li className="px-4 py-3 hover:bg-blue-50 border-b border-gray-100">
                <Link onClick={() => isOpen(false)} to="/" className="block">
                  Home
                </Link>
              </li>
              <li className="px-4 py-3 hover:bg-blue-50 border-b border-gray-100">
                <Link onClick={() => isOpen(false)} to="/about" className="block">
                  About Us
                </Link>
              </li>

              {/* Professionals Dropdown */}
              <li className="px-4 py-3 hover:bg-blue-50 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <span>Professionals</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <ul className="ml-4 mt-2 space-y-2">
                  <li>
                    <Link
                      to="/"
                      onClick={() => isOpen(false)}
                      className="block py-1 text-sm hover:text-blue-600"
                    >
                      Licensed Hydrogeologist
                    </Link>
                  </li>
                  <li>
                    <Link
                    onClick={() => isOpen(false)}
                      to="/"
                      className="block py-1 text-sm hover:text-blue-600"
                    >
                      Licensed Water / Civil Engineer
                    </Link>
                  </li>
                  <li>
                    <Link
                    onClick={() => isOpen(false)}
                      to="/"
                      className="block py-1 text-sm hover:text-blue-600"
                    >
                      Licensed Driller
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      onClick={() => isOpen(false)}
                      className="block py-1 text-sm hover:text-blue-600"
                    >
                      Licensed Contractor
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      onClick={() => isOpen(false)}
                      className="block py-1 text-sm hover:text-blue-600"
                    >
                      Licensed Drilling Company
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="px-4 py-3 hover:bg-blue-50 border-b border-gray-100">
                <Link to="/feedback" className="block" onClick={() => isOpen(false)}>
                  Feedback
                </Link>
              </li>
              <li className="px-4 py-3 hover:bg-blue-50 border-b border-gray-100">
                <Link to="/" className="block" onClick={() => isOpen(false)}>
                  Press
                </Link>
              </li>
              <li className="px-4 py-3 hover:bg-blue-50 border-b border-gray-100">
                <Link to="/" className="block" onClick={() => isOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>

            <div className="px-4 py-3 flex flex-col gap-3 border-t border-gray-100">
              <Link
                to="/login"
                onClick={() => isOpen(false)}
                className="block w-full text-center py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/dashboard"
                onClick={() => isOpen(false)}
                className="block w-full text-center py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </ul>
    </section>
  );
}

export default Header;
