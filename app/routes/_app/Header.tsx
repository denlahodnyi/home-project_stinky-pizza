import { Link } from '@remix-run/react';
import { CartTrigger } from '~/widgets';
import logo from '~/assets/svg/stinky_pizza_logo.svg';

export default function Header() {
  return (
    <header className="sticky top-0 flex bg-background px-2 py-1 text-center dark:bg-backgroundDark md:px-8 md:py-4">
      <div className="md:flex-1" />
      <div className="flex-1 text-left md:text-center">
        <Link to="/">
          <img src={logo} alt="" width={60} className="inline" />
          <span className="align-middle font-head md:text-2xl">
            Stinky Pizza
          </span>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-end">
        <CartTrigger />
      </div>
    </header>
  );
}
