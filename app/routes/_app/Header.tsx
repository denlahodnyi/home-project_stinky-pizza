import { CartTrigger } from '~/widgets';
import logo from '~/assets/svg/stinky_pizza_logo.svg';

export default function Header() {
  return (
    <header className="sticky top-0 flex bg-background px-8 py-4 text-center">
      <div className="flex-1" />
      <div className="flex-1">
        <img src={logo} alt="" width={60} className="inline" />
        <span className="align-middle font-head text-2xl">Stinky Pizza</span>
      </div>
      <div className="flex flex-1 items-center justify-end">
        <CartTrigger />
      </div>
    </header>
  );
}
