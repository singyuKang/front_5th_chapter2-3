import { useQuery } from "@tanstack/react-query"
import { getTagsListApi } from "../api/api.ts"

export interface Tag {
  slug: string
  name: string
  url: string
}

export const useTagsList = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: getTagsListApi,
  })
}
