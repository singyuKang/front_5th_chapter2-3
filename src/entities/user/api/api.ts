export const getUsersList = async ({ limit = 0, select = "username,image" }) => {
  const response = await fetch(`/api/users?limit=${limit}&select=${select}`)
  if (!response.ok) {
    throw new Error("사용자 가져오기 실패")
  }
  return response.json()
}
