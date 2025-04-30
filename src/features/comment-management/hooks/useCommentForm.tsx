import { NewComment } from "@entities/comment/model/types"
import { useEffect, useState } from "react"

export const useCommentForm = (initialCommentData: NewComment) => {
  const [commentForm, setCommentForm] = useState<NewComment>({
    ...initialCommentData,
  })

  useEffect(() => {
    setCommentForm({ ...initialCommentData })
  }, [])

  const updateCommentForm = (update: Partial<NewComment>) => {
    setCommentForm((prev) => ({ ...prev, ...update }))
  }

  const resetCommentForm = () => {
    setCommentForm((prev) => ({ ...prev, title: "", body: "" }))
  }

  return {
    commentForm: commentForm,
    updateCommentForm,
    resetCommentForm,
  }
}

export default useCommentForm
