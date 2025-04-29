import { TableHead } from "@shared/ui/table/TableHead"
import { TableHeader } from "@shared/ui/table/TableHeader"
import { TableRow } from "@shared/ui/table/TableRow"
import React from "react"

export const PostsTableHeader: React.FC = () => (
  <TableHeader>
    <TableRow>
      <TableHead className="w-[50px]">ID</TableHead>
      <TableHead>제목</TableHead>
      <TableHead className="w-[150px]">작성자</TableHead>
      <TableHead className="w-[150px]">반응</TableHead>
      <TableHead className="w-[150px]">작업</TableHead>
    </TableRow>
  </TableHeader>
)

PostsTableHeader.displayName = "PostsTableHeader"
