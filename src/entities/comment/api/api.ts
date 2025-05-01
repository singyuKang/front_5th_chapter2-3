import { Comment, CommentsResponse, NewComment } from "../model/types"

export const getCommentsByPostId = async (postId: number): Promise<CommentsResponse> => {
  try {
    const response = await fetch(`/api/comments/post/${postId}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data: CommentsResponse = await response.json()
    return data
  } catch (error) {
    console.error("댓글 조회 오류:", error)
    throw new Error(`댓글 조회 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`)
  }
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

export const addCommentApi = async (commentData: NewComment) => {
  try {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("댓글 추가 오류:", error)
    throw new Error(`댓글 추가 오류: ${error}`)
  }
}

export const updateCommentApi = async (comment: Comment): Promise<Comment> => {
  try {
    const response = await fetch(`/api/comments/${comment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: comment.body, likes: comment.likes }),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("댓글 수정 오류:", error)
    throw new Error(`댓글 수정 오류: ${error}`)
  }
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
