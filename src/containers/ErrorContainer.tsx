import { ErrorBoundary } from "react-error-boundary"

export default function ErrorContainer({
  children,
  fallback
}: {
  children: JSX.Element
  fallback?: JSX.Element
}) {
  return (
    <ErrorBoundary
      FallbackComponent={
        fallback ? () => fallback : () => <div>Something went wrong</div>
      }
    >
      {children}
    </ErrorBoundary>
  )
}
