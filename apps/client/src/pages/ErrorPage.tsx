import { Link, useRouteError, isRouteErrorResponse } from "react-router";

import { Button } from "@river/ui";

export function ErrorPage() {
  const error = useRouteError();

  let title = "Something went wrong";
  let description = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Page not found";
      description = "The page you're looking for doesn't exist.";
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">{title}</h1>

      <p className="text-muted-foreground">{description}</p>

      <Button nativeButton={false} render={<Link to="/">Back Home</Link>} />
    </div>
  );
}
