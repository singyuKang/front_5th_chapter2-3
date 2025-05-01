import { Comment } from "@entities/comment/model/types"
import { create } from "zustand"
import { commentFormValue } from "../config"

interface SelectedCommentState {
  selectedComment: Comment
  updateSelectedComment: (comment: Comment) => void
  resetSelectedComment: () => void
}

export const useSelectedComment = create<SelectedCommentState>((set) => ({
  selectedComment: commentFormValue.comment,

  updateSelectedComment: (comment: Comment) =>
    set({
      selectedComment: comment,
    }),

  resetSelectedComment: () =>
    set({
      selectedComment: commentFormValue.comment,
    }),
}))
