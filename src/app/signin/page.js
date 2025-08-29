"use client";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/features/auth/authThunk";
export default function SignIn() {
  const dispatch = useDispatch();
  const register = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({
        username: "lolbas14@gmail.com",
        email: "lolbas14@gmail.com",
        password: "12345678",
      })
    );
    console.log("sa");
  };
  return (
    <>
      <button className="" onClick={register}>
        signIn
      </button>
    </>
  );
}
