import { Outlet } from '@remix-run/react';
import Header from './Header';
import Footer from './Footer';
import ModalsContainer from './ModalsContainer';

export default function AppLayout() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col">
      <Header />
      <Outlet />
      <Footer />
      <ModalsContainer />
    </div>
  );
}
