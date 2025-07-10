'use client';
import Footer from '@/components/footer/Footer';
import MiniNavbar from '@/components/mini-navbar/MiniNavbar';
export default function MainLayout({ children }) {
  return (
    <>
        <MiniNavbar />
        <main >
            {children}
        </main>
        <Footer />
    </>
  )
}