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

export const addComment = async (commentData) => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData),
  })

  if (!response.ok) {
    throw new Error("댓글 추가 실패")
  }

  return response.json()
}

export const updateComment = async ({ id, body }) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body }),
  })

  if (!response.ok) {
    throw new Error("댓글 업데이트 실패")
  }

  return response.json()
}

export const deleteComment = async ({ id, postId }) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("댓글 삭제 실패")
  }

  return { id, postId }
}
