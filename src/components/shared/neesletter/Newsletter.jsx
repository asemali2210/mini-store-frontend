import "./newsletter-main.scss";
import NewsletterForm from "./NewsletterForm";
import { MdOutlineMailOutline } from "react-icons/md";
function Newsletter() {
  return (
    <div className="newsletter__main py-5">
      <div className="container">
        <div className="newsletter__container row-gap-3 d-flex justify-content-center align-items-center flex-column">
          <p className="heading h5">Join Our Newsletter</p>
          <p className="sub__heading h4">
            Sign up for deals, new products and promotions
          </p>
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
