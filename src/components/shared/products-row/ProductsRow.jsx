import "./product-row.scss";

import Link from "next/link";
import ProductCard from "./ProudctCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
export default function ProductsRow({
  title,
  href,
  linkTo,
  products = [],
  loading,
  error,
}) {
  if (error)
    return (
      <ErrorMessage
        message="Something went wrong while loading Products"
        onRetry={() => location.reload()}
      />
    );
  if (loading === "pending" || loading === "idle") {
    return (
      <>
        <div className="products-row">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="row-top mb-3 d-flex justify-content-between align-items-center">
                  <p className="row-title">{title}</p>
                  <Link href={href} className="row-link">
                    {linkTo}
                  </Link>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-6 col-sm-4 col-md-3 product-card_custom-col">
                    <ProductCardSkeleton />
                  </div>
                  <div className="col-6 col-sm-4 col-md-3 product-card_custom-col">
                    <ProductCardSkeleton />
                  </div>
                  <div className="col-6 col-sm-4 col-md-3 product-card_custom-col">
                    <ProductCardSkeleton />
                  </div>
                  <div className="col-6 col-sm-4 col-md-3 product-card_custom-col">
                    <ProductCardSkeleton />
                  </div>
                  <div className="col-6 col-sm-4 col-md-3 product-card_custom-col">
                    <ProductCardSkeleton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="products-row">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="row-top mb-3 d-flex justify-content-between align-items-center">
              <p className="row-title">{title}</p>
              <Link href={href} className="row-link">
                {linkTo}
              </Link>
            </div>
          </div>
          <div className="col-12">
            <div className="row">
              {products?.map((product) => (
                <div
                  className="col-6 col-sm-4 col-md-3 product-card_custom-col"
                  key={product.id}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
