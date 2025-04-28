export const getCommentsByPostId = async (postId) => {
  if (!postId) return null

  const response = await fetch(`/api/comments/post/${postId}`)
  if (!response.ok) {
    throw new Error("댓글 가져오기 실패")
  }
  return response.json()
}

export const likeComment = async ({ id, likes }) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes }),
  })

  if (!response.ok) {
    throw new Error("댓글 좋아요 실패")
  }

  return response.json()
}
