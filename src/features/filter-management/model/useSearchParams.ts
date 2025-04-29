import { create } from "zustand"
import { SearchParams } from "./types"

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
}

export const useSearchParams = create<SearchParamsState>((set) => ({
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
}))
