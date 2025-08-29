"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegWindowClose } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { STRAPI_API_URL } from "@/lip/strapi.config";
import useStrapiData from "@/hooks/useStrapiData";
import { FaAngleDown } from "react-icons/fa6";
import { useCallback, useEffect, useState } from "react";
import Logo from "@/../public/logo.svg";
import Image from "next/image";
import { PiShoppingCartSimple } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "@/features/ca/categoriesSlice";
export default function MobileMenu({ setIsCartOpen, setIsOpen }) {
  /* Fetch categories for the “Shop” dropdown  */
  /* const { data, loading, error } = useStrapiData("categories?populate=*"); */
  /* Local state to track which dropdown is open */
  const [openMenu, setOpenMenu] = useState();
  /* load categories for mobile menu */
  const dispatch = useDispatch();
  const { list: categories } = useSelector((state) => state.categories);
  // Memoize toggleMenu to avoid re-renders
  const toggleMenu = useCallback(
    (menu) => {
      setOpenMenu(openMenu === menu ? null : menu);
    },
    [openMenu]
  );
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories, setIsCartOpen]);
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
          <li className="mobile-menu__logo">
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
                    {categories?.map((category) => (
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

          <div className="menu-bottom">
            <li className="mobile-menu__link">
              <div onClick={() => setIsCartOpen(true)}>
                Cart <PiShoppingCartSimple className="__icon" />
              </div>
            </li>
            <li className="mobile-menu__link">
              <Link href="/wishlist" onClick={() => setIsOpen(false)}>
                wishlist
                <FaRegHeart className="__icon" />
              </Link>
            </li>
            <li className="mobile-menu__sign-in">
              <Link href="/signin" onClick={() => setIsOpen(false)}>
                signin
              </Link>
            </li>
          </div>
        </ul>
        <div className="mobile-menu__close" onClick={() => setIsOpen(false)}>
          <FaRegWindowClose />
        </div>
      </motion.div>
    </>
  );
}
