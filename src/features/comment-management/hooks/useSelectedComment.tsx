import { Comment } from "@entities/comment/model/types"
import { create } from "zustand"

const initialComment = {
  id: -1,
  body: "",
  likes: -1,
  postId: -1,
  user: {
    id: 0,
    age: 0,
    phone: "",
    username: "",
    firstName: "",
    lastName: "",
    address: { address: "", city: "", state: "" },
    company: { name: "", title: "" },
    email: "",
    image: "",
  },
} as Comment

interface SelectedCommentState {
  selectedComment: Comment
  updateSelectedComment: (comment: Comment) => void
  resetSelectedComment: () => void
}

export const useSelectedComment = create<SelectedCommentState>((set) => ({
  selectedComment: initialComment,

  updateSelectedComment: (comment: Comment) =>
    set({
      selectedComment: comment,
    }),

  resetSelectedComment: () =>
    set({
      selectedComment: initialComment,
    }),
}))
