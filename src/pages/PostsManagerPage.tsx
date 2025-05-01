import { PostsHeader } from "@widgets/post/ui"
import { PostsTableContainer } from "@widgets/post/ui/PostsTableContainer"
import { UserDetailModal } from "@features/user/ui/UserDetailModal"
import { PostDetailModal } from "@features/post/ui/PostDetailModal"
import EditCommentModal from "@features/comment/ui/EditCommentModal"
import EditPostModal from "@features/post/ui/EditPostModal"
import CreateCommentModal from "@features/comment/ui/CreateCommentModal"
import CreatePostModal from "@features/post/ui/CreatePostModal"
import { useURLSync } from "@features/filter/model/useURLSync"

const PostsManager = () => {
  useURLSync()
  return (
    <div className="w-full max-w-6xl mx-auto">
      <PostsHeader />
      <PostsTableContainer />
      {/* 모달 */}
      <CreatePostModal />
      <CreateCommentModal />
      <EditPostModal />
      <EditCommentModal />
      <PostDetailModal />
      <UserDetailModal />
    </div>
  )
}

export default PostsManager
