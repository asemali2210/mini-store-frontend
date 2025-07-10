import Skeleton from "react-loading-skeleton";

export default function HeroHomeSkeleton() {
  return (
    <div className="hero-home hero-home--skeleton py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-5">
            <div className="row justify-content-between">
              <div className="col-12 col-lg-7">
                <div className="hero-home__images hero-home__images m-lg-0 mb-5 px-3 d-flex gap-5 justify-content-md-between">
                  <Skeleton
                    width="100%"
                    height={250}
                    className="hero-home--skeleton-image"
                  />
                  <Skeleton
                    width="100%"
                    height={250}
                    className="hero-home--skeleton-image"
                  />
                </div>
              </div>
              <div className="col-12 col-lg-5">
                <Skeleton height={40} className="mb-3" />
                <Skeleton width={250} height={20} />
              </div>
            </div>
          </div>
          <div className="col-12">
            <Skeleton width={150} height={30} />
            <div className="d-flex gap-3 mt-3 flex-wrap">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} width={110} height={110} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
