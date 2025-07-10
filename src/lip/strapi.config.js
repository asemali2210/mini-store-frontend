export const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
export const STRAPI_API_URL = `${STRAPI_URL}/api`;

export const getImageUrl = (image) => {
  return (
    STRAPI_URL +
    (image?.formats?.large?.url ||
      image?.formats?.medium?.url ||
      image?.url ||
      "")
  );
};
