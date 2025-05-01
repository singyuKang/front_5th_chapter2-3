import { PostsHeader } from "@widgets/post/ui"
import { PostsTableContainer } from "@widgets/post/ui/PostsTableContainer"
import { UserDetailModal } from "@features/user-management/ui/UserDetailModal"
import { PostDetailModal } from "@features/post-management/ui/PostDetailModal"
import EditCommentModal from "@features/comment/ui/EditCommentModal"
import EditPostModal from "@features/post-management/ui/EditPostModal"
import CreateCommentModal from "@features/comment/ui/CreateCommentModal"
import CreatePostModal from "@features/post-management/ui/CreatePostModal"
import { useURLSync } from "@features/filter-management/model/useURLSync"

const PostsManager = () => {
  // const deletePostMutation = useDeletePost()
  // const likeCommentMutation = useLikeComment()
  // const addCommentMutation = useAddComment()
  // const updateCommentMutation = useUpdateComment()
  // const deleteCommentMutation = useDeleteComment()

  useURLSync()

  // const handleDeletePost = (id) => {
  //   deletePostMutation.mutate(id, {
  //     onError: (error) => {
  //       console.error("게시물 삭제 오류:", error)
  //     },
  //   })
  // }

  // const handleLikeComment = (comment, postId) => {
  //   likeCommentMutation.mutate(
  //     { id: comment.id, likes: comment.likes + 1 },
  //     {
  //       onSuccess: (data) => {
  //         setComments((prev) => ({
  //           ...prev,
  //           [postId]: prev[postId]?.map((c) => (c.id === data.id ? { ...c, likes: c.likes + 1 } : c)) || [],
  //         }))
  //       },
  //     },
  //   )
  // }

  // const handleAddComment = () => {
  //   addCommentMutation.mutate(newComment, {
  //     onSuccess: (data) => {
  //       setComments((prev) => ({
  //         ...prev,
  //         [data.postId]: [...(prev[data.postId] || []), data],
  //       }))

  //       setShowAddCommentDialog(false)
  //       setNewComment({ body: "", postId: null, userId: 1 })
  //     },
  //     onError: (error) => {
  //       console.error("댓글 추가 오류:", error)
  //     },
  //   })
  // }

  // const handleUpdateComment = () => {
  //   if (!selectedComment) return

  //   updateCommentMutation.mutate(
  //     { id: selectedComment.id, body: selectedComment.body },
  //     {
  //       onSuccess: (data) => {
  //         // 낙관적 업데이트를 위해 기존 방식 유지
  //         setComments((prev) => ({
  //           ...prev,
  //           [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
  //         }))

  //         setShowEditCommentDialog(false)
  //       },
  //       onError: (error) => {
  //         console.error("댓글 업데이트 오류:", error)
  //       },
  //     },
  //   )
  // }

  // const handleDeleteComment = (id, postId) => {
  //   deleteCommentMutation.mutate(
  //     { id, postId },
  //     {
  //       onSuccess: () => {
  //         // 낙관적 업데이트를 위해 기존 방식 유지
  //         setComments((prev) => ({
  //           ...prev,
  //           [postId]: prev[postId].filter((comment) => comment.id !== id),
  //         }))
  //       },
  //       onError: (error) => {
  //         console.error("댓글 삭제 오류:", error)
  //       },
  //     },
  //   )
  // }

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
