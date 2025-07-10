"use client";
import Features from "@/components/features/Features";
import HeroHome from "@/components/hero-home/HeroHome";
import ProductsRow from "@/components/shared/products-row/ProductsRow";
import MainLayout from "@/layout/MainLayout";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchAllProducts,
  filterAppleProducts,
} from "@/features/products/productsSlice";

export default function Home() {
  const dispatch = useDispatch();

  const { products, appleProducts, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchAllProducts()).then(() => {
      dispatch(filterAppleProducts());
    });
  }, [dispatch]);

  return (
    <MainLayout>
      <HeroHome />
      <Features />
      <ProductsRow
        href="/"
        title="Apple Products"
        products={appleProducts.slice(0, 4)}
        linkTo="Go to Shop"
        loading={loading}
        error={error}
      />
      <ProductsRow
        href="/"
        title="All  Products"
        products={products}
        linkTo="Go to Shop"
        loading={loading}
        error={error}
      />
    </MainLayout>
  );
}
