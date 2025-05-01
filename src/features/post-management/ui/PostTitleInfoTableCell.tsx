import { useSearchParams } from "@features/filter/model/useSearchParams"
import { TableCell } from "@shared/ui/table/TableCell"
import { highlightText } from "@shared/utils/highlightText"

type PostTitlePropsType = {
  title: string
  tags: string[]
}

export const PostTitleInfoTableCell: React.FC<PostTitlePropsType> = ({ title, tags }) => {
  const searchParams = useSearchParams((state) => state.searchParams)
  const { updateSelectedTag, updateSkip } = useSearchParams()

  const { searchQuery, selectedTag } = searchParams

  const handleTagClick = (tag: string) => {
    updateSelectedTag(tag)
    updateSkip(0)
  }

  return (
    <TableCell>
      <div className="space-y-1">
        <div>{highlightText(title, searchQuery)}</div>

        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <span
              key={`${index}th-${tag}`}
              className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                selectedTag === tag
                  ? "text-white bg-blue-500 hover:bg-blue-600"
                  : "text-blue-800 bg-blue-100 hover:bg-blue-200"
              }`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </TableCell>
  )
}
