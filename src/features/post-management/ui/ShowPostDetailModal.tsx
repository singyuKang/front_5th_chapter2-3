import { useModal } from "@features/modal/hooks/useModal"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { highlightText } from "@shared/utils/highlightText"
import { useSelectedPostHook } from "../model/useSelectedPost"

export const ShowPostDetailModal: React.FC = () => {
  const { openDetailPost, closeModal } = useModal()
  const { selectedPost } = useSelectedPostHook()
  // console.log("🚀 ~ selectedPost:", selectedPost)

  return (
    <Dialog open={openDetailPost} onOpenChange={() => closeModal("detailPost")}>
      <DialogContent>
        <DialogHeader>
          {/* <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle> */}
          <DialogTitle>{highlightText(selectedPost?.title, "test")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 w-full max-w-md">
          {/* <p>{highlightText(selectedPost?.body, searchQuery)}</p> */}
          {/* <CommentInfoBox postId={selectedPost?.id} searchQuery={searchQuery} /> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
