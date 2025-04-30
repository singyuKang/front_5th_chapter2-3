import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  addComment,
  deleteComment,
  getCommentsByPostId,
  likeComment,
  updateComment,
} from "../../../entities/comment/api/api.ts"
import { CommentsResponse } from "@entities/comment/model/types.ts"

export const useCommentsByPostId = (postId?: number) => {
  const { data, isLoading, error } = useQuery<CommentsResponse>({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsByPostId(postId as number),
    enabled: !!postId,
    staleTime: 60000,
  })

  return {
    commentsData: data,
    comments: data?.comments || [],
    total: data?.total || 0,
    isLoading,
    error,
  }
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
