import { useSearchParams } from "@features/filter-management/model/useSearchParams"
import { pageValue } from "@features/post-management/config/pagaValue"
import { Button } from "@shared/ui"
import { SelectRoot } from "@shared/ui/select/SelectRoot"

interface PostPaginationProps {
  total: number
}

export const PostPagination: React.FC<PostPaginationProps> = ({ total }) => {
  const searchParams = useSearchParams((state) => state.searchParams)
  console.log("🚀 ~ searchParams:", searchParams)
  const { setSearchParams, goNextPage, goPrevPage } = useSearchParams()
  const { limit, skip } = searchParams
  const hasNotPrev = skip === 0
  const hasNotNext = skip + limit >= total

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <span>표시</span>
          <SelectRoot
            items={pageValue.options.size}
            value={limit.toString()}
            onValueChange={(v) => setSearchParams({ limit: Number(v) })}
            placeholder={pageValue.initial.size}
          />
          <span>항목</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button disabled={hasNotPrev} onClick={goPrevPage}>
          이전
        </Button>
        <Button disabled={hasNotNext} onClick={goNextPage}>
          다음
        </Button>
      </div>
    </div>
  )
}
