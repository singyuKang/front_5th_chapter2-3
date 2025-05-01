import { apiFetch } from "@shared/utils/apiFetch"
import { User } from "../model/types"

export const getUsersList = async ({ limit = 0, select = "username,image" }) => {
  try {
    return await apiFetch(`/users?limit=${limit}&select=${select}`)
  } catch (error) {
    console.error("사용자 가져오기 실패:", error)
    throw new Error("사용자 가져오기 실패")
  }
}

export const getUserById = async (userId: number): Promise<User> => {
  try {
    return await apiFetch(`/users/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("사용자 조회 오류:", error)
    throw new Error(`사용자 조회 오류: ${error}`)
  }
}
