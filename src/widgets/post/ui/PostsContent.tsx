import React from "react"
import { CardContent } from "@shared/ui"
import PostsFilter from "./PostsFilter"
import PostsTable from "./PostsTable"
import PostsPagination from "./PostsPagination"

interface PostsContentProps {
  // 필터 관련 props
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleSearch: () => void
  selectedTag: string
  setSelectedTag: (tag: string) => void
  fetchPostsByTag: (tag: string) => void
  updateURL: () => void
  sortBy: string
  setSortBy: (sortBy: string) => void
  sortOrder: string
  setSortOrder: (sortOrder: string) => void
  tags: any[]

  // 테이블 관련 props
  posts: any[]
  openPostDetail: (post: any) => void
  setSelectedPost: (post: any) => void
  setShowEditDialog: (show: boolean) => void
  handleDeletePost: (id: number) => void
  handleOpenUserModal: (user: any) => void
  highlightText: (text: string, highlight: string) => React.ReactNode

  // 페이지네이션 관련 props
  skip: number
  setSkip: (skip: number) => void
  limit: number
  setLimit: (limit: number) => void
  total: number

  // 로딩 상태
  isLoadingData: boolean
}

export const PostsContent: React.FC<PostsContentProps> = (props) => {
  const {
    isLoadingData,
    posts,
    searchQuery,
    setSearchQuery,
    handleSearch,
    selectedTag,
    setSelectedTag,
    fetchPostsByTag,
    updateURL,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    tags,
    openPostDetail,
    setSelectedPost,
    setShowEditDialog,
    handleDeletePost,
    handleOpenUserModal,
    highlightText,
    skip,
    setSkip,
    limit,
    setLimit,
    total,
  } = props

  return (
    <CardContent>
      <div className="flex flex-col gap-4">
        {/* 검색 및 필터 컨트롤 */}
        <PostsFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          fetchPostsByTag={fetchPostsByTag}
          updateURL={updateURL}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          tags={tags}
        />

        {/* 게시물 테이블 */}
        {isLoadingData ? (
          <div className="flex justify-center p-4">로딩 중...</div>
        ) : (
          <PostsTable
            posts={posts}
            searchQuery={searchQuery}
            selectedTag={selectedTag}
            openPostDetail={openPostDetail}
            setSelectedPost={setSelectedPost}
            setShowEditDialog={setShowEditDialog}
            handleDeletePost={handleDeletePost}
            handleOpenUserModal={handleOpenUserModal}
            updateURL={updateURL}
            setSelectedTag={setSelectedTag}
            highlightText={highlightText}
          />
        )}

        {/* 페이지네이션 */}
        <PostsPagination skip={skip} setSkip={setSkip} limit={limit} setLimit={setLimit} total={total} />
      </div>
    </CardContent>
  )
}

export default PostsContent
