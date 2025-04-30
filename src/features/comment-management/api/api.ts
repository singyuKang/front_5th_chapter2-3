import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  addCommentApi,
  deleteComment,
  getCommentsByPostId,
  likeComment,
  updateComment,
} from "../../../entities/comment/api/api.ts"
import { Comment, CommentsResponse } from "@entities/comment/model/types.ts"

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

  const addCommentToCache = (newComment: Comment, oldComment: CommentsResponse) => ({
    ...oldComment,
    comments: [
      {
        ...newComment,
        id: oldComment?.comments?.length || 0,
      },
      ...(oldComment?.comments || []),
    ],
    total: (oldComment?.total || 0) + 1,
  })

  const { mutate: addComment } = useMutation({
    mutationFn: addCommentApi,
    onSuccess: (data: Comment) => {
      queryClient.setQueryData(["comments", data.postId], (oldComment: CommentsResponse) =>
        addCommentToCache(data, oldComment),
      )
    },
  })

  return { addComment }
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
