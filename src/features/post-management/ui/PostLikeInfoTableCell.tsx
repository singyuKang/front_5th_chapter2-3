import { TableCell } from "@shared/ui/table/TableCell"
import { ThumbsDown, ThumbsUp } from "lucide-react"

type PostLikeInfoTablePropsType = {
  reactions: { likes: number; dislikes: number }
}

export const PostLikeInfoTableCell: React.FC<PostLikeInfoTablePropsType> = ({ reactions }) => {
  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <ThumbsUp className="w-4 h-4" />
        <span>{reactions.likes}</span>
        <ThumbsDown className="w-4 h-4" />
        <span>{reactions.dislikes}</span>
      </div>
    </TableCell>
  )
}
