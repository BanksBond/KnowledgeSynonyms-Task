import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation(); // Get the current location
  const currPage = location.pathname;
  return (
    <nav className="bg-transparent text-white p-4 flex items-center justify-start ">
      {/* Brand Logo and Name */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-[#00ADB5] rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xl"></span>
        </div>
        <h1 className="text-2xl font-bold ">
          MANAGIFY<span className="text-[#00ADB5] ">.</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <ul className="flex pl-8 space-x-6">
        <li>
          <Link
            to="/"
            className={`${
              currPage === "/" ? "text-[#00ADB5] " : "text-[#7A8392]"
            }  text-lg font-bold hover:text-[#00ADB5] transition-colors duration-300`}
          >
            Create Booking
          </Link>
        </li>
        <li>
          <Link
            to="/list"
            className={`${
              currPage === "/list" ? "text-[#00ADB5] " : "text-[#7A8392]"
            }  text-lg font-bold hover:text-[#00ADB5] transition-colors duration-300`}
          >
            Booking List
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
