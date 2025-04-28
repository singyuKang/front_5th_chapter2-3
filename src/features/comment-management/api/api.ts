import { useQuery } from "@tanstack/react-query"
import { getCommentsByPostId } from "../../../entities/comment/api/api"

export const useCommentsByPostId = (postId) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsByPostId(postId),
    enabled: !!postId,
  })
}
