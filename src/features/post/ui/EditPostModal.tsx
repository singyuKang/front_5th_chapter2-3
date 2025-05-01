import { useModal } from "@features/modal/hooks/useModal"
import { Button } from "@shared/ui"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { Input } from "@shared/ui/input/Input"
import { Textarea } from "@shared/ui/textarea/TextArea"
import { useSelectedPostHook } from "../model/useSelectedPost"
import { useMutationEditPostUpdate } from "../api/api"

const EditPostModal = () => {
  const { openEditPost, closeModal } = useModal()
  const { selectedPost, updateSelectedPost, resetPost } = useSelectedPostHook()
  const { editPost } = useMutationEditPostUpdate()

  const handleUpdatePost = () => {
    editPost(selectedPost)
    resetPost()
    closeModal("editPost")
  }

  return (
    <Dialog open={openEditPost} onOpenChange={() => closeModal("editPost")}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => updateSelectedPost({ ...selectedPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => updateSelectedPost({ ...selectedPost, body: e.target.value })}
          />
          <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditPostModal
