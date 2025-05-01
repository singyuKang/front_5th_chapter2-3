import { useQueryPostList } from "@features/post/api/api"
import { usePostModals } from "@features/post/hooks/usePostModal"
import { PostLikeInfoTableCell } from "@features/post/ui/PostLikeInfoTableCell"
import { PostReactInfoTableCell } from "@features/post/ui/PostReactInfoTableCell"
import { PostTitleInfoTableCell } from "@features/post/ui/PostTitleInfoTableCell"
import { PostUserInfoTableCell } from "@features/post/ui/PostUserInfoTableCell"
import { TableCell } from "@shared/ui/table/TableCell"

export const PostsTableBody = () => {
  const { posts } = useQueryPostList()
  const { openUserModal, openPostDetailModal, openEditModal } = usePostModals()

  const hasNotPosts = !posts.posts || posts.posts.length === 0

  return (
    <tbody className="border-t">
      {hasNotPosts ? (
        <tr>
          <td colSpan={5} className="p-6 text-center">
            로딩 중...
          </td>
        </tr>
      ) : (
        posts.posts.map((post, index) => (
          <tr key={`${index}th-${post.id}-post-row`}>
            <TableCell>{post.id.toString()}</TableCell>
            <PostTitleInfoTableCell title={post.title} tags={post.tags} />
            <PostUserInfoTableCell userId={post.userId} openUserModal={openUserModal} />
            <PostLikeInfoTableCell reactions={post.reactions} />
            <PostReactInfoTableCell post={post} openEditModal={openEditModal} openPostDetail={openPostDetailModal} />
          </tr>
        ))
      )}
    </tbody>
  )
}
