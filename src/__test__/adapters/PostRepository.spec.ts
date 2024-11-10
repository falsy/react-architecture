import { AxiosRequestHeaders } from "axios"
import { IRequestPostParams } from "domains/aggregates/interfaces/IPost"
import IPostRepository from "domains/repositories/interfaces/IPostRepository"
import IClientHTTP from "adapters/infrastructures/interfaces/IClientHTTP"
import PostDTO from "adapters/dtos/PostDTO"
import PostRepository from "adapters/repositories/PostRepository"

describe("PostRepository", () => {
  let postRepository: IPostRepository
  let mockClient: jest.Mocked<IClientHTTP>

  beforeEach(() => {
    mockClient = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn()
    }
    postRepository = new PostRepository(mockClient)
  })

  it("should fetch posts and return an array of PostDTO instances", async () => {
    const mockPostsData = [
      {
        id: "1",
        title: "First Post",
        content: "This is the first post",
        author: { id: "author1", name: "John Doe" },
        createdAt: new Date("2024-11-01"),
        updatedAt: new Date("2024-11-02")
      }
    ]
    mockClient.get.mockResolvedValue({
      data: mockPostsData,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {
        headers: {
          "Content-Type": "application/json"
        } as unknown as AxiosRequestHeaders
      }
    })

    const posts = await postRepository.getPosts()

    expect(mockClient.get).toHaveBeenCalledWith("/api/posts")
    expect(posts).toHaveLength(mockPostsData.length)
    expect(posts[0]).toBeInstanceOf(PostDTO)
    expect(posts[0].id).toBe(mockPostsData[0].id)
    expect(posts[0].title).toBe(mockPostsData[0].title)
  })

  it("should fetch a single post and return a PostDTO instance", async () => {
    const mockPostData = {
      id: "1",
      title: "Sample Post",
      content: "Content of the sample post",
      author: { id: "author1", name: "Jane Doe" },
      createdAt: new Date("2023-11-01"),
      updatedAt: new Date("2023-11-02")
    }
    mockClient.get.mockResolvedValue({
      data: mockPostData,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {
        headers: {
          "Content-Type": "application/json"
        } as unknown as AxiosRequestHeaders
      }
    })

    const post = await postRepository.getPost("1")

    expect(mockClient.get).toHaveBeenCalledWith("/api/posts/1")
    expect(post).toBeInstanceOf(PostDTO)
    expect(post.id).toBe(mockPostData.id)
    expect(post.title).toBe(mockPostData.title)
  })

  it("should create a post and return a boolean indicating success", async () => {
    const params: IRequestPostParams = {
      title: "New Post",
      content: "Content of the new post"
    }
    mockClient.post.mockResolvedValue({
      data: true,
      status: 201,
      statusText: "Created",
      headers: {},
      config: {
        headers: {
          "Content-Type": "application/json"
        } as unknown as AxiosRequestHeaders
      }
    })

    const result = await postRepository.createPost(params)

    expect(mockClient.post).toHaveBeenCalledWith("/api/posts", params)
    expect(result).toBe(true)
  })

  it("should edit a post and return a boolean indicating success", async () => {
    const params: IRequestPostParams = {
      title: "Updated Post",
      content: "Updated content"
    }
    mockClient.put.mockResolvedValue({
      data: true,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {
        headers: {
          "Content-Type": "application/json"
        } as unknown as AxiosRequestHeaders
      }
    })

    const result = await postRepository.editPost("1", params)

    expect(mockClient.put).toHaveBeenCalledWith("/api/posts/1", params)
    expect(result).toBe(true)
  })

  it("should delete a post and return a boolean indicating success", async () => {
    mockClient.delete.mockResolvedValue({
      data: true,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {
        headers: {
          "Content-Type": "application/json"
        } as unknown as AxiosRequestHeaders
      }
    })

    const result = await postRepository.deletePost("1")

    expect(mockClient.delete).toHaveBeenCalledWith("/api/posts/1")
    expect(result).toBe(true)
  })
})
