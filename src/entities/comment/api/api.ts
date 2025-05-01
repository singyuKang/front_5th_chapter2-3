import { apiFetch } from "@shared/utils/apiFetch"
import { Comment, CommentsResponse, DeletedCommentResponse, NewComment } from "../model/types"

export const getCommentsByPostIdApi = async (postId: number): Promise<CommentsResponse> => {
  try {
    return await apiFetch(`/comments/post/${postId}`)
  } catch (error) {
    console.error("댓글 조회 오류:", error)
    throw new Error(`댓글 조회 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`)
  }
}

export const likeCommentApi = async ({ id, likes }: { id: number; likes: number }): Promise<Comment> => {
  try {
    return await apiFetch(`/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes }),
    })
  } catch (error) {
    console.error("댓글 좋아요 오류:", error)
    throw new Error(`댓글 좋아요 오류: ${error}`)
  }
}

export const addCommentApi = async (commentData: NewComment): Promise<Comment> => {
  try {
    return await apiFetch("/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    })
  } catch (error) {
    console.error("댓글 추가 오류:", error)
    throw new Error(`댓글 추가 오류: ${error}`)
  }
}

export const updateCommentApi = async (comment: Comment): Promise<Comment> => {
  try {
    return await apiFetch(`/comments/${comment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: comment.body, likes: comment.likes }),
    })
  } catch (error) {
    console.error("댓글 수정 오류:", error)
    throw new Error(`댓글 수정 오류: ${error}`)
  }
}

export const deleteCommentApi = async (id: number): Promise<DeletedCommentResponse> => {
  try {
    return await apiFetch(`/comments/${id}`, {
      method: "DELETE",
    })
  } catch (error) {
    console.error("댓글 삭제 오류:", error)
    throw new Error(`댓글 삭제 오류: ${error}`)
  }
}
