import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  addCommentApi,
  deleteCommentApi,
  getCommentsByPostIdApi,
  likeCommentApi,
  updateCommentApi,
} from "@entities/comment/api/api.ts"
import { Comment, CommentsResponse, DeletedCommentResponse } from "@entities/comment/model/types.ts"

export const useCommentsByPostId = (postId?: number) => {
  const { data, isLoading, error } = useQuery<CommentsResponse>({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsByPostIdApi(postId as number),
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

  const updateLikeInCache = (updatedComment: Comment, oldData: CommentsResponse) => ({
    ...oldData,
    comments:
      oldData?.comments?.map((comment) =>
        comment.id === updatedComment.id ? { ...comment, likes: comment.likes + 1 } : comment,
      ) || [],
  })

  const { mutate: likeComment } = useMutation({
    mutationFn: likeCommentApi,
    onSuccess: (data: Comment) => {
      queryClient.setQueryData(["comments", data.postId], (oldData: CommentsResponse) =>
        updateLikeInCache(data, oldData),
      )
    },
  })

  return { likeComment }
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

  const updateCommentCache = (oldComment: CommentsResponse, newComment: Comment) => {
    return {
      limit: oldComment.limit,
      skip: oldComment.skip,
      comments: oldComment.comments.map((comment) => (comment.id === newComment.id ? newComment : comment)),
      total: (oldComment?.total || 0) + 1,
    }
  }

  const { mutate: updateComment } = useMutation({
    mutationFn: updateCommentApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["comments", data.postId], (oldComment: CommentsResponse) =>
        updateCommentCache(oldComment, data),
      )
    },
  })

  return { updateComment }
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  const updateCommentCache = (response: CommentsResponse, deleteCommentResponse: DeletedCommentResponse) => {
    if (!response || !response.comments) return response

    return {
      ...response,
      comments: response.comments.filter((comment) => comment.id !== deleteCommentResponse.id),
      total: Math.max(0, response.total - 1),
    }
  }

  const { mutate: deleteComment } = useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: (deleteCommentResponse: DeletedCommentResponse) => {
      queryClient.setQueryData(["comments", deleteCommentResponse.postId], (response: CommentsResponse) => {
        const result = updateCommentCache(response, deleteCommentResponse)
        return result
      })
    },
  })

  return { deleteComment }
}
