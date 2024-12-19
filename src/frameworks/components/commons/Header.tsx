import { css } from "styled-system/css"

export default function Header() {
  return (
    <header
      className={css({
        padding: "20px",
        borderBottom: "1px solid #ddd"
      })}
    >
      <h1>React with Clean Architecture</h1>
    </header>
  )
}
