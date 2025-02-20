import Link from "next/link";
import Image from "next/image";
import Logo from "../public/images/logo.webp";

export default function Navbar() {
  return (
    <div className="h-100 flex-grow relative top-0 left-0 nav-bg text-white p-4 flex flex-col items-center">
      {/* Display the logo */}
      <div className="mb-6 lg-wrapper">
        <Image src={Logo} alt="Logo" className="logo-rounded"/>
      </div>
      {/* Navigation Links */}
      <div className="flex flex-col flex-grow space-y-2">
        <Link href="/" className="navlink">
          Home
        </Link>
        <Link href="/projects" className="navlink">
          Projects
        </Link>
        <Link href="/games" className="navlink">
          Games
        </Link>
        <Link href="/about" className="navlink">
          About
        </Link>
        <Link href="/contact" className="navlink">
          Contact
        </Link>
        <Link href="/support" className="support">
        Support
        </Link>
              {/* Copyright Claim */}
      <div className="mt-6 text-sm text-gray-400 text-center">
        © {new Date().getFullYear()} Muunsparks
      </div>
      </div>
    </div>
  );
}