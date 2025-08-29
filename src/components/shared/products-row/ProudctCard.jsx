"use client";
import "./product-card.scss";
import Image from "next/image";
import { BsCartPlusFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/lip/strapi.config";
import useCartActions from "@/features/cart/useCartActions";
import { Bounce, ToastContainer } from "react-toastify";

export default function ProductCard({ product }) {
  const { addToCartItem } = useCartActions();
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/products/${product.slug}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // prevent navigating to product
    await addToCartItem({ product: product, quantity: Number(1) });
  };
  return (
    <div className="product-card" onClick={handleCardClick} role="button">
      <div className="product-overlay"></div>

      <div className={`${product.brand ? "d-block" : "d-none"} product-brand`}>
        {product.brand.name}
      </div>

      <div className="product-image">
        <Image
          src={
            product.images?.[0]
              ? getImageUrl(product.images[0])
              : "/fallBackImage.jpg"
          }
          alt={product.images?.[0]?.alternativeText || product.title}
          width={250}
          height={250}
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      <div className="product-mid d-flex justify-content-between align-items-center">
        <div className="product-stock">
          {product.stock ? (
            <p className="--in-stock">In Stock: {product.stockQuantity}</p>
          ) : (
            <p className="--out-of-stock">Sold Out</p>
          )}
        </div>
      </div>

      <div className="product-bottom">
        <p className="product-title">{product.title}</p>
        <p className="product-price">
          ${product.price}{" "}
          <span className="price">${product.discount_price}</span>
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
