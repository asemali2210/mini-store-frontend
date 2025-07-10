const axios = require("axios");
const fs = require("fs");

const API_TOKEN =
  "197a75b780d164ba765cc8b7106adc4f92d46ac43b23f2114aa284ecb5abaf351f06e619562bcafd73b1b1d2a3928f6c0c6a5cee1cae9dc0f6718edb9e3351e01262c90c05801b11dee91e5860c9057e2486de0a4258048280482ea384c2540a018257f5483836c37a7385259ec5b94ee213c37deb676aea8f95bab4eeea82c9";
const STRAPI_URL = "http://localhost:1337"; // أو رابط الستراپي على cloud

// قراءة المنتجات من ملف JSON
const products = JSON.parse(fs.readFileSync("products_bulk.json", "utf8"));

const upload = async () => {
  for (let product of products) {
    try {
      const res = await axios.post(
        `${STRAPI_URL}/api/products`,
        {
          data: product,
        },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );

      console.log(`✅ Uploaded: ${product.title}`);
    } catch (err) {
      console.error(
        `❌ Failed: ${product.title}`,
        err.response?.data?.error || err.message
      );
    }
  }
};

upload();
