"use client";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "@/features/cart/cartSlice";

import "./cart.scss";
import ProductCartCard from "@/components/shared/product-cart-card/ProductCartCard";
import useCart from "@/features/cart/useCart";
export default function Cart() {
  const { items } = useCart();
  return (
    <div className="cart__main">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="cart__header">
              <p className="cart__header-content py-4">Cart</p>
            </div>
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-lg-8 col-md-8">
                <div className="cart__products-rows">
                  <div className="row cart__products-headeres">
                    <div className="col-md-6">
                      <p className="row__header">Product</p>
                    </div>
                    <div className="col-md-2">
                      <p className="row__header">Quantity</p>
                    </div>
                    <div className="col-md-2">
                      <p className="row__header">Price</p>
                    </div>
                    <div className="col-md-2">
                      <p className="row__header">Subtotal</p>
                    </div>
                  </div>
                  {items?.map((cartItem) => (
                    <ProductCartCard
                      cartItem={cartItem}
                      key={cartItem.id}
                      cartId={cartItem.id}
                      variant="cart"
                    />
                  ))}
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="cart__checkBox">cart__checkBox...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
