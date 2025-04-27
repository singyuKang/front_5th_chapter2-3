export const getTagsList = async () => {
  try {
    const response = await fetch("/api/posts/tags")
    if (!response.ok) {
      throw new Error("태그 가져오기 실패")
    }
    return await response.json()
  } catch (error) {
    console.error("태그 가져오기 오류:", error)
    throw error
  }
}
