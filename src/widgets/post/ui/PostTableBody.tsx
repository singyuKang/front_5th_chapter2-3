import { useQueryPostList } from "@features/post-management/api/api"
import { usePostModals } from "@features/post-management/hooks/usePostModal"
import { PostTitleInfoTableCell } from "@features/post-management/ui/PostTitleInfoTableCell"
import { PostUserInfoTableCell } from "@features/post-management/ui/PostUserInfoTableCell"
import { TableCell } from "@shared/ui/table/TableCell"

export const PostsTableBody = () => {
  const { posts } = useQueryPostList()
  const { openUserModal } = usePostModals()

  //   console.log("🚀 ~ PostsTableBody ~ posts:", posts)

  //   const hasNotPosts = !posts.posts || posts.posts.length === 0
  //   if (hasNotPosts) return <div className="p-6">로딩 중...</div>

  return (
    <tbody className="border-t">
      {posts.posts.map((post, index) => (
        <tr key={`${index}th-${post.id}-post-row`}>
          <TableCell>{post.id.toString()}</TableCell>
          <PostTitleInfoTableCell title={post.title} tags={post.tags} />
          <PostUserInfoTableCell userId={post.userId} openUserModal={openUserModal} />
          {/* <PostLikeInfoTableCell reactions={post.reactions} /> */}
          {/* <PostReactInfoTableCell post={post} openEditModal={openEditModal} openPostDetail={openDetailModal} /> */}
        </tr>
      ))}
    </tbody>
  )
}
