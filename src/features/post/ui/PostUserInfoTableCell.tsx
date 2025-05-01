import { User } from "@entities/user/model/types"
import { useQueryPostAuthor } from "@features/user-management/api/api"
import { TableCell } from "@shared/ui/table/TableCell"

type PostUserInfoTablePropsType = {
  userId: number
  openUserModal: (user: User) => void
}

export const PostUserInfoTableCell: React.FC<PostUserInfoTablePropsType> = ({ userId, openUserModal }) => {
  const { author } = useQueryPostAuthor(userId)

  if (!author.image || !author.username) return <></>

  return (
    <TableCell>
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(author)}>
        <img src={author.image} alt={author.username} className="w-8 h-8 rounded-full" />
        <span>{author.username}</span>
      </div>
    </TableCell>
  )
}
