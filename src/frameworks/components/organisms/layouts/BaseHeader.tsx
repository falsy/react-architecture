import Logo from "components/atoms/Logo"
import HeaderMenu from "components/molecules/HeaderMenu"
import Header from "components/templates/Header"

export default function BaseHeader() {
  return (
    <Header logo={<Logo />}>
      <HeaderMenu />
    </Header>
  )
}
