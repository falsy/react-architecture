import { css } from "styled-system/css"

export default function Input({
  label,
  value,
  onChange,
  type = "text"
}: {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
}) {
  return (
    <div>
      <label>
        <p>{label}</p>
        <input
          className={css({
            border: "1px solid #ddd",
            padding: "4px 10px",
            fontSize: "14px"
          })}
          type={type}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  )
}
