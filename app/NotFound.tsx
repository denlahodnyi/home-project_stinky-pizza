import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  useRouteError,
  isRouteErrorResponse,
  Link,
} from '@remix-run/react';
import { Icon } from '~/shared/components';

function HomeLink() {
  return (
    <Link to="/" className="text-xl text-primary underline">
      <Icon iconName="LiaArrowLeftSolid" className="inline" />
      Back to home
    </Link>
  );
}

export default function NotFound() {
  const error = useRouteError();

  let content;

  if (isRouteErrorResponse(error)) {
    content = (
      <div>
        <h1 className="text-5xl">
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
        <HomeLink />
      </div>
    );
  } else if (error instanceof Error) {
    content = (
      <div>
        <h1 className="text-5xl">Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
        <HomeLink />
      </div>
    );
  } else {
    content = (
      <div>
        <h1 className="text-5xl">Unknown error</h1>
        <HomeLink />
      </div>
    );
  }

  return (
    <html lang="en">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex h-screen items-center justify-center text-center">
          {content}
        </div>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
