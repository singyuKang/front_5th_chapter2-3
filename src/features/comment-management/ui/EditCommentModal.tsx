import { useModal } from "@features/modal/hooks/useModal"
import { Button } from "@shared/ui"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { Textarea } from "@shared/ui/textarea/TextArea"
import useCommentForm from "../hooks/useCommentForm"

export const commentFormValue = {
  form: {
    userId: 1,
    postId: -1,
    body: "",
  },
  comment: {
    id: -1,
    postId: -1,
    body: "",
    likes: 0,
    user: {
      id: -1,
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      age: 0,
      phone: "",
      image: "",
      address: {
        address: "",
        city: "",
        state: "",
      },
      company: {
        name: "",
        title: "",
      },
    },
  },
}

export const EditCommentModal: React.FC = () => {
  const { openEditComment, closeModal } = useModal()
  const { commentForm, updateCommentForm } = useCommentForm(commentFormValue.form)

  const handleSubmitComment = () => {
    // TODO Submit Comment
    console.log("Submit Comment")
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
