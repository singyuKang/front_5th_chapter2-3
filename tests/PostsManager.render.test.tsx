import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { MemoryRouter } from "react-router-dom"
import PostsManager from "../src/pages/PostsManagerPage"
import * as React from "react"
import "@testing-library/jest-dom"
import { TEST_POSTS, TEST_SEARCH_POST, TEST_USERS } from "./mockData"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// MSW 서버 설정
const server = setupServer(
  http.get("/api/posts", () => {
    return HttpResponse.json(TEST_POSTS)
  }),

  http.get("/api/posts/search?q=His%20mother%20had%20always%20taught%20him", () => {
    return HttpResponse.json(TEST_SEARCH_POST)
  }),

  http.get("/api/users", () => {
    return HttpResponse.json(TEST_USERS)
  }),

  http.get("/api/posts/tags", () => {
    return HttpResponse.json([
      "history",
      "american",
      "crime",
      "french",
      "fiction",
      "english",
      "magical",
      "mystery",
      "love",
      "classic",
    ])
  }),
)

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const renderPostsManager = () => {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <PostsManager />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe("PostsManager", () => {
  it("게시물을 렌더링하고 검색을 허용합니다", async () => {
    const user = userEvent.setup()
    renderPostsManager()

    // 로딩 상태 확인 (선택적)
    expect(screen.getByText(/로딩 중.../i)).toBeInTheDocument()

    // 게시물이 로드되었는지 확인
    await waitFor(() => {
      TEST_POSTS.posts.forEach((post) => {
        expect(screen.getByText(post.title)).toBeInTheDocument()
      })
    })

    // 검색 기능 테스트
    const searchInput = screen.getByPlaceholderText(/게시물 검색.../i)
    await user.type(searchInput, "His mother had always taught him")
    await user.keyboard("{Enter}")

    await waitFor(() => {
      expect(screen.getByText("His mother had always taught him")).toBeInTheDocument()
      expect(screen.queryByText("He was an expert but not in a discipline")).not.toBeInTheDocument()
    })
  })
})
