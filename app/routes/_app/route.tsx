import { Outlet } from '@remix-run/react';
import Header from './Header';
import Footer from './Footer';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
