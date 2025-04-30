import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "../shared/ui"
import { useTagsList } from "../entities/tag/model/model"
import {
  useAddPost,
  useDeletePost,
  usePostsWithUsers,
  useSearchPosts,
  useUpdatePost,
} from "../features/post-management/api/api"
import {
  useAddComment,
  useCommentsByPostId,
  useDeleteComment,
  useLikeComment,
  useUpdateComment,
} from "../features/comment-management/api/api"
import { useUserById } from "../features/user-management/api/api"
import { PostsHeader } from "@widgets/post/ui"
import { PostsTableContainer } from "@widgets/post/ui/PostsTableContainer"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { Input } from "@shared/ui/input/Input"
import { useSearchParams } from "@features/filter-management/model/useSearchParams"
import { UserDetailModal } from "@features/user-management/ui/UserDetailModal"
import { PostDetailModal } from "@features/post-management/ui/PostDetailModal"
import { Textarea } from "@shared/ui/textarea/TextArea"
import EditCommentModal from "@features/comment-management/ui/EditCommentModal"
import EditPostModal from "@features/post-management/ui/EditPostModal"

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 상태 관리
  const [posts, setPosts] = useState([])
  const [total, setTotal] = useState(0)
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
  const [selectedPost, setSelectedPost] = useState(null)
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })
  const [loading, setLoading] = useState(false)
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")
  const [comments, setComments] = useState({})
  const [selectedComment, setSelectedComment] = useState(null)
  const [newComment, setNewComment] = useState({ body: "", postId: null, userId: 1 })
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)

  const { data: tags, isLoading: tagsLoading, error: tagsError } = useTagsList()
  // const { posts, total, isLoading } = usePostsWithUsers({ limit, skip });
  const { data: searchResult, isLoading: searchLoading, isError: searchError } = useSearchPosts(searchQuery)
  const updatePostMutation = useUpdatePost()
  const deletePostMutation = useDeletePost()
  const addPostMutation = useAddPost()
  // const { data: commentsData, isLoading: commentsLoading } = useCommentsByPostId(selectedPost?.id)
  const likeCommentMutation = useLikeComment()
  const addCommentMutation = useAddComment()
  const updateCommentMutation = useUpdateComment()
  const deleteCommentMutation = useDeleteComment()

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  const { setSearchParams } = useSearchParams()

  // URL 변경을 감지하고 searchParams 상태 업데이트
  useEffect(() => {
    console.log("URL changed:", location.search)
    const params = new URLSearchParams(location.search)

    setSearchParams({
      skip: parseInt(params.get("skip") || "0"),
      limit: parseInt(params.get("limit") || "10"),
      searchQuery: params.get("search") || "",
      sortBy: params.get("sortBy") || "",
      sortOrder: params.get("sortOrder") || "asc",
      selectedTag: params.get("tag") || "",
    })
  }, [location.search])

  const handleUpdatePost = () => {
    updatePostMutation.mutate(selectedPost, {
      onSuccess: () => {
        setShowEditDialog(false)
      },
      onError: (error) => {
        console.error("게시물 업데이트 오류:", error)
      },
    })
  }

  const handleDeletePost = (id) => {
    deletePostMutation.mutate(id, {
      onError: (error) => {
        console.error("게시물 삭제 오류:", error)
      },
    })
  }

  const handleAddPost = () => {
    // {id: 252, title: 'x', body: 'xxx', userId: 1}
    addPostMutation.mutate(newPost, {
      onSuccess: (responseData) => {
        setPosts([responseData, ...posts])
        setShowAddDialog(false)
        setNewPost({ title: "", body: "", userId: 1 })
      },
      onError: (error) => {
        console.error("게시물 추가 오류:", error)
      },
    })
  }

  const handleLikeComment = (comment, postId) => {
    likeCommentMutation.mutate(
      { id: comment.id, likes: comment.likes + 1 },
      {
        onSuccess: (data) => {
          setComments((prev) => ({
            ...prev,
            [postId]: prev[postId]?.map((c) => (c.id === data.id ? { ...c, likes: c.likes + 1 } : c)) || [],
          }))
        },
      },
    )
  }

  const handleAddComment = () => {
    addCommentMutation.mutate(newComment, {
      onSuccess: (data) => {
        setComments((prev) => ({
          ...prev,
          [data.postId]: [...(prev[data.postId] || []), data],
        }))

        setShowAddCommentDialog(false)
        setNewComment({ body: "", postId: null, userId: 1 })
      },
      onError: (error) => {
        console.error("댓글 추가 오류:", error)
      },
    })
  }

  const handleUpdateComment = () => {
    if (!selectedComment) return

    updateCommentMutation.mutate(
      { id: selectedComment.id, body: selectedComment.body },
      {
        onSuccess: (data) => {
          // 낙관적 업데이트를 위해 기존 방식 유지
          setComments((prev) => ({
            ...prev,
            [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
          }))

          setShowEditCommentDialog(false)
        },
        onError: (error) => {
          console.error("댓글 업데이트 오류:", error)
        },
      },
    )
  }

  const handleDeleteComment = (id, postId) => {
    deleteCommentMutation.mutate(
      { id, postId },
      {
        onSuccess: () => {
          // 낙관적 업데이트를 위해 기존 방식 유지
          setComments((prev) => ({
            ...prev,
            [postId]: prev[postId].filter((comment) => comment.id !== id),
          }))
        },
        onError: (error) => {
          console.error("댓글 삭제 오류:", error)
        },
      },
    )
  }

  // 표시할 게시물 결정 로직 추가
  const postsToDisplay = searchQuery
    ? searchResult?.posts || [] // 검색어가 있으면 검색 결과 사용
    : posts // 없으면 기본 게시물 목록 사용

  const totalItems = searchQuery ? searchResult?.total || 0 : total

  const isLoadingData = searchQuery ? searchLoading : loading

  // 게시물 가져오기
  const fetchPosts = () => {
    setLoading(true)
    let postsData
    let usersData

    fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      .then((response) => response.json())
      .then((data) => {
        postsData = data
        return fetch("/api/users?limit=0&select=username,image")
      })
      .then((response) => response.json())
      .then((users) => {
        usersData = users.users
        const postsWithUsers = postsData.posts.map((post) => ({
          ...post,
          author: usersData.find((user) => user.id === post.userId),
        }))
        setPosts(postsWithUsers)
        setTotal(postsData.total)
      })
      .catch((error) => {
        console.error("게시물 가져오기 오류:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag) => {
    if (!tag || tag === "all") {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])
      const postsData = await postsResponse.json()
      const usersData = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  return (
    <div className="w-full max-w-6xl mx-auto">
      <PostsHeader
        onAddClick={() => {
          setShowAddDialog(true)
        }}
      />

      <PostsTableContainer />

      {/* 게시물 추가 대화상자 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 게시물 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <Textarea
              rows={30}
              placeholder="내용"
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            />
            <Input
              type="number"
              placeholder="사용자 ID"
              value={newPost.userId}
              onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
            />
            <Button onClick={handleAddPost}>게시물 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 추가 대화상자 */}
      <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 댓글 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={newComment.body}
              onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
            />
            <Button onClick={handleAddComment}>댓글 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 수정 대화상자 */}
      <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ""}
              onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
            />
            <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      <EditPostModal />
      <EditCommentModal />
      <PostDetailModal />
      <UserDetailModal />
    </div>
  )
}

export default PostsManager
