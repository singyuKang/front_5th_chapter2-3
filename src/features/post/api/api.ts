import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { addPostApi, deletePostAPi, readPostApi, updatePostApi } from "../../../entities/post/api/api"
import { useSearchParams } from "@features/filter/model/useSearchParams"
import { Post, PostResponse } from "@entities/post/model"

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  const searchParams = useSearchParams((state) => state.searchParams)

  const deletePostFromCache = (postId: number, oldData: PostResponse) => ({
    limit: oldData.limit,
    skip: oldData.skip,
    posts: (oldData?.posts || []).filter((post) => post.id !== postId),
    total: oldData?.total ? oldData.total - 1 : 0,
  })

  const { mutate: deletePost } = useMutation({
    mutationFn: (id: number) => deletePostAPi(id),
    onSuccess: (postId: number) => {
      queryClient.setQueryData(["posts", searchParams], (oldData: PostResponse) => deletePostFromCache(postId, oldData))
    },
  })

  return { deletePost }
}

export const useMutationPostCreate = () => {
  const queryClient = useQueryClient()
  const searchParams = useSearchParams((state) => state.searchParams)

  const addPostToCache = (newPost: Post, oldData: PostResponse) => ({
    limit: oldData.limit,
    skip: oldData.skip,
    posts: [
      {
        id: newPost.id,
        title: newPost.title,
        userId: newPost.userId,
        body: newPost.body,
        reactions: { likes: 0, dislikes: 0 },
        tags: [],
        views: 0,
      },
      ...(oldData?.posts || []),
    ],
    total: (oldData?.total || 0) + 1,
  })

  const {
    mutate: createPost,
    isError,
    error,
  } = useMutation({
    mutationFn: addPostApi,
    onSuccess: (data: Post) => {
      queryClient.setQueryData(["posts", searchParams], (oldData: PostResponse) => {
        if (!oldData) return oldData
        return addPostToCache(data, oldData)
      })
    },
  })

  return { createPost, isError, error }
}
const DEFAULT_QUERY_RESULT: PostResponse = {
  posts: [],
  total: 0,
  skip: 0,
  limit: 0,
}

export const useQueryPostList = () => {
  const searchParams = useSearchParams((state) => state.searchParams)

  const { data, isLoading, error } = useQuery<PostResponse>({
    queryKey: ["posts", searchParams],
    queryFn: () => readPostApi(searchParams),
    initialData: DEFAULT_QUERY_RESULT,
  })

  return {
    posts: data,
    isLoading,
    error,
  }
}

export const useMutationEditPostUpdate = () => {
  const queryClient = useQueryClient()
  const searchParams = useSearchParams((state) => state.searchParams)

  const updatePostInCache = (updatedPost: Post, oldData: PostResponse) => ({
    limit: oldData.limit,
    skip: oldData.skip,
    posts: (oldData?.posts || []).map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    total: oldData?.total || 0,
  })

  const {
    mutate: editPost,
    isError,
    error,
  } = useMutation({
    mutationFn: updatePostApi,
    onSuccess: (data: Post) => {
      queryClient.setQueryData(["posts", searchParams], (oldData: PostResponse) => {
        if (!oldData) return oldData
        return updatePostInCache(data, oldData)
      })
    },
    onError: (error) => {
      console.error("게시물 업데이트 오류:", error)
    },
  })

  return {
    editPost,
    isError,
    error,
  }
}
