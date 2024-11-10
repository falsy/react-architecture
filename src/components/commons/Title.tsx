import { css } from "styled-system/css"

export default function Title({ text }: { text: string }) {
  return (
    <h2
      className={css({
        fontSize: "20px",
        margin: "10px 0"
      })}
    >
      {text}
    </h2>
  )
}
