import { useModal } from "@features/modal/hooks/useModal"
import { Button } from "@shared/ui"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { Textarea } from "@shared/ui/textarea/TextArea"
import { useAddComment } from "../api/api"
import useCommentForm from "../hooks/useCommentForm"
import { commentFormValue } from "./EditCommentModal"
import { useSelectedPostHook } from "@features/post-management/model/useSelectedPost"
import { useEffect } from "react"

const CreateCommentModal = () => {
  const { openCreateComment, closeModal } = useModal()

  const { addComment } = useAddComment()
  const { commentForm, updateCommentForm, resetCommentForm } = useCommentForm({ ...commentFormValue.form })
  const { selectedPost } = useSelectedPostHook()

  useEffect(() => {
    updateCommentForm({ postId: selectedPost.id })
  }, [selectedPost])

  const handleAddComment = () => {
    addComment(commentForm)
    resetCommentForm()
    closeModal("createComment")
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
            value={commentForm.body}
            onChange={(e) =>
              updateCommentForm({
                body: (e.target as HTMLTextAreaElement).value,
              })
            }
          />
          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCommentModal
