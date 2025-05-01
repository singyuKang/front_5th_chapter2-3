import { create } from "zustand"
import { User } from "@entities/user/model/types"

interface SelectedUserState {
  selectedUser: User | null
  updateSelectedUser: (user: User) => void
  resetUser: () => void
}

const selectedUserValue = {
  initial: {
    id: 0,
    username: "",
    image: "",
    firstName: "",
    lastName: "",
  } as User,
}

export const useSelectedUser = create<SelectedUserState>((set) => ({
  selectedUser: null,

  updateSelectedUser: (user: User) => set({ selectedUser: user }),

  resetUser: () => set({ selectedUser: null }),
}))

export const useSelectedUserHook = () => {
  const state = useSelectedUser()

  return {
    selectedUser: state.selectedUser || selectedUserValue.initial,
    updateSelectedUser: state.updateSelectedUser,
    resetUser: state.resetUser,
  }
}
