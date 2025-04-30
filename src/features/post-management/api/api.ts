import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { addPost, deletePost, readPostApi, updatePost } from "../../../entities/post/api/api"
import { useSearchParams } from "@features/filter-management/model/useSearchParams"
import { Post, PostResponse } from "@entities/post/model/type"

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
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
    mutationFn: addPost,
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
    mutationFn: updatePost,
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
