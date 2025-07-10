import Image from "next/image";
import "./features.scss";
export default function Features() {
  return (
    <div className="features py-5">
      <div className="container">
        <ul className="features__list row list-unstyled d-flex">
          <div className="col-12 col-sm-6 col-lg-3">
            <li className="features__item d-flex gap-3">
              <div className="features__item-left">
                <img
                  className="features__item-icon"
                  src="/icons/free-delivery-icon.svg"
                  alt="Free Delivery Icon"
                  width={30}
                  height={30}
                />
              </div>
              <div className="features__item-right">
                <p className="features__item-title font-weight-bold">
                  Free Delivery
                </p>
                <p className="features__item-description mt-3">
                  We bring your tools to your doorstep, completely free.
                </p>
              </div>
            </li>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <li className="features__item d-flex gap-3  col-12 col-sm-6 col-lg-3">
              <div className="features__item-left">
                <img
                  className="features__item-icon"
                  src="/icons/quality-guarantee-icon.svg"
                  alt="Quality Guarantee Icon"
                  width={30}
                  height={30}
                />
              </div>
              <div className="features__item-right">
                <p className="features__item-title font-weight-bold">
                  Quality guarantee
                </p>
                <p className="features__item-description mt-3">
                  Tested, trusted, and built to last. We guarantee quality.
                </p>
              </div>
            </li>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <li className="features__item d-flex gap-3  col-12 col-sm-6 col-lg-3">
              <div className="features__item-left">
                <img
                  className="features__item-icon"
                  src="/icons/secure-payment-icon.svg"
                  alt="Secure Payment Icon"
                  width={30}
                  height={30}
                />
              </div>
              <div className="features__item-right">
                <p className="features__item-title font-weight-bold">
                  100% Secure Payment
                </p>
                <p className="features__item-description mt-3">
                  Buy with confidence using fully secured checkout
                </p>
              </div>
            </li>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <li className="features__item d-flex gap-3  col-12 col-sm-6 col-lg-3">
              <div className="features__item-left">
                <img
                  className="features__item-icon"
                  src="/icons/daily-offers-icon.svg"
                  alt="Daily Offers Icon"
                  width={30}
                  height={30}
                />
              </div>
              <div className="features__item-right">
                <p className="features__item-title font-weight-bold">
                  Daily offers
                </p>
                <p className="features__item-description mt-3">
                  New deals daily — save big on top tools and equipment
                </p>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
