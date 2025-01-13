import Footer from "components/templates/Footer"

export default function BaseFooter() {
  return (
    <Footer className="sticky top-full">
      <p className="py-4 px-8 text-xs">
        © 2025{" "}
        <a
          href="https://github.com/falsy"
          target="_blank"
          rel="noopener noreferrer"
        >
          falsy
        </a>
      </p>
    </Footer>
  )
}
