import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  addPost,
  deletePost,
  getPostsByTag,
  readPostApi,
  searchPosts,
  updatePost,
} from "../../../entities/post/api/api"
import { getUsersList } from "../../../entities/user/api/api"
import { useSearchParams } from "@features/filter-management/model/useSearchParams"
import { PostResponse } from "@entities/post/model/type"

export const usePostsByTag = (tag) => {
  // 태그가 없거나 'all'이면 쿼리 비활성화
  const enabled = !!tag && tag !== "all"

  // 태그별 게시물 쿼리
  const postsQuery = useQuery({
    queryKey: ["posts", "by-tag", tag],
    queryFn: () => getPostsByTag(tag),
    enabled, // 활성화 조건 설정
  })

  // 사용자 쿼리 - 모든 게시물에 사용자 정보를 포함하기 위해 필요
  const usersQuery = useQuery({
    queryKey: ["users", "minimal"],
    queryFn: () => getUsersList({ select: "username,image" }),
  })

  // 결과 통합
  const isLoading = postsQuery.isLoading || usersQuery.isLoading
  const isError = postsQuery.isError || usersQuery.isError
  const error = postsQuery.error || usersQuery.error

  let posts = []
  let total = 0

  if (postsQuery.data && usersQuery.data) {
    total = postsQuery.data.total
    posts = postsQuery.data.posts.map((post) => ({
      ...post,
      author: usersQuery.data.users.find((user) => user.id === post.userId),
    }))
  }

  return {
    posts,
    total,
    isLoading,
    isError,
    error,
  }
}

export const useSearchPosts = (query) => {
  // 쿼리가 없으면 비활성화
  const enabled = !!query

  return useQuery({
    queryKey: ["posts", "search", query],
    queryFn: () => searchPosts(query),
    enabled,
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postData) => updatePost(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}

export const useMutationPostCreate = () => {
  const queryClient = useQueryClient()

  const { mutate: createPost } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      // 성공 시 posts 관련 쿼리 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      })
    },
  })

  return { createPost }
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
