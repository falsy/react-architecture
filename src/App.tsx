import "styled-system/styles.css"
import { css } from "styled-system/css"

export default function App() {
  return (
    <div
      className={css({
        background: "black",
        color: "white"
      })}
    >
      <h1>Hello World</h1>
    </div>
  )
}
