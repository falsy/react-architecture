import { createBrowserRouter, RouterProvider } from "react-router"
import Dashboard from "components/pages/Dashboard"

const router = createBrowserRouter([{ path: "/", element: <Dashboard /> }])

export const Routes = () => {
  return <RouterProvider router={router} />
}
