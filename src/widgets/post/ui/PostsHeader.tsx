import { Button, CardHeader, CardTitle } from "@shared/ui"
import { Plus } from "lucide-react"

interface PostsHeaderProps {
  onAddClick: () => void
  title?: string
}

export const PostsHeader: React.FC<PostsHeaderProps> = ({ onAddClick, title = "게시물 관리자" }) => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>{title}</span>
        <Button onClick={onAddClick}>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>
      </CardTitle>
    </CardHeader>
  )
}
