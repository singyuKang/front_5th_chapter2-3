import { User } from "../model/types"

export const getUsersList = async ({ limit = 0, select = "username,image" }) => {
  const response = await fetch(`/api/users?limit=${limit}&select=${select}`)
  if (!response.ok) {
    throw new Error("사용자 가져오기 실패")
  }
  return response.json()
}

export const getUserById = async (userId: number): Promise<User> => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("사용자 조회 오류:", error)
    throw new Error(`사용자 조회 오류: ${error}`)
  }
}
