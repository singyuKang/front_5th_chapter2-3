import React from "react"
import { Button } from "@shared/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/ui"

interface PostsPaginationProps {
  skip: number
  setSkip: (skip: number) => void
  limit: number
  setLimit: (limit: number) => void
  total: number
}

export const PostsPagination: React.FC<PostsPaginationProps> = ({ skip, setSkip, limit, setLimit, total }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default PostsPagination
