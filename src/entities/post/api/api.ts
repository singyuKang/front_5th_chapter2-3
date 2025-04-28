export const getPostsList = async ({ limit, skip }) => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  if (!response.ok) {
    throw new Error("게시물 가져오기 실패")
  }
  return response.json()
}

export const searchPosts = async (query) => {
  if (!query) return null

  const response = await fetch(`/api/posts/search?q=${query}`)
  if (!response.ok) {
    throw new Error("게시물 검색 실패")
  }
  return response.json()
}

export const updatePost = async (postData) => {
  const response = await fetch(`/api/posts/${postData.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  })

  if (!response.ok) {
    throw new Error("게시물 업데이트 실패")
  }

  return response.json()
}
