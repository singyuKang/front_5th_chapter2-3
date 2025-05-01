import { User } from "@entities/user/model/types"

export interface Comment {
  id: number
  body: string
  likes: number
  postId: number
  user: User
}
export interface CommentsResponse {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}

export interface NewComment {
  body: string
  postId: number
  userId: number
}

export interface DeletedCommentResponse {
  id: number
  body: string
  postId: number
  likes: number
  user: {
    id: number
    username: string
    fullName: string
  }
  deletedOn: string
  isDeleted: boolean
}
