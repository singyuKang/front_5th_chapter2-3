import { useModal } from "@features/modal/hooks/useModal"
import { useSelectedUserHook } from "../model/useSelectedUser"
import { UserInfoText } from "@entities/user/ui/UserInfoText"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { useUserById } from "../api/api"

export const UserDetailModal: React.FC = () => {
  const { selectedUser } = useSelectedUserHook()
  const { openDetailUser, closeModal } = useModal()

  // 선택된 사용자의 상세 정보 조회
  const { data: userData } = useUserById(selectedUser?.id, {
    enabled: !!selectedUser?.id && openDetailUser,
  })

  const displayUser = {
    ...selectedUser,
    ...userData,
  }

  return (
    <Dialog open={openDetailUser} onOpenChange={() => closeModal("detailUser")}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <UserInfoText {...displayUser} />
      </DialogContent>
    </Dialog>
  )
}
