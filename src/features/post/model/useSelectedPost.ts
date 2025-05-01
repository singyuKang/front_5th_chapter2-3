import { Post } from "@entities/post/model/type"
import { create } from "zustand"

interface SelectedPostState {
  selectedPost: Post | null
  updateSelectedPost: (post: Post) => void
  resetPost: () => void
}

const selectedPostValue = {
  initial: {
    id: 0,
    body: "",
    reactions: { likes: 0, dislikes: 0 },
    tags: [],
    title: "",
    userId: 0,
    views: 0,
  } as Post,
}

export const useSelectedPost = create<SelectedPostState>((set) => ({
  selectedPost: null,
  updateSelectedPost: (post) => set({ selectedPost: post }),
  resetPost: () => set({ selectedPost: null }),
}))

export const useSelectedPostHook = () => {
  const state = useSelectedPost()

  return {
    selectedPost: state.selectedPost || selectedPostValue.initial,
    updateSelectedPost: state.updateSelectedPost,
    resetPost: state.resetPost,
  }
}
