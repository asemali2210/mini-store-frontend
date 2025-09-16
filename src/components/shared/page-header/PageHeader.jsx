import PropTypes from "prop-types";
import Link from "next/link";
import "./page-header.scss";

const PageHeader = ({ breadcrumbs = [], title, description, backgroundImage }) => {
  const headerStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : undefined;

  return (
    <header className="page-header" style={headerStyle}>
      <div className="page-header__content">
        {breadcrumbs.length > 0 && (
          <nav className="page-header__breadcrumbs" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              const key = `${crumb.label}-${index}`;
              const content = crumb.href && !isLast ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span>{crumb.label}</span>
              );

              return (
                <span key={key} className="page-header__breadcrumb">
                  {content}
                  {!isLast && <span className="page-header__separator">/</span>}
                </span>
              );
            })}
          </nav>
        )}

        {title && <h1 className="page-header__title">{title}</h1>}

        {description && (
          <p className="page-header__description">{description}</p>
        )}
      </div>
    </header>
  );
};

PageHeader.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  backgroundImage: PropTypes.string,
};

export default PageHeader;
