import { create } from "zustand"
import { SearchParams } from "./types"
import { useNavigate } from "react-router-dom"

const initialSearchParams: SearchParams = {
  skip: 0,
  limit: 10,
  sortBy: "",
  sortOrder: "asc",
  searchQuery: "",
  selectedTag: "",
}

interface SearchParamsState {
  searchParams: SearchParams
  setSearchParams: (params: Partial<SearchParams>) => void
  resetSearchParams: () => void
  updateSkip: (skip: number) => void
  updateLimit: (limit: number) => void
  updateSortBy: (sortBy: string) => void
  updateSortOrder: (sortOrder: string) => void
  updateSearchQuery: (searchQuery: string) => void
  updateSelectedTag: (selectedTag: string) => void
  goNextPage: () => void
  goPrevPage: () => void
}

export const useSearchParams = create<SearchParamsState>((set, get) => ({
  searchParams: initialSearchParams,

  setSearchParams: (params) =>
    set((state) => ({
      searchParams: { ...state.searchParams, ...params },
    })),

  resetSearchParams: () => set({ searchParams: initialSearchParams }),

  updateSkip: (skip) =>
    set((state) => ({
      searchParams: { ...state.searchParams, skip },
    })),

  updateLimit: (limit) =>
    set((state) => ({
      searchParams: { ...state.searchParams, limit },
    })),

  updateSortBy: (sortBy) =>
    set((state) => ({
      searchParams: { ...state.searchParams, sortBy },
    })),

  updateSortOrder: (sortOrder) =>
    set((state) => ({
      searchParams: { ...state.searchParams, sortOrder },
    })),

  updateSearchQuery: (searchQuery) =>
    set((state) => ({
      searchParams: { ...state.searchParams, searchQuery },
    })),

  updateSelectedTag: (selectedTag) =>
    set((state) => ({
      searchParams: { ...state.searchParams, selectedTag },
    })),

  goToNextPage: () => {
    const { searchParams } = get()
    const { skip, limit } = searchParams
    set((state) => ({
      searchParams: { ...state.searchParams, skip: skip + limit },
    }))
  },

  goNextPage: () => {
    const { searchParams } = get()
    const { skip, limit } = searchParams
    set((state) => ({
      searchParams: { ...state.searchParams, skip: skip + limit },
    }))
  },

  goPrevPage: () => {
    const { searchParams } = get()
    const { skip, limit } = searchParams
    // 음수가 되지 않도록 Math.max 사용
    const newSkip = Math.max(0, skip - limit)
    set((state) => ({
      searchParams: { ...state.searchParams, skip: newSkip },
    }))
  },
}))

export const useNavigateWithParams = () => {
  const navigate = useNavigate()
  const { searchParams } = useSearchParams()

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()
    const { skip, limit, searchQuery, sortBy, sortOrder, selectedTag } = searchParams

    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)

    navigate(`?${params.toString()}`)
  }

  return { updateURL }
}
