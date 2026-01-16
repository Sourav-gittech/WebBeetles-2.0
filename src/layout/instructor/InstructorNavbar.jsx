import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const InstructorNavbar = () => {
  const [isOpen, setIsOpen] = useState(false),
    [activeDropdown, setActiveDropdown] = useState(null),
    [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      {/* Top Instructor navbar */}
      <nav
        className={`w-full text-white fixed top-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/30 backdrop-blur-md" : "bg-transparent"
          }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-md rounded-lg sm:rounded-xl lg:rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-sm sm:text-lg lg:text-2xl font-bold">
                  W
                </span>
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold">
                WebBeetles
              </span>
            </div>

            {/* Desktop Menu */}
            {/* Unified Tablet + Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 xl:space-x-8">
              <Link to="/instructor/"
                className="relative text-white font-medium text-base xl:text-lg after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </Link>
              <Link to="/instructor/about"
                className="relative text-white font-medium text-base xl:text-lg after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                About
              </Link>

              <Link to="/instructor/contact"
                className="relative text-white font-medium text-base xl:text-lg after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Contact
              </Link>
            </div>


            {/* Let's Start Button (Desktop + Tablet) */}
            <div className="hidden md:block">
              <Link
                to="/instructor/signin"
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-semibold hover:bg-white/40 transition-all duration-300 transform hover:scale-105 text-sm lg:text-base"
              >
                Let's Start
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-gray-200 transition-colors p-1"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={handleNavClick}
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-gray-900 to-black text-white z-50 md:hidden shadow-2xl flex flex-col"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg font-bold">W</span>
                </div>
                <span className="text-xl font-bold">WebBeetles</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-300 transition-colors p-1"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-1">
              {/* Home & About */}
              {[{ id: 1, title: "Home", url: "/instructor/" },
              { id: 2, title: "About Us", url: "/instructor/about" },
              { id: 2, title: "Contact", url: "/instructor/contact" }].map((item) => (
                <Link
                  key={item.id}
                  to={item.url}
                  className="block text-white hover:text-purple-300 hover:bg-white/5 transition-all duration-200 font-medium py-4 px-4 rounded-lg"
                  onClick={handleNavClick}
                >
                  {item.title}
                </Link>
              ))}

              {/* Let's Start / Profile */}
              <div className="mt-6">
                <Link
                  to="/instructor/signin"
                  className="block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-4 rounded-xl font-semibold text-center transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={handleNavClick}
                >
                  Let's Start
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InstructorNavbar;