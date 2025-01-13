import { ChangeEvent, useState } from "react"
import Button from "components/atoms/Button"
import Input from "components/atoms/Input"

export default function PostBox({
  post,
  updatePost,
  deletePost
}: {
  post: { id: string; title: string; content: string }
  updatePost: (id: string, title: string, content: string) => void
  deletePost: (id: string) => void
}) {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-6 w-full">
        <div className="basis-[30%] w-full">
          <Input label={"Title"} value={title} onChange={handleChangeTitle} />
        </div>
        <div className="basis-[70%] w-full">
          <Input
            label={"Content"}
            value={content}
            onChange={handleChangeContent}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <Button
          text="Update"
          onClick={() => updatePost(post.id, title, content)}
        />
        <Button text="Delete" onClick={() => deletePost(post.id)} />
      </div>
    </div>
  )
}
