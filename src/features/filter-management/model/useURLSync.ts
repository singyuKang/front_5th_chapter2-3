import { useNavigate } from "react-router-dom"
import { useSearchParams } from "./useSearchParams"
import { useEffect } from "react"
import { buildURLPath } from "../utils/buildURLPath"

export const useURLSync = () => {
  const navigate = useNavigate()
  const { searchParams } = useSearchParams()

  useEffect(() => {
    const url = buildURLPath(searchParams)
    navigate(url, { replace: true })
  }, [searchParams, navigate])

  return null
}
