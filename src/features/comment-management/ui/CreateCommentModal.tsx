import { useModal } from "@features/modal/hooks/useModal"
import { Button } from "@shared/ui"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { Textarea } from "@shared/ui/textarea/TextArea"
import { useState } from "react"

const CreateCommentModal = () => {
  const { openCreateComment, closeModal } = useModal()

  const [newComment, setNewComment] = useState({ body: "", postId: null, userId: 1 })

  const handleAddComment = () => {
    // TODO : Add Comment
    console.log("Add Comment")
  }

  return (
    <Dialog open={openCreateComment} onOpenChange={() => closeModal("createComment")}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCommentModal
