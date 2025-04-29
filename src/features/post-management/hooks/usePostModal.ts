import { User } from "@entities/user/model/types"
import { useModal } from "@features/modal/hooks/useModal"
import { useSelectedUser } from "@features/user-management/model/useSelectedUser"

export const usePostModals = () => {
  const { updateSelectedUser } = useSelectedUser()
  const { openModal } = useModal()

  const openUserModal = (user: User) => {
    updateSelectedUser(user)
    openModal("detailUser")
  }

  return {
    openUserModal,
  }
}
