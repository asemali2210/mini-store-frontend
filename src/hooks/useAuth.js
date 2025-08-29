import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "@/features/auth/authSlice";

export default function useAuth() {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user && localStorage.getItem("jwt")) {
      dispatch(fetchCurrentUser());
    }
  }, [user, dispatch]);

  return {
    user,
    status,
    isAuthenticated: status === "authenticated",
  };
}
