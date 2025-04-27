import { useQuery } from "@tanstack/react-query"
import { getTagsList } from "../api/api.ts"

export interface Tag {
  slug: string
  name: string
  url: string
}

export const useTagsList = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: getTagsList,
  })
}
