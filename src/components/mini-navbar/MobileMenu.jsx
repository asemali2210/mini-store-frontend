"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegWindowClose } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { STRAPI_API_URL } from "@/lip/strapi.config";
import useStrapiData from "@/hooks/useStrapiData";
import { FaAngleDown } from "react-icons/fa6";
import { useCallback, useState } from "react";
import Logo from "@/../public/logo.svg";
import Image from "next/image";

export default function MobileMenu({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const { data, loading, error } = useStrapiData("categories?populate=*");
  const [openMenu, setOpenMenu] = useState();
  // Memoize toggleMenu to avoid re-renders
  const toggleMenu = useCallback(
    (menu) => {
      setOpenMenu(openMenu === menu ? null : menu);
      console.log("first");
    },
    [openMenu]
  );
  return (
    <>
      <motion.div
        className="mobile-menu__overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => setIsOpen(false)}
      />
      <motion.div
        key="mobile-menu"
        className="mobile-menu"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <ul className="mobile-menu__links">
          <li className="mobile-menu__link">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Image src={Logo} alt="Mini Store Logo" priority />
            </Link>
          </li>
          <li className="mobile-menu__search">
            <span className="mobile-menu__search-icon">
              <CiSearch />
            </span>
            <input
              className="mobile-menu__input"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </li>

          <li className="mobile-menu__link">
            <Link href="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li
            className={`mobile-menu__dropdown`}
            onClick={() => toggleMenu("shop")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "ArrowDown" && toggleMenu("shop")}
          >
            <p className="mobile-menu__title d-flex justify-content-between align-items-center">
              Shop <FaAngleDown />
            </p>
            <AnimatePresence>
              {openMenu === "shop" && (
                <motion.div
                  key="mobile-menu-drop"
                  className="mobile-menu__dropdown-box"
                  initial={{ height: 0, overflow: "hidden" }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <ul className="mobile-menu__dropdown-list">
                    {data?.data.map((category) => (
                      <li
                        className="mobile-menu__dropdown-item"
                        key={category.id}
                      >
                        <Link href={`/${category.slug}`}>{category.title}</Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          <li className="mobile-menu__link">
            <Link href="/blogs" onClick={() => setIsOpen(false)}>
              Blogs
            </Link>
          </li>
          <li className="mobile-menu__link">
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
        <div className="mobile-menu__close" onClick={() => setIsOpen(false)}>
          <FaRegWindowClose />
        </div>
      </motion.div>
    </>
  );
}
