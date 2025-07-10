"use client";
import "./product-card.scss";
import Image from "next/image";
import { BsCartPlusFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function ProductCard({
  src,
  alt,
  title,
  price,
  brand,
  stock,
  stockQuantity,
  discount,
  slug,
}) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/products/${slug}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // prevent navigating to product
    console.log("🛒 Add to cart clicked for", title);
  };

  return (
    <div className="product-card" onClick={handleCardClick} role="button">
      <div className="product-overlay"></div>

      <div className={`${brand ? "d-block" : "d-none"} product-brand`}>
        {brand}
      </div>

      <div className="product-image">
        <Image
          src={src}
          alt={alt}
          width={250}
          height={250}
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      <div className="product-mid d-flex justify-content-between align-items-center">
        <div className="product-stock">
          {stock ? (
            <p className="--in-stock">In Stock: {stockQuantity}</p>
          ) : (
            <p className="--out-of-stock">Sold Out</p>
          )}
        </div>
      </div>

      <div className="product-bottom">
        <p className="product-title">{title}</p>
        <p className="product-price">
          ${discount} <span className="price">${price}</span>
        </p>
      </div>

      <div className="product-card__cart">
        <button className="btn product-card-_btn" onClick={handleAddToCart}>
          Add To Cart <BsCartPlusFill />
        </button>
      </div>
    </div>
  );
}
