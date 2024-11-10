import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import useDependencies from "hooks/useDependencies"
import CreatePostSection from "containers/post/CreatePostSection"

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })

jest.mock("hooks/useDependencies")
const mockCreatePost = jest.fn()

describe("CreatePostSection", () => {
  beforeEach(() => {
    ;(useDependencies as jest.Mock).mockReturnValue({
      presenters: {
        post: {
          createPost: mockCreatePost
        }
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders input fields and the create button", () => {
    const testQueryClient = createTestQueryClient()

    render(
      <QueryClientProvider client={testQueryClient}>
        <CreatePostSection />
      </QueryClientProvider>
    )

    expect(screen.getByLabelText("title")).toBeInTheDocument()
    expect(screen.getByLabelText("content")).toBeInTheDocument()
    expect(screen.getByText("Create")).toBeInTheDocument()
  })

  it("updates title and content state on input change", () => {
    const testQueryClient = createTestQueryClient()

    render(
      <QueryClientProvider client={testQueryClient}>
        <CreatePostSection />
      </QueryClientProvider>
    )

    const titleInput = screen.getByLabelText("title")
    const contentInput = screen.getByLabelText("content")

    fireEvent.change(titleInput, { target: { value: "Test Title" } })
    fireEvent.change(contentInput, { target: { value: "Test Content" } })

    expect(titleInput).toHaveValue("Test Title")
    expect(contentInput).toHaveValue("Test Content")
  })

  it("calls mutation function when Create button is clicked", async () => {
    const testQueryClient = createTestQueryClient()

    render(
      <QueryClientProvider client={testQueryClient}>
        <CreatePostSection />
      </QueryClientProvider>
    )

    const titleInput = screen.getByLabelText("title")
    const contentInput = screen.getByLabelText("content")
    const createButton = screen.getByText("Create")

    fireEvent.change(titleInput, { target: { value: "Test Title" } })
    fireEvent.change(contentInput, { target: { value: "Test Content" } })
    fireEvent.click(createButton)

    await waitFor(() => {
      expect(mockCreatePost).toHaveBeenCalledWith({
        title: "Test Title",
        content: "Test Content"
      })
    })
  })
})
