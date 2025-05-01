import { SearchParams } from "@features/filter/model/types"
import { Post, PostForm, PostResponse } from "../model/type"
import { buildURLPath } from "@features/filter/utils/buildURLPath"
import { apiFetch } from "@shared/utils/apiFetch"

export const getPostsByTag = async (tag: string): Promise<PostResponse | null> => {
  if (!tag || tag === "all") return null

  try {
    return await apiFetch(`/posts/tag/${tag}`)
  } catch (error) {
    console.error("태그별 게시물 가져오기 실패:", error)
    throw new Error("태그별 게시물 가져오기 실패")
  }
}

export const searchPosts = async (query: string): Promise<PostResponse | null> => {
  if (!query) return null

  try {
    return await apiFetch(`/posts/search?q=${encodeURIComponent(query)}`)
  } catch (error) {
    console.error("검색 중 오류 발생:", error)
    throw new Error(`게시물 검색 중 오류 발생: ${error instanceof Error ? error.message : "알 수 없는 오류"}`)
  }
}

export const updatePost = async (selectedPost: Partial<Post>): Promise<Post> => {
  try {
    return await apiFetch(`/posts/${selectedPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedPost),
    })
  } catch (error) {
    console.error("게시물 업데이트 실패:", error)
    throw new Error(`Failed to update post: ${error}`)
  }
}

export const deletePostAPi = async (id: number): Promise<number> => {
  try {
    await apiFetch(`/posts/${id}`, {
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
    return await apiFetch("/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
  } catch (error) {
    console.error("게시물 추가 오류:", error)
    throw new Error(`게시물 추가 오류: ${error}`)
  }
}

export const readPostApi = async (params: SearchParams): Promise<PostResponse> => {
  try {
    const queryString = buildURLPath({ ...params })
    return await apiFetch(`/posts${queryString}`)
  } catch (error) {
    console.error("게시물 Read 오류:", error)
    throw new Error(`게시물 Read 오류 ${error}`)
  }
}
