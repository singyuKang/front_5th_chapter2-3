import { apiFetch } from "@shared/utils/apiFetch"

export const getTagsList = async () => {
  try {
    return await apiFetch("/posts/tags")
  } catch (error) {
    console.error("태그 가져오기 오류:", error)
    throw error
  }
}
