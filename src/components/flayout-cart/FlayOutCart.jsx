"use client";

import useCart from "@/features/cart/useCart";
import ProductCartCard from "../shared/product-cart-card/ProductCartCard";
import "./flay-out-cart.scss";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { BsArrowRightSquare } from "react-icons/bs";
function FlayOutCart({ isCartOpen, setIsCartOpen }) {
  const { items } = useCart();
  const closeCart = () => {
    setIsCartOpen(false);
  };
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);
  return (
    <>
      {isCartOpen && (
        <div className="flyout-cart">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div
              className="overflow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsCartOpen(false)}
            ></motion.div>
            <div className="flayout-body">
              <div className="flayout_cart-header  d-flex align-items-cener justify-content-between">
                <p className="flyout__header">Cart</p>
                <div className="close_flyoutcart" onClick={closeCart}>
                  <BsArrowRightSquare />
                </div>
              </div>
              {items.map((item) => (
                <ProductCartCard
                  cartItem={item}
                  key={item.documentId}
                  variant="flyout"
                />
              ))}
              <button onClick={closeCart}>close</button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default FlayOutCart;
