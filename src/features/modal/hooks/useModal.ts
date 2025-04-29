import { create } from "zustand"

interface ModalState {
  modals: {
    createPost: boolean
    editPost: boolean
    detailPost: boolean
    detailUser: boolean
    createComment: boolean
    editComment: boolean
  }

  openModal: (key: string) => void
  closeModal: (key: string) => void
}

export const useModalStore = create<ModalState>((set) => ({
  modals: {
    createPost: false,
    editPost: false,
    detailPost: false,
    detailUser: false,
    createComment: false,
    editComment: false,
  },

  openModal: (key: string) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [key]: true,
      },
    })),

  closeModal: (key: string) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [key]: false,
      },
    })),
}))

export const useModal = () => {
  const { modals, openModal, closeModal } = useModalStore()

  return {
    openCreatePost: modals.createPost,
    openEditPost: modals.editPost,
    openDetailPost: modals.detailPost,
    openDetailUser: modals.detailUser,
    openCreateComment: modals.createComment,
    openEditComment: modals.editComment,
    openModal,
    closeModal,
  }
}
