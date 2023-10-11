import clsx from 'clsx';

type ProductsListProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ProductsList(props: ProductsListProps) {
  return (
    <div
      className={clsx(
        'grid gap-8 md:grid-cols-2 md:grid-rows-[560px] md:gap-3 md:px-8 lg:grid-cols-3',
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
