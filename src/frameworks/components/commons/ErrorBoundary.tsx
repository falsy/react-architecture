import { ErrorBoundary as EB } from "react-error-boundary"

export default function ErrorBoundary({
  children,
  fallback
}: {
  children: JSX.Element
  fallback?: JSX.Element
}) {
  return (
    <EB
      FallbackComponent={
        fallback ? () => fallback : () => <div>Something went wrong</div>
      }
    >
      {children}
    </EB>
  )
}
