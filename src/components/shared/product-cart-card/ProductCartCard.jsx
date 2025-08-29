"use client";
import Image from "next/image";
import { getImageUrl } from "@/lip/strapi.config";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { updateQuantity } from "@/features/cart/cartSlice";
import useCartActions from "@/features/cart/useCartActions";
import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { motion } from "framer-motion";
import "./product-cart-card.scss";

export default function ProductCartCard({ cartItem, variant }) {
  const dispatch = useDispatch();
  const { handleIncrease, handleDecrease, removeCartItem } = useCartActions();

  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const [subTotal, setSubTotal] = useState(quantity * cartItem?.product?.price);

  // Debounced quantity updater (useful for input typing)
  const debouncedUpdateQuantity = useCallback(
    debounce((newQty) => {
      dispatch(
        updateQuantity({ documentId: cartItem.documentId, quantity: newQty })
      );
      setIsUpdating(false);
    }, 100),
    [cartItem.documentId]
  );

  // Handle quantity input change
  const handleInputChange = (e) => {
    const newQty = parseInt(e.target.value);
    if (!isNaN(newQty) && newQty > 0) {
      setQuantity(newQty);
      debouncedUpdateQuantity(newQty);
      setIsUpdating(true);
    }
  };

  // Manual decrease
  const decrease = () => {
    handleDecrease({
      itemId: cartItem.documentId,
      quantity: cartItem.quantity,
    });
  };

  // Manual increase
  const increase = () => {
    handleIncrease({
      itemId: cartItem.documentId,
      quantity: cartItem.quantity,
    });
  };

  // Remove item
  const removeItem = () => {
    removeCartItem({
      itemId: cartItem.documentId,
      title: cartItem.product.title,
    });
  };

  // Sync subtotal and quantity from cart
  useEffect(() => {
    setQuantity(cartItem.quantity);
    setSubTotal(cartItem.quantity * cartItem.product.price);
  }, [cartItem.quantity, cartItem.product.price]);

  // =====================
  // === Cart Page View ===
  // =====================

  if (variant === "cart") {
    return (
      <div className={`product__cart__card --${variant} py-4`}>
        <div className="row align-items-center" key={cartItem.id}>
          {/* Product Image */}
          <div className="col-md-2">
            <div className="product__image d-flex flex-grow-1">
              <Image
                className="img-fluid"
                width={250}
                height={250}
                src={getImageUrl(cartItem?.product?.images[0])}
                alt="Product Image"
                quality={100}
                style={{
                  width: "100px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="col-md-4">
            <div className="gap-3 py-2 flex-column justify-content-between">
              <p className="product__title">{cartItem.product.title}</p>
              {cartItem.product.discount_price && (
                <p className="product__discount_price">
                  Instead of: <span>{cartItem.product.discount_price}</span>
                </p>
              )}
              <button
                onClick={removeItem}
                className="m-0 btn product__remove__btn d-flex align-items-center"
              >
                <span className="__icon">
                  <IoMdClose />
                </span>
                Remove
              </button>
            </div>
          </div>

          {/* Quantity Control */}
          <div className="col-md-2">
            <div className="product__quantity d-flex align-items-center">
              <button onClick={decrease}>
                <AiOutlineMinus />
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleInputChange}
                disabled={isUpdating}
              />
              <button onClick={increase}>
                <AiOutlinePlus />
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="col-md-2">
            <p className="product__price">${cartItem.product.price}</p>
          </div>

          {/* Subtotal */}
          <div className="col-md-2">
            <motion.p
              key={subTotal}
              className="product__subtotal"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              ${subTotal.toFixed(2)}
            </motion.p>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // === Flyout Cart View ===
  // =========================
  if (variant === "flyout") {
    return (
      <div
        className={`product__cart__card d-flex justify-content-between --${variant}`}
      >
        {/* Image */}
        <div className="product__image">
          <Image
            className="img-fluid"
            width={150}
            height={150}
            src={getImageUrl(cartItem.product.images[0])}
            alt="Product Image"
            quality={100}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Middle Content */}
        <div className="product__mid-content ms-3">
          <p className="product__title">{cartItem.product.title}</p>
          <p className="product__subtotal">Subtotal: ${subTotal.toFixed(2)}</p>
          <div className="product__quantity d-flex align-items-center">
            <button onClick={decrease}>
              <AiOutlineMinus />
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleInputChange}
              disabled={isUpdating}
            />
            <button onClick={increase}>
              <AiOutlinePlus />
            </button>
          </div>
        </div>

        {/* End Content */}
        <div className="product__end-content">
          <p className="product__price">${cartItem.product.price}</p>
          <button onClick={removeItem} className="remove__btn">
            <IoMdClose />
          </button>
        </div>
      </div>
    );
  }

  return null;
}
