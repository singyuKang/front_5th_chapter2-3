import { useModal } from "@features/modal/hooks/useModal"
import { Button } from "@shared/ui"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { Input } from "@shared/ui/input/Input"
import { Textarea } from "@shared/ui/textarea/TextArea"
import { useState } from "react"

const EditPostModal = () => {
  const { openEditPost, closeModal } = useModal()

  const [selectedPost, setSelectedPost] = useState([])

  const handleUpdatePost = () => {
    // TODO : Update Post
    console.log("Update Post")
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
            onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}
          />
          <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditPostModal
