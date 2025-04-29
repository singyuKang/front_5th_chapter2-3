import { User } from "../model/types"

export const getUsersList = async ({ limit = 0, select = "username,image" }) => {
  const response = await fetch(`/api/users?limit=${limit}&select=${select}`)
  if (!response.ok) {
    throw new Error("사용자 가져오기 실패")
  }
  return response.json()
}

export const getUserById = async (userId: number): Promise<User | null> => {
  if (!userId) return null

  const response = await fetch(`/api/users/${userId}`)
  if (!response.ok) {
    throw new Error("사용자 정보 가져오기 실패")
  }
  return response.json()
}
