import { QueryClient, QueryClientProvider as QCP } from "@tanstack/react-query"

export default function QueryClientProvider({
  children
}: {
  children: JSX.Element
}) {
  const queryClient = new QueryClient()
  return <QCP client={queryClient}>{children}</QCP>
}
