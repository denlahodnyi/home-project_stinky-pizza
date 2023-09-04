import logo from '~/assets/svg/stinky_pizza_logo.svg';

export default function Header() {
  return (
    <header className="px-8 py-4 text-center">
      <img src={logo} alt="" width={60} className="inline" />
      <span className="align-middle font-head text-2xl">Stinky Pizza</span>
    </header>
  );
}
