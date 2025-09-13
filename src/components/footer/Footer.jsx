import "./footer.scss";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/logo.svg";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer py-4 py-md-5">
      <div className="container">
        {/* Top row: Logo and Navigation links */}
        <div className="footer__top row align-items-center g-3 g-md-4 pb-3 pb-md-4">
          <div className="col-12 col-md-4 footer__brand d-flex d-md-block justify-content-center justify-content-md-start">
            <Link href="/" className="footer__logo" aria-label="Mini Store Home">
              <Image src={Logo} alt="Mini Store Logo" priority />
            </Link>
          </div>
          <div className="col-12 col-md-8">
            <ul className="footer__links d-flex flex-wrap gap-3 gap-md-4 justify-content-center justify-content-md-end m-0">
              <li className="footer__link">
                <Link href="/">Home</Link>
              </li>
              <li className="footer__link">
                <Link href="/">Shop</Link>
              </li>
              <li className="footer__link">
                <Link href="/">Products</Link>
              </li>
              <li className="footer__link">
                <Link href="/blogs">Blog</Link>
              </li>
              <li className="footer__link">
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row: Copyright and Social links */}
        <div className="footer__bottom row align-items-center g-3 g-md-4 pt-3 pt-md-4">
          <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-start">
            <p className="footer__copy m-0">© {year} Mini Store. All rights reserved.</p>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end">
            <ul className="footer__social d-flex align-items-center gap-3 gap-md-4 m-0">
              <li>
                <a href="#" aria-label="Facebook" className="footer__social-link">
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a href="#" aria-label="Twitter" className="footer__social-link">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a href="#" aria-label="Instagram" className="footer__social-link">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a href="#" aria-label="YouTube" className="footer__social-link">
                  <FaYoutube />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

