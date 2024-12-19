import Header from "components/commons/Header"
import PostSection from "containers/post/PostSection"
import { css } from "styled-system/css"

export default function Dashboard() {
  return (
    <div>
      <Header />
      <main
        className={css({
          padding: "20px"
        })}
      >
        <PostSection />
      </main>
    </div>
  )
}
