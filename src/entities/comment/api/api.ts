export const getCommentsByPostId = async (postId) => {
  if (!postId) return null

  const response = await fetch(`/api/comments/post/${postId}`)
  if (!response.ok) {
    throw new Error("댓글 가져오기 실패")
  }
  return response.json()
}
