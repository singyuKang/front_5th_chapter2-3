import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addComment, getCommentsByPostId, likeComment, updateComment } from "../../../entities/comment/api/api"

export const useCommentsByPostId = (postId) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsByPostId(postId),
    enabled: !!postId,
  })
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
