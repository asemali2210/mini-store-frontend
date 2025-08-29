import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateQuantity } from "./cartSlice";
import { toast } from "react-toastify";

function useCart() {
  const { user, isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [isAuthenticated]);
  return {
    items,
  };
}

export default useCart;
