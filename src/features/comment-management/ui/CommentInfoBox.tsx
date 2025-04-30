import { Comment } from "@entities/comment/model/types"
import { useCommentsByPostId } from "../api/api"
import { highlightText } from "@shared/utils/highlightText"
import { Button } from "@shared/ui"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { useModal } from "@features/modal/hooks/useModal"

interface PropsType {
  postId: number
  searchQuery: string
}

export const CommentInfoBox: React.FC<PropsType> = ({ postId, searchQuery }) => {
  const { comments } = useCommentsByPostId(postId)
  const { openModal } = useModal()

  if (!comments) return <></>

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            openModal("createComment")
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments?.map((comment: Comment, index: number) => (
          <div
            key={`${index}th-${comment.id}-${comment.user.id}`}
            className="flex items-center justify-between text-sm border-b pb-1"
          >
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate min-w-[64px]">{comment.user.username}:</span>
              <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // TODO : like UpdateComment
                }}
              >
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // TODO : Edit Comment
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // TODO : Delete Comment
                }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentInfoBox
