import { type V2_MetaFunction, json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { ProductCard } from '~/widgets';
import { fakeDrinks, fakePizzas } from '~/mocks/data/products';
import { Icon, ProductsList } from '~/shared/components';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Stinky Pizza' },
    { name: 'description', content: 'Welcome to StinkyPizza!' },
  ];
};

export const loader = async () => {
  return json({
    topPizza: fakePizzas.slice(0, 3),
    pizzas: fakePizzas,
    drinks: fakeDrinks.slice(0, 3),
  });
};

const linkClassName = 'text-xl text-secondary underline md:text-3xl';

export default function Index() {
  const { topPizza, drinks, pizzas } = useLoaderData<typeof loader>();
  return (
    <div className="flex-1 px-4 md:px-8">
      <h1 className="mx-auto mb-5 max-w-2xl text-center text-3xl font-bold md:text-4xl">
        Welcome to <b className="text-primary">Stinky Pizza</b>, the most stinky
        food in the world
      </h1>
      <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">Menu</h2>
      <h3 className="mb-5 text-center text-2xl font-bold md:text-3xl">
        Our Top-3 pizza
      </h3>
      <ProductsList className="mb-8 md:mb-11">
        {topPizza.map((pizza) => (
          <ProductCard
            key={pizza.id}
            to={`/${pizza.category}/${pizza.id}`}
            heading="h4"
            data={pizza}
          />
        ))}
      </ProductsList>
      <div className="mb-6 text-center md:mb-12">
        <Link to="/pizzas" className={linkClassName}>
          Check more pizzas
        </Link>
      </div>
      <h3 className="mb-5 text-center text-2xl font-bold md:text-3xl">
        <span className="align-text-bottom">
          <Icon iconName="LiaPizzaSliceSolid" aria-hidden />
        </span>
        <span>Pizzas</span>
      </h3>
      <ProductsList className="mb-8 md:mb-11">
        {pizzas.map((pizza) => (
          <ProductCard
            key={pizza.id}
            to={`/${pizza.category}/${pizza.id}`}
            heading="h4"
            data={pizza}
          />
        ))}
      </ProductsList>
      <div className="mb-6 text-center md:mb-12">
        <Link to="/pizzas" className={linkClassName}>
          Check more pizzas
        </Link>
      </div>
      <h3 className="mb-5 text-center text-2xl font-bold md:text-3xl">
        <span className="align-text-bottom">
          <Icon iconName="LiaCoffeeSolid" aria-hidden />
        </span>
        <span>Drinks</span>
      </h3>
      <ProductsList className="mb-8 md:mb-11">
        {drinks.map((drink) => (
          <ProductCard
            key={drink.id}
            to={`/${drink.category}/${drink.id}`}
            heading="h4"
            data={drink}
          />
        ))}
      </ProductsList>
      <div className="text-center">
        <Link to="/drinks" className={linkClassName}>
          Check more drinks
        </Link>
      </div>
    </div>
  );
}
