import { useQueryPostList } from "@features/post/api/api"
import { PostSearchFilters } from "@features/post/ui/PostSearchFilters"
import { PostTotalTable } from "./PostTotalTable"
import { PostPagination } from "./PostPagination"

export const PostsTableContainer: React.FC = () => {
  const { posts } = useQueryPostList()

  return (
    <div className="p-6 pt-0">
      <div className="flex flex-col gap-4">
        <PostSearchFilters />
        <PostTotalTable />
        <PostPagination total={posts.total} />
      </div>
    </div>
  )
}
