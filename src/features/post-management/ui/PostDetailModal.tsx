import { useModal } from "@features/modal/hooks/useModal"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { highlightText } from "@shared/utils/highlightText"
import { useSelectedPostHook } from "../model/useSelectedPost"
import { useSearchParams } from "@features/filter-management/model/useSearchParams"
import CommentInfoBox from "@features/comment/ui/CommentInfoBox"

export const PostDetailModal: React.FC = () => {
  const { openDetailPost, closeModal } = useModal()
  const { selectedPost } = useSelectedPostHook()

  const { searchParams } = useSearchParams()

  return (
    <Dialog open={openDetailPost} onOpenChange={() => closeModal("detailPost")}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchParams.searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 w-full max-w-md">
          <p>{highlightText(selectedPost?.body, searchParams.searchQuery)}</p>
          <CommentInfoBox postId={selectedPost?.id} searchQuery={searchParams.searchQuery} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
