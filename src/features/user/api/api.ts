import { useQuery } from "@tanstack/react-query"
import { getUserByIdApi } from "../../../entities/user/api/api"
import { User } from "@entities/user/model/types"
import { userCache } from "@entities/user/lib"
import { authorValue } from "../config/authorValue"

export const useUserById = (userId: number, options = {}) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserByIdApi(userId),
    enabled: !!userId,
    ...options,
  })
}

export const useQueryPostAuthor = (userId: number) => {
  const { data: author } = useQuery<User>({
    queryKey: ["author", userId],
    queryFn: async () => {
      if (userCache.hasUser(userId)) {
        return userCache.getUser(userId) as User
      } else {
        const userData = await getUserByIdApi(userId)
        userCache.updateUser(userData)
        return userData
      }
    },
    initialData: authorValue.initial,
  })

  return { author }
}
