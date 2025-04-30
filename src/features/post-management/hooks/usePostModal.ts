import { User } from "@entities/user/model/types"
import { useModal } from "@features/modal/hooks/useModal"
import { useSelectedUser } from "@features/user-management/model/useSelectedUser"
import { useSelectedPostHook } from "../model/useSelectedPost"
import { Post } from "@entities/post/model/type"

export const usePostModals = () => {
  const { updateSelectedPost } = useSelectedPostHook()
  const { updateSelectedUser } = useSelectedUser()
  const { openModal } = useModal()

  const openUserModal = (user: User) => {
    updateSelectedUser(user)
    openModal("detailUser")
  }

  const openPostDetailModal = (post: Post) => {
    updateSelectedPost(post)
    openModal("detailPost")
  }

  const openEditModal = (post: Post) => {
    updateSelectedPost(post)
    openModal("editPost")
  }

  return {
    openUserModal,
    openPostDetailModal,
    openEditModal,
  }
}
