import { useQuery } from "@tanstack/react-query"
import { getUserById } from "../../../entities/user/api/api"

export const useUserById = (userId, options = {}) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
    ...options,
  })
}
