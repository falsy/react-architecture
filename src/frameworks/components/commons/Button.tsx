import { css } from "styled-system/css"

export default function Button({
  action,
  text
}: {
  action?: () => void
  text: string
}) {
  return (
    <button
      className={css({
        border: "0px",
        background: "#000",
        color: "#fff",
        fontSize: "14px",
        padding: "5px 20px",
        borderRadius: "5px",
        cursor: "pointer"
      })}
      onClick={() => action && action()}
    >
      {text}
    </button>
  )
}
