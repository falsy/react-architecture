import Header from "components/templates/Header"
import HeaderMenu from "components/molecules/HeaderMenu"
import Logo from "components/atoms/Logo"

export default function BaseHeader() {
  return (
    <Header logo={<Logo />}>
      <HeaderMenu />
    </Header>
  )
}
