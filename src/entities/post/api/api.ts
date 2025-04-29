import { SearchParams } from "@features/filter-management/model/types"
import { Post, PostForm, PostResponse } from "../model/type"
import { buildURLPath } from "@features/filter-management/utils/buildURLPath"

export const getPostsList = async ({ limit, skip }: { limit: number; skip: number }): Promise<PostResponse | null> => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  if (!response.ok) {
    throw new Error("게시물 가져오기 실패")
  }
  return response.json()
}

export const getPostsByTag = async (tag: string): Promise<PostResponse | null> => {
  if (!tag || tag === "all") return null

  const response = await fetch(`/api/posts/tag/${tag}`)
  if (!response.ok) {
    throw new Error("태그별 게시물 가져오기 실패")
  }
  return response.json()
}

export const searchPosts = async (query: string): Promise<PostResponse | null> => {
  // 빈 쿼리인 경우 기본 응답 반환
  if (!query) return null

  try {
    const response = await fetch(`/api/posts/search?q=${encodeURIComponent(query)}`)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`게시물 검색 실패: ${response.status} ${errorText}`)
    }

    const data: PostResponse = await response.json()
    return data
  } catch (error) {
    console.error("검색 중 오류 발생:", error)
    throw new Error(`게시물 검색 중 오류 발생: ${error instanceof Error ? error.message : "알 수 없는 오류"}`)
  }
}

export const updatePost = async (selectedPost: Partial<Post>): Promise<Post> => {
  try {
    const response = await fetch(`/api/posts/${selectedPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedPost),
    })
    return (await response.json()) as Post
  } catch (e) {
    throw new Error("Failed to update post" + e)
  }
}

export const deletePost = async (id: number): Promise<number> => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
    return id
  } catch (error) {
    console.error("게시물 삭제 오류:", error)
    throw new Error(`게시물 삭제 오류: ${error}`)
  }
}

export const addPost = async (newPost: PostForm): Promise<Post> => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("게시물 추가 오류:", error)
    throw new Error(`게시물 추가 오류: ${error}`)
  }
}

export const readPostApi = async (params: SearchParams): Promise<PostResponse> => {
  try {
    const queryString = buildURLPath({ ...params })
    const response = await fetch(`/api/posts${queryString}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    throw new Error(`게시물 Read 오류 ${error}`)
  }
}
