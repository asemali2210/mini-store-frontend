import {
  addToCart,
  deleteItemFromCart,
  updateQuantity,
} from "@/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
export default function useCartActions() {
  const dispatch = useDispatch();
  const handleDecrease = ({ itemId, quantity }) => {
    const newQty = Math.max(1, Number(quantity) - 1);
    dispatch(updateQuantity({ documentId: itemId, quantity: newQty }));
    return { newQty };
  };
  const handleIncrease = ({ itemId, quantity }) => {
    const newQty = Math.max(1, Number(quantity) + 1);
    dispatch(updateQuantity({ documentId: itemId, quantity: newQty }));
    return { newQty };
  };

  const removeCartItem = async ({ itemId, title }) => {
    try {
      const res = await dispatch(deleteItemFromCart(itemId)).unwrap();
      toast.warn(`${title} removed successfully`);
      return res;
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };
  const addToCartItem = async ({ product, quantity = 1 }) => {
    try {
      const res = dispatch(
        addToCart({ product: product, quantity: quantity })
      ).unwrap();
      toast.success(`${product.title} Added successfully`);
      return res;
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };
  return {
    handleIncrease,
    handleDecrease,
    removeCartItem,
    addToCartItem,
  };
}
