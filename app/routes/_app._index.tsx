import { type V2_MetaFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ProductCard } from '~/widgets';
import { fakeDrinks, fakePizzas } from '~/mocks/data/products';

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

export default function Index() {
  const { topPizza, drinks, pizzas } = useLoaderData<typeof loader>();
  return (
    <div className="flex-1 px-8">
      <h1 className="mb-5 text-center text-4xl font-bold">
        Welcome to <b className="text-primary">Stinky Pizza</b>, the most stinky
        food in the world
      </h1>
      <h2 className="mb-4 text-center text-3xl font-bold">Menu</h2>
      <h3 className="mb-5 text-center text-3xl font-bold">Our Top-3 pizza</h3>
      <div className="mb-11 grid grid-cols-3 gap-3 px-8">
        {topPizza.map((pizza) => (
          <ProductCard key={pizza.id} to="#" heading="h4" data={pizza} />
        ))}
      </div>
      <a href="$">Check more pizzas</a>
      <h3 className="mb-5 text-center text-3xl font-bold">Pizzas</h3>
      <div className="mb-11 grid grid-cols-3 gap-3 px-8">
        {pizzas.map((pizza) => (
          <ProductCard key={pizza.id} to="#" heading="h4" data={pizza} />
        ))}
      </div>
      <a href="$">Check more pizzas</a>
      <h3 className="mb-5 text-center text-3xl font-bold">Drinks</h3>
      <div className="mb-11 grid grid-cols-3 gap-3 px-8">
        {drinks.map((drink) => (
          <ProductCard key={drink.id} to="#" heading="h4" data={drink} />
        ))}
      </div>
      <a href="$">Check more drinks</a>
    </div>
  );
}
