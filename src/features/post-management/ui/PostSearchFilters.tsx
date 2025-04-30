import { Tag, useTagsList } from "@entities/tag/model/model"
import { sortValue } from "@features/filter-management/config/sortValue"
import { useSearchParams } from "@features/filter-management/model/useSearchParams"
import { SearchInput } from "@shared/ui/input/SearchInput"
import { SelectRoot } from "@shared/ui/select/SelectRoot"
import React from "react"

import { useState, useEffect } from "react"

export const PostSearchFilters: React.FC = () => {
  // Zustand 훅 사용
  const { searchParams, updateSearchQuery, updateSelectedTag, updateSortBy, updateSortOrder } = useSearchParams()

  // 검색어 로컬 상태 (입력 중인 값)
  const [searchValue, setSearchValue] = useState(searchParams.searchQuery)

  // 태그 목록 가져오기
  const { data: tags } = useTagsList()

  // 검색 파라미터가 변경될 때 로컬 상태 업데이트
  useEffect(() => {
    setSearchValue(searchParams.searchQuery)
  }, [searchParams.searchQuery])

  // 검색 핸들러
  const handleSearchPost = () => {
    updateSearchQuery(searchValue)
  }

  // 태그 선택 아이템 구성
  const tagItems = [
    { id: 0, value: "all", label: "모든 태그" },
    ...(tags?.map((tag: Tag, index: number) => ({
      id: index + 1,
      value: tag.slug,
      label: tag.slug,
    })) || []),
  ]

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <SearchInput
          placeholder="게시물 검색..."
          initialValue={searchValue}
          onChange={(v) => setSearchValue(v)}
          onEnter={handleSearchPost}
        />
      </div>

      <SelectRoot
        items={tagItems}
        placeholder="태그 선택"
        value={searchParams.selectedTag}
        onValueChange={(selectedTag) => updateSelectedTag(selectedTag)}
      />

      <SelectRoot
        items={sortValue.options.by}
        placeholder="정렬 기준"
        value={searchParams.sortBy}
        onValueChange={(sortBy) => updateSortBy(sortBy)}
      />

      <SelectRoot
        items={sortValue.options.order}
        placeholder="정렬 순서"
        value={searchParams.sortOrder}
        onValueChange={(sortOrder) => updateSortOrder(sortOrder)}
      />
    </div>
  )
}
