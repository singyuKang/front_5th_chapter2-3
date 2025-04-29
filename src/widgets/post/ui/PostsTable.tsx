import React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shared/ui"
import { Button } from "@shared/ui"
import { ThumbsUp, ThumbsDown, MessageSquare, Edit2, Trash2 } from "lucide-react"
import { useSelectedPostHook } from "@features/post-management/model/useSelectedPost"
import { useModal } from "@features/modal/hooks/useModal"
import { Post } from "@entities/post/model/type"
import { highlightText } from "@shared/utils/highlightText"

interface PostsTableProps {
  posts: any[]
  searchQuery: string
  selectedTag: string
  setSelectedPost: (post: any) => void
  setShowEditDialog: (show: boolean) => void
  handleDeletePost: (id: number) => void
  handleOpenUserModal: (user: any) => void
  updateURL: () => void
  setSelectedTag: (tag: string) => void
}

export const PostsTable: React.FC<PostsTableProps> = ({
  posts,
  searchQuery,
  selectedTag,
  setSelectedPost,
  setShowEditDialog,
  handleDeletePost,
  handleOpenUserModal,
  updateURL,
  setSelectedTag,
}) => {
  const { updateSelectedPost } = useSelectedPostHook()
  const { openModal } = useModal()

  const handleOpenPostDetail = (post: Post) => {
    updateSelectedPost(post)
    openModal("detailPost")
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{highlightText(post.title, searchQuery)}</div>

                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        setSelectedTag(tag)
                        updateURL()
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => handleOpenUserModal(post.author)}
              >
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleOpenPostDetail(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedPost(post)
                    setShowEditDialog(true)
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default PostsTable
