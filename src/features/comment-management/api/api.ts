import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  addComment,
  deleteComment,
  getCommentsByPostId,
  likeComment,
  updateComment,
} from "../../../entities/comment/api/api.ts"

export const useCommentsByPostId = (postId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["comment"],
    queryFn: () => getCommentsByPostId(postId),
  })

  if (isLoading) return { data: null, comments: null, isLoading: true, error }

  return { data, comments: data ?? [], isLoading: false, error: null }
}

export const useLikeComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: likeComment,
    onSuccess: (data) => {
      // 댓글 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["comments", data.postId] })
    },
  })
}

export const useAddComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments", data.postId] })
    },
  })
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments", data.postId] })
    },
  })
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: ({ postId }) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] })
    },
  })
}
