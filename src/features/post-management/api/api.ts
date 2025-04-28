import { useQuery } from "@tanstack/react-query"
import { getPostsList, searchPosts } from "../../../entities/post/api/api"
import { getUsersList } from "../../../entities/user/api/api"

export const usePostsWithUsers = ({ limit, skip }) => {
  // 게시물 쿼리
  const postsQuery = useQuery({
    queryKey: ["posts", { limit, skip }],
    queryFn: () => getPostsList({ limit, skip }),
  })

  // 사용자 쿼리
  const usersQuery = useQuery({
    queryKey: ["users", "minimal"],
    queryFn: () => getUsersList({}),
  })

  // 로딩 상태
  const isLoading = postsQuery.isLoading || usersQuery.isLoading
  const isError = postsQuery.isError || usersQuery.isError
  const error = postsQuery.error || usersQuery.error

  // 데이터 조합
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
