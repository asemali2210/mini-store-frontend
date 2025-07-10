"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/style/core/global.scss";
import "react-loading-skeleton/dist/skeleton.css";

import { store } from "@/store/store";
import { Provider, useSelector } from "react-redux";
import { Oswald, Lato, Quicksand, Anton } from "next/font/google";
const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"] });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"] });
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });

export default function ProvidersWrapper({ children }) {
  return (
    <Provider store={store}>
      <div className={`${oswald.className} ${lato.className}`}>{children}</div>
    </Provider>
  );
}
