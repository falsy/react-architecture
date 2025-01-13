import Content from "components/templates/Content"
import PostForm from "components/molecules/PostForm"
import PostList from "components/molecules/PostList"

export default function DashboardContent() {
  return (
    <Content className="p-8">
      <h1 className="text-sm text-black/50">Dashboard</h1>
      <div className="mt-4">
        <PostList className="mb-8" />
        <PostForm />
      </div>
    </Content>
  )
}
