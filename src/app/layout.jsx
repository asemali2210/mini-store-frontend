import ProvidersWrapper from "./layout-client.jsx";

export const metadata = {
  title: "Mini Store",
  description: "A modern e-commerce application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  );
}
