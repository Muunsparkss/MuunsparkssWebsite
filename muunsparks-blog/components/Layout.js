import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false); // Default: hidden on mobile

  useEffect(() => {
    // Runs only on the client side
    if (window.innerWidth >= 800) {
      setIsOpen(true); // Show navbar by default on larger screens
    }
  }, []); // Runs once after initial render

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex main_container">
        {/* Navbar */}
        <div className={`nav-div ${
      isOpen ? "block" : "hidden"
    }`}>
        <Navbar />
        </div>
        <div className="button-wrapper">
        <button onClick={handleClick} className="nav-menu-button">
          <FontAwesomeIcon icon={faBars} size="2x" color="black" />
        </button>
        </div>
      {/* Main Content */}
      <main className="p-8 w-full page-content overflow-scroll overflow-x-hidden main-app justify-items-center">{children}</main>
    </div>
  );
}