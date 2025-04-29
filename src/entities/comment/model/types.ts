import { User } from "@entities/user/model/types"

export interface Comment {
  id: number
  body: string
  likes: number
  postId: number
  user: User
}

export interface NewComment {
  body: string
  postId: number
  userId: number
}
