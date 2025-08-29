"use client";
import FlayOutCart from "@/components/flayout-cart/FlayOutCart";
import Footer from "@/components/footer/Footer";
import MiniNavbar from "@/components/mini-navbar/MiniNavbar";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
export default function MainLayout({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <>
      <MiniNavbar setIsCartOpen={setIsCartOpen} />
      <AnimatePresence>
        {isCartOpen && (
          <FlayOutCart setIsCartOpen={setIsCartOpen} isCartOpen={isCartOpen} />
        )}
      </AnimatePresence>

      <main>{children}</main>
      <Footer />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}
