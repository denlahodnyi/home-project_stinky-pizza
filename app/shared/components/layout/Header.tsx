import clsx from 'clsx';

type HeaderProps = {
  className?: string;
  cols?: 1 | 2 | 3;
  colsClassNames?: [string, string?, string?];
  children: [JSX.Element, JSX.Element?, JSX.Element?];
};

export default function Header(props: HeaderProps) {
  const { cols = 1, className, colsClassNames = [], children, ...rest } = props;
  let content: JSX.Element[] = [];

  for (let i = 0; i < cols; i++) {
    content.push(
      <div key={i} className={clsx('flex-1', colsClassNames[i])}>
        {children[i]}
      </div>
    );
  }

  return (
    <header className={clsx('flex', className)} {...rest}>
      {content}
    </header>
  );
}
