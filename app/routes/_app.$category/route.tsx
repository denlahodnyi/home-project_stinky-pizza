import { json, type LoaderArgs } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';
import { fakeDrinks, fakePizzas } from '~/mocks/data/products';
import type { ProductCategories } from '~/shared/types';
import { ProductsList } from '~/shared/components';
import { ProductCard } from '~/widgets';

const fakeProducts = {
  pizzas: fakePizzas,
  drinks: fakeDrinks,
};

export const loader = async ({ params }: LoaderArgs) => {
  const { category } = params;
  return json({
    items: fakeProducts[category as ProductCategories],
  });
};

export default function ProductsByCategoryPage() {
  const { items } = useLoaderData<typeof loader>();
  const { category } = useParams();

  return (
    <div className="flex-1 px-8">
      <h1 className="mb-8 text-center text-4xl font-bold capitalize">
        {category}
      </h1>
      <ProductsList>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            to={`./${product.id}`}
            heading="h2"
            data={product}
          />
        ))}
      </ProductsList>
    </div>
  );
}
