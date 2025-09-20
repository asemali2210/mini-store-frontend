"use client";

import MainLayout from "@/layout/MainLayout";

import "./account.scss";

const accountLinks = [
  { label: "Address", href: "#", isActive: true },
  { label: "Orders", href: "#" },
  { label: "Wishlist", href: "#" },
  { label: "Logout", href: "#" },
];

export default function AccountPage() {
  return (
    <MainLayout>
      <section className="account">
        <div className="container">
          <header className="account__header">
            <h1>My Account</h1>
          </header>

          <div className="account__body row gy-4">
            <aside className="account__sidebar col-lg-4 col-md-5">
              <div className="account__profile-card">
                <div className="account__avatar-wrapper">
                  <img
                    className="account__avatar"
                    src="https://placehold.co/160x160"
                    alt="Profile avatar"
                  />
                </div>
                <h2 className="account__name">Jane Doe</h2>
              </div>

              <nav className="account__nav" aria-label="Account navigation">
                <ul>
                  {accountLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        className={[
                          "account__nav-link",
                          link.isActive ? "account__nav-link--active" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        href={link.href}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="account__content col-lg-8 col-md-7">
              <div className="account__placeholder" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
