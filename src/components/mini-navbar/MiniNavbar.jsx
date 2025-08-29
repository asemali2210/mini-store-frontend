"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./mini-navbar.scss";
import Image from "next/image";
import Logo from "@/../public/logo.svg";
import { IoMdSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import MobileMenu from "./MobileMenu";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function MiniNavbar({ setIsCartOpen }) {
  // State to manage mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { user, isAuthenticated, status } = useAuth();
  // Disable body scroll when mobile menu is open

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="mini-navbar p-2 p-md-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-3">
              <Link href="/" className="mini-logo" as="image">
                <Image src={Logo} alt="Mini Store Logo" priority />
              </Link>
            </div>
            <div className="col-6">
              <ul className="mini-navbar__links d-md-flex d-none column-gap-md-3 column-gap-lg-5 justify-content-center">
                <li
                  className={`mini-navbar__link ${
                    pathname === "/" ? "is-active" : ""
                  }`}
                >
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                    Home
                  </Link>
                </li>
                <li
                  className={`mini-navbar__link ${
                    pathname === "/about" ? "is-active" : ""
                  }`}
                >
                  <Link
                    href="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                </li>
                <li
                  className={`mini-navbar__link ${
                    pathname === "/blogs" ? "is-active" : ""
                  }`}
                >
                  <Link
                    href="/blogs"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Blogs
                  </Link>
                </li>
                <li
                  className={`mini-navbar__link ${
                    pathname === "/contact" ? "is-active" : ""
                  }`}
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-3">
              <ul className="mini-navbar__actions d-md-flex d-none column-gap-md-3 column-gap-lg-5 justify-content-center">
                <li className="mini-navbar__actions--item">
                  <Link href="/cart">
                    <IoMdSearch />
                  </Link>
                </li>
                <li className="mini-navbar__actions--item">
                  {isAuthenticated ? (
                    <p className="mini-navbar__user text-capitalize fw-bold text-">
                      {user.username.slice(0, 2)}
                    </p>
                  ) : (
                    <FaUser />
                  )}

                  <Link href="/signin"></Link>
                </li>
                <li className="mini-navbar__actions--item">
                  <button onClick={() => setIsCartOpen(true)}>
                    <FaShoppingCart />
                  </button>
                </li>
              </ul>
              <div className="toggle-menu d-md-none d-flex justify-content-end">
                <button className="toggle-menu__btn" onClick={toggleMobileMenu}>
                  <span className="toggle-menu__icon">
                    <FaBarsProgress />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            isOpen={isMobileMenuOpen}
            setIsOpen={setIsMobileMenuOpen}
            setIsCartOpen={setIsCartOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
}
