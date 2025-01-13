import { ChangeEvent, useState } from "react"
import usePosts from "hooks/usePosts"
import Button from "components/atoms/Button"
import Input from "components/atoms/Input"

const PostForm = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const { isPending, createPost } = usePosts()

  const handleClickCreatePost = () => {
    setTitle("")
    setContent("")
    createPost(title, content)
  }

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  return (
    <div>
      <h2 className="text-lg pb-2">Create Post</h2>
      <div className="p-4 border border-gray/40 rounded-md">
        <div className="flex gap-6 mb-4">
          <Input
            className="basis-[30%] w-full"
            label="Title"
            value={title}
            onChange={handleChangeTitle}
          />
          <Input
            className="basis-[70%] w-full"
            label="Content"
            value={content}
            onChange={handleChangeContent}
          />
        </div>
        <div className="flex gap-4 items-center">
          <Button onClick={handleClickCreatePost} text="Create Post" />
          {isPending && <p className="text-sm">Loading...</p>}
        </div>
      </div>
    </div>
  )
}

export default PostForm
