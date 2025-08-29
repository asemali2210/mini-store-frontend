"use client";
import useStrapiData from "@/hooks/useStrapiData";
import "./sale-section.scss";
import { getImageUrl } from "@/lip/strapi.config";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
export default function SaleSection() {
  const { data, loading, error } = useStrapiData("sale-home?populate=*");
  return (
    <div className="sale__section py-5">
      <div className="container-fluid">
        <div className="row align-itemscenter">
          <div className="col-md-6 m-0 p-0">
            <Image
              src={getImageUrl(data?.data.leftImg)}
              alt="product"
              className="img-fluid w-100"
              width={450}
              height={250}
            />
          </div>
          <div className="col-md-6 bg-light-gray d-flex align-items-center">
            <div className="sale__righ-contact px-5 p-3 d-flex flex-column row-gap-3">
              <p className="top__heading"> UP TO 35% OFF</p>
              <p className="heading ">
                {data?.data.heading1} <br /> {data?.data.heading2}
              </p>
              <p className="sub__heading">{data?.data.subHeading}</p>
              <Link href="/" className="__link">
                Shop Now <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
