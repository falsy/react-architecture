import Template from "components/templates/Template"
import BaseFooter from "components/organisms/layouts/BaseFooter"
import BaseHeader from "components/organisms/layouts/BaseHeader"
import BaseSidebar from "components/organisms/layouts/BaseSidebar"
import DashboardContent from "components/organisms/contents/DashboardContent"

export default function Dashboard() {
  return (
    <Template>
      <BaseHeader />
      <BaseSidebar />
      <DashboardContent />
      <BaseFooter />
    </Template>
  )
}
