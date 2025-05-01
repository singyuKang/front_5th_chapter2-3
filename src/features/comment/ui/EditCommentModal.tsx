import { useModal } from "@features/modal/hooks/useModal"
import { Button } from "@shared/ui/button/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { Textarea } from "@shared/ui/textarea/TextArea"
import useCommentForm from "../hooks/useCommentForm"
import { useUpdateComment } from "../api/api"
import { useSelectedComment } from "../hooks/useSelectedComment"
import { useEffect } from "react"
import { Comment } from "@entities/comment/model/types"
import { commentFormValue } from "../config/commentFormValue"

export const EditCommentModal: React.FC = () => {
  const { openEditComment, closeModal } = useModal()

  const { selectedComment } = useSelectedComment()

  const { commentForm, updateCommentForm, resetCommentForm } = useCommentForm(commentFormValue.form)
  const { updateComment } = useUpdateComment()

  useEffect(() => {
    updateCommentForm({
      postId: selectedComment?.id,
      body: selectedComment?.body,
    })
  }, [selectedComment])

  const handleSubmitComment = () => {
    updateComment({ ...selectedComment, ...commentForm } as Comment)
    closeModal("editComment")
    resetCommentForm()
  }

  return (
    <Dialog open={openEditComment} onOpenChange={() => closeModal("editComment")}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={commentForm.body}
            onChange={(e) =>
              updateCommentForm({
                body: (e.target as HTMLTextAreaElement).value,
              })
            }
          />
          <Button onClick={handleSubmitComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditCommentModal
