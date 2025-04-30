import { useQuery } from "@tanstack/react-query"
import { getUserById } from "../../../entities/user/api/api"
import { useEffect } from "react"
import { User, UserList } from "@entities/user/model/types"
import { userCache } from "@entities/user/lib"
import { authorValue } from "../config/autherValue"

export const useUserById = (userId: number, options = {}) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
    ...options,
  })
}

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch("/api/users?limit=0", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const data: UserList = await response.json()
    return data.users
  } catch (error) {
    console.error("사용자 목록 조회 오류:", error)
    throw new Error(`사용자 목록 조회 오류: ${error}`)
  }
}

export const useUserCache = () => {
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const data = await getAllUsers()
    if (!data) return

    if (data) userCache.setUser(data)
  }

  const getUser = async (id: number) => {
    const cacheUser = userCache.getUser(id)
    if (cacheUser) return cacheUser

    const data = await getUserById(id)
    if (!data) return null

    if (data) userCache.updateUser(data)
    return data
  }

  return { userData: [...userCache.users.values()], fetchUsers, getUser }
}

export const useQueryPostAuthor = (userId: number) => {
  const { data: author } = useQuery<User>({
    queryKey: ["author", userId],
    queryFn: async () => {
      if (userCache.hasUser(userId)) {
        return userCache.getUser(userId) as User
      } else {
        const userData = await getUserById(userId)
        userCache.updateUser(userData)
        return userData
      }
    },
    initialData: authorValue.initial,
  })

  return { author }
}
