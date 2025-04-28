import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getCommentsByPostId, likeComment } from "../../../entities/comment/api/api"

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
