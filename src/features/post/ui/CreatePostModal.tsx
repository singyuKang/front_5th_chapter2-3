import { useModal } from "@features/modal/hooks/useModal"
import { Button } from "@shared/ui/button/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { Input } from "@shared/ui/input/Input"
import { Textarea } from "@shared/ui/textarea/TextArea"
import { useState } from "react"
import { useMutationPostCreate } from "../api/api"
import { PostForm } from "@entities/post/model"

const CreatePostModal = () => {
  const postInitialValue = {
    title: "",
    body: "",
    userId: 1,
  }

  const [newPost, setNewPost] = useState(postInitialValue)
  const { openCreatePost, closeModal } = useModal()

  const { createPost } = useMutationPostCreate()

  const handleAddPost = () => {
    // TODO : Handle Add Post
    console.log("Add Post")
    createPost(newPost as PostForm)
    closeModal("createPost")
    setNewPost(postInitialValue)
  }

  return (
    <Dialog open={openCreatePost} onOpenChange={() => closeModal("createPost")}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={handleAddPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreatePostModal
