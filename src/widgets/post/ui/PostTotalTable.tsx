import { PostsTableBody } from "./PostTableBody"
import { PostsTableHeader } from "./PostTableHeader"

export const PostTotalTable: React.FC = () => {
  return (
    <div className="w-full overflow-auto">
      <table className="table-fixed w-full caption-bottom text-sm">
        <PostsTableHeader />
        <PostsTableBody />
      </table>
    </div>
  )
}
