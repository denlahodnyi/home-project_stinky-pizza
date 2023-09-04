import { V2_MetaFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Stinky Pizza' },
    { name: 'description', content: 'Welcome to StinkyPizza!' },
  ];
};

export const loader = async () => {
  return json({ data: [{ id: 1 }, { id: 2 }, { id: 3 }] });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  console.log('🚀 -> Index -> data:', data);
  return (
    <div className="flex-1 px-8">
      <h1 className="mb-5 text-center text-3xl font-bold">
        Welcome to <b className="text-primary">Stinky Pizza</b>, the most stinky
        food in the world
      </h1>
    </div>
  );
}
