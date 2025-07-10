"use client";
import useStrapiData from "@/hooks/useStrapiData";
import "./hero-home.scss";
import Image from "next/image";
import { getImageUrl, STRAPI_URL } from "@/lip/strapi.config";
import * as FaIcons from "react-icons/fa";
import Link from "next/link";
import HeroHomeSkeleton from "./HeroHomeSkeleton";
import ErrorMessage from "../shared/ErrorMessage/ErrorMessage";

// 🔹 Get icon component dynamically from react-icons
const getIconComponent = (iconName) => {
  const Icon = FaIcons[iconName];
  return Icon ? <Icon /> : null;
};

export default function HeroHome() {
  const { data, loading, error } = useStrapiData("hero-home?populate=*");

  // 🔸 Show skeleton while loading
  if (loading) return <HeroHomeSkeleton />;

  // 🔸 If error happened, show reusable error component
  if (error)
    return (
      <ErrorMessage
        message="Something went wrong while loading the homepage hero section"
        onRetry={() => location.reload()}
      />
    );

  const heroData = data?.data || {};

  return (
    <div className="hero-home py-5">
      <span className="hero-home__back-text">APPLE</span>
      <div className="container">
        <div className="hero-home__content">
          <div className="row">
            <div className="col-12 mb-5">
              <div className="row row-gap-5 justify-content-between">
                <div className="col-12 col-lg-6">
                  <div className="hero-home__images px-3 d-flex gap-5 justify-content-between">
                    <div className="hero-home__image">
                      {heroData.image_1?.url && (
                        <Image
                          className="img-fluid"
                          width={250}
                          height={250}
                          src={getImageUrl(heroData.image_1)}
                          alt={
                            heroData?.image_1?.data?.attributes
                              ?.alternativeText || "Hero Image 1"
                          }
                          quality={100}
                          style={{
                            width: "250px",
                            height: "auto",
                            objectFit: "contain",
                          }}
                        />
                      )}
                    </div>
                    <div className="hero-home__image">
                      {heroData.image_2?.url && (
                        <Image
                          className="img-fluid"
                          width={250}
                          height={250}
                          src={getImageUrl(heroData.image_2)}
                          alt={
                            heroData?.image_2?.data?.attributes
                              ?.alternativeText || "Hero Image 2"
                          }
                          quality={100}
                          style={{
                            width: "auto",
                            height: "auto",
                            objectFit: "contain",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-5">
                  <div className="hero-home__text">
                    <h1
                      className="hero-home__title"
                      aria-label={heroData.title || "Homepage title"}
                      role="heading"
                      aria-level="1"
                    >
                      {heroData.title}
                    </h1>
                    {heroData.subtitle && (
                      <p className="hero-home__subtitle">{heroData.subtitle}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row ">
                <div className="col-md-2 col-lg-3 ">
                  <div className="hero-home__description pt-3  d-flex justify-content-md-end">
                    <p>Categories</p>
                  </div>
                </div>
                <div className="col-12 col-lg-9 col-md-10">
                  <div className="hero-home__categories">
                    {heroData.categories?.map((category) => (
                      <div key={category.id} className="hero-home__category">
                        <Link
                          href={`/categories/${category.slug}`}
                          className="d-flex flex-column align-items-center justify-content-center"
                        >
                          <span
                            className="hero-home__category-icon"
                            aria-label={category.title}
                          >
                            {getIconComponent(category.icon)}
                          </span>
                          <span className="hero-home__category-title">
                            {category.title}
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
