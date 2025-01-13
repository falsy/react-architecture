import { render, screen, fireEvent } from "@testing-library/react"
import PostForm from "components/molecules/PostForm"

import usePosts from "hooks/usePosts"

// usePosts 훅을 Mock 처리
jest.mock("hooks/usePosts")

describe("PostForm", () => {
  const mockCreatePost = jest.fn()
  const mockUsePosts = {
    isPending: false,
    createPost: mockCreatePost
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(usePosts as jest.Mock).mockReturnValue(mockUsePosts)
  })

  it("renders the form with title and content inputs and a button", () => {
    render(<PostForm />)

    expect(screen.getByLabelText("Title")).toBeInTheDocument()
    expect(screen.getByLabelText("Content")).toBeInTheDocument()
    expect(screen.getByText("Create")).toBeInTheDocument()
  })

  it("updates the title and content fields on user input", () => {
    render(<PostForm />)

    const titleInput = screen.getByLabelText(/Title/i)
    const contentInput = screen.getByLabelText(/Content/i)

    fireEvent.change(titleInput, { target: { value: "Test Title" } })
    fireEvent.change(contentInput, { target: { value: "Test Content" } })

    expect(titleInput).toHaveValue("Test Title")
    expect(contentInput).toHaveValue("Test Content")
  })

  it("calls createPost with the correct title and content when the button is clicked", async () => {
    render(<PostForm />)

    const titleInput = screen.getByLabelText("Title")
    const contentInput = screen.getByLabelText("Content")
    const button = screen.getByText("Create")

    fireEvent.change(titleInput, { target: { value: "New Title" } })
    fireEvent.change(contentInput, { target: { value: "New Content" } })

    fireEvent.click(button)

    expect(mockCreatePost).toHaveBeenCalledWith("New Title", "New Content")
    expect(titleInput).toHaveValue("")
    expect(contentInput).toHaveValue("")
  })

  it("displays a loading message when isPending is true", () => {
    ;(usePosts as jest.Mock).mockReturnValue({
      ...mockUsePosts,
      isPending: true
    })

    render(<PostForm />)

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
  })

  it("does not display a loading message when isPending is false", () => {
    render(<PostForm />)

    expect(screen.queryByText(/Loading.../i)).toBeNull()
  })
})
