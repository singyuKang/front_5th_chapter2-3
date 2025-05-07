# [6주차] 기본과제

여러분은 게시판을 관리할 수 있는 Admin 코드를 인수인계 받았습니다. 다행히 못 알아볼 정도의 더티코드는 아니고 적당히 잘 만든 것 같지만 정리가 된 것 같지 않은 아주 현실감 있는 익숙한 느낌의 코드였습니다.

우리는 지금까지 배웠던 내용을 토대로 해당 코드들을 클린하게 정돈하고 FSD 아키텍쳐를 활용해서 정리해보려고 합니다.

**여러분들은 해당 코드를 분석해보니 다음과 같은 문제점들을 발견할 수 있었습니다.**

1. 컴포넌트가 너무 크고 복잡하다.
2. Typescript를 사용하고 있지만 Type처리가 부실하다.
3. 상태관리의 개념없이 너무 많은 상태를 가지고 있다.
4. useEffect 관리가 안되고 있다.
5. 비동기 처리 로직이 복잡하게 구성되어 있다.

**여러분들은 해당 코드를 개선하기 위해서 다음과 같은 목표를 세웠습니다.**

1. Typescript를 확실히 사용해서 코드의 이해와 리팩토링에 대한 안정성을 확보합니다.
2. 컴포넌트에 단일 책임 원칙을 부여하여 작게 만들고자 합니다.
3. 적절한 관심사의 분리를 통해서 폴더구조를 만드려고 합니다.
4. 이때 배웠던 FSD를 한번 적용해보려고 합니다.

## 배포링크 

https://singyukang.github.io/front_5th_chapter2-3/?limit=10&sortOrder=asc

## 과제 체크포인트

### 기본과제

#### 목표 : 전역상태관리를 이용한 적절한 분리와 계층에 대한 이해를 통한 FSD 폴더 구조 적용하기
- 전역상태관리를 사용해서 상태를 분리하고 관리하는 방법에 대한 이해
- Context API, Jotai, Zustand 등 상태관리 라이브러리 사용하기
- FSD(Feature-Sliced Design)에 대한 이해
- FSD를 통한 관심사의 분리에 대한 이해
- 단일책임과 역할이란 무엇인가?
- 관심사를 하나만 가지고 있는가?
- 어디에 무엇을 넣어야 하는가?

#### 체크포인트
- [x] 전역상태관리를 사용해서 상태를 분리하고 관리했나요?
- [x] Props Drilling을 최소화했나요?
- [x] shared 공통 컴포넌트를 분리했나요?
- [x] shared 공통 로직을 분리했나요?
- [x] entities를 중심으로 type을 정의하고 model을 분리했나요?
- [x] entities를 중심으로 ui를 분리했나요?
- [x] entities를 중심으로 api를 분리했나요?
- [x] feature를 중심으로 사용자행동(이벤트 처리)를 분리했나요?
- [x] feature를 중심으로 ui를 분리했나요?
- [x] feature를 중심으로 api를 분리했나요?
- [x] widget을 중심으로 데이터를 재사용가능한 형태로 분리했나요?


### 심화과제

#### 목표: 서버상태관리 도구인 TanstackQuery를 이용하여 비동기코드를 선언적인 함수형 프로그래밍으로 작성하기 

- TanstackQuery의 사용법에 대한 이해
- TanstackQuery를 이용한 비동기 코드 작성에 대한 이해
- 비동기 코드를 선언적인 함수형 프로그래밍으로 작성하는 방법에 대한 이해

#### 체크포인트

- [x] 모든 API 호출이 TanStack Query의 useQuery와 useMutation으로 대체되었는가?
- [x] 쿼리 키가 적절히 설정되었는가?
- [x] fetch와 useState가 아닌 선언적인 함수형 프로그래밍이 적절히 적용되었는가?
- [x] 캐싱과 리프레시 전략이 올바르게 구현되었는가?


## 과제 셀프회고


`FSD 구조, Zustand, TanStack/React-Query`와 같은 `새로운 구조`와 `라이브러리`를 처음 접하면서 폴더 구조를 이해하고 문법에 익숙해지는 데 상당한 시간이 소요되었습니다.

`Entity와 Feature`의 경계가 어디인지, `명확한 분류 기준`이 무엇인지 파악하기 어려웠습니다. 개발자마다 다른 기준을 적용한다는 것을 알고, 결국 `자신만의 일관된 기준을 가지는 것`이 중요하다고 생각했습니다.

이번 과제를 통해 `저만의 기준을 세우는 것`을 목표로 진행하였습니다.
 
## FSD 구조의 나만의 기준

## Entities

```jsx
순수하게 서버와 관련되어있는 데이터(비지니스 엔티디 모델)
사용자의 액션이 없는 데이터를 그리는 UI
```
<img width="185" alt="스크린샷 2025-05-01 오후 9 54 22" src="https://github.com/user-attachments/assets/19967fb6-b5c7-4459-b46b-bedef901c9d3" />


다음과 같이 분류를 진행을 하였으며 `클라이언트와 서버간의 가장 순수한 상태`를 저는` entitiy라고 정의`를 하였습니다. 

```jsx
export const readPostApi = async (params: SearchParams): Promise<PostResponse> => {
  try {
    const queryString = buildURLPath({ ...params })
    return await apiFetch(`/posts${queryString}`)
  } catch (error) {
    console.error("게시물 Read 오류:", error)
    throw new Error(`게시물 Read 오류 ${error}`)
  }
}
```

정말 단순하게 서버와 데이터 호출 → 가장 밑바닥인 상태

이번 과제 같은 경우에서는 `게시물, 사용자 정보, 댓글` 등 `가장 낮은 단계인 데이터 또는 행위` 라고 이해를 하였습니다.

```jsx
export const UserInfoText = ({
...props 생략
}: UserInfoProps) => {
  return (
    <div className="space-y-4">
      <img src={image} alt={username} className="w-24 h-24 rounded-full mx-auto" />
      <h3 className="text-xl font-semibold text-center">{username}</h3>
      <div className="space-y-2">
        <p>
          <strong>이름:</strong> {firstName} {lastName}
        </p>
        <p>
          <strong>나이:</strong> {age}
        </p>
        <p>
          <strong>이메일:</strong> {email}
        </p>
        <p>
          <strong>전화번호:</strong> {phone}
        </p>
        <p>
          <strong>주소:</strong> {address.address}, {address.city}, {address.state}
        </p>
        <p>
          <strong>직장:</strong> {company.name} - {company.title}
        </p>
      </div>
    </div>
  )
}
```

`entitiy  ui UserInfoText` 같은 경우에는 `feature`이냐 아니냐로 고민이 있었지만은 `사용자의 액션이 없는것을 기준`으로 `entitiy`로 분류 하였습니다.


## Features

```jsx
여러개의 엔티티를 조합하여 어떠한 행위를 하는 단위
액션이 있는 UI
순수한 서버 데이터를 깨는 경우
Entities는 아닌거같고 무언가 애매할때
```
<img width="342" alt="스크린샷 2025-05-02 오전 12 04 34" src="https://github.com/user-attachments/assets/6c807c7a-1601-46e3-9d0c-c658bfcf5737" />

`Feature`의 경우 `comment, filter, modal, post, user`로 구성하였으며

`Entity를 조합`하여 `특정 기능을 수행`하거나, `Entity보다 큰 단위`라고 판단이 되면은 `Feature로 분류`를 하였습니다.

```jsx
export const useQueryPostAuthor = (userId: number) => {
  const { data: author } = useQuery<User>({
    queryKey: ["author", userId],
    queryFn: async () => {
      if (userCache.hasUser(userId)) {
        return userCache.getUser(userId) as User
      } else {
        const userData = await getUserByIdApi(userId)
        userCache.updateUser(userData)
        return userData
      }
    },
    initialData: authorValue.initial,
  })

  return { author }
}
```

예를 들어, `getUserByIdApi` 를 통해 불러온 데이터를 `React-Query` 를 사용해 key로 저장하고, `해당 유저가 캐시에 존재`할 경우 캐시 데이터를 사용하고 아닐 경우 재호출하는 등 `단순 서버 호출보다 복잡한 로직이 포함된 상태를 Feature` 로 분류하였습니다


## Shared

```jsx
공통적으로 재사용성이 높은 계층
```
<img width="182" alt="스크린샷 2025-05-02 오전 12 29 33" src="https://github.com/user-attachments/assets/424303d8-31a8-41ac-a9e6-8748858dfcdd" />

저의 `Shared 분류 기준`은 `모든 계층에서 공통적으로 사용 가능한 요소`들을 해당 폴더에 배치하였습니다.

예를들어 `button, dialog, input, highlightText`와 같이 `App 여러 부분에서 재사용 가능한 것`들이 이에 해당되도록 하였습니다.


## Zustand
<img width="813" alt="스크린샷 2025-05-02 오전 11 08 27" src="https://github.com/user-attachments/assets/99e89986-fefd-4aa3-9701-8605b2c69137" />

`상태관리`를 사용하는 이유중 `props drilling`을 해결해주는 것도 있지만 `하나의 관심사 만드는것`이 `개별관리하는 것보다 편하다` 라고 느꼈습니다.

이번 과제 `Comment`를 예시로 한 컴포넌트에서 useState를 통해 `id, body, likes, postId, user`를 각각 다루고 있다고 가정해봅시다.

각각 `개별적인 요소의 상태변화`에 대해 대응하기가 어렵습니다!(postId 나 id값이 변한다면은 다른 값들도 set함수를 통해 개별적으로 업데이트) 

즉, `여러 개의 상태를 각각 신경써야 하는 번거로움`이 존재!

상태 관리 라이브러리를 활용하면 이러한 개별 상태들을 `하나의 관심사`로 통합할 수 있습니다.
 
```jsx
interface SelectedCommentState {
  selectedComment: Comment
  updateSelectedComment: (comment: Comment) => void
  resetSelectedComment: () => void
}

export const useSelectedComment = create<SelectedCommentState>((set) => ({
  selectedComment: commentFormValue.comment,

  updateSelectedComment: (comment: Comment) =>
    set({
      selectedComment: comment,
    }),

  resetSelectedComment: () =>
    set({
      selectedComment: commentFormValue.comment,
    }),
}))

```
위와 같은 코드를 통해 "선택된 Comment"라는 하나의 단위만 관리하면 되므로, 개별 속성(postId, user 등)에 일일이 신경 쓸 필요 없이 상태 관리가 가능합니다.


## **React Query 데이터 캐싱**
```jsx
export const useAddComment = () => {
  const queryClient = useQueryClient()

  const addCommentToCache = (newComment: Comment, oldComment: CommentsResponse) => ({
    ...oldComment,
    comments: [
      {
        ...newComment,
        id: oldComment?.comments?.length || 0,
      },
      ...(oldComment?.comments || []),
    ],
    total: (oldComment?.total || 0) + 1,
  })

  const { mutate: addComment } = useMutation({
    mutationFn: addCommentApi,
    onSuccess: (data: Comment) => {
      queryClient.setQueryData(["comments", data.postId], (oldComment: CommentsResponse) =>
        addCommentToCache(data, oldComment),
      )
    },
  })

  return { addComment }
}
```
`React-Query의 캐싱` 기능

<img width="735" alt="스크린샷 2025-05-02 오전 11 39 57" src="https://github.com/user-attachments/assets/73e47501-96ac-4d46-a624-ca7c62542ced" />
<img width="897" alt="스크린샷 2025-05-02 오전 11 41 05" src="https://github.com/user-attachments/assets/628d418e-a7f0-42c8-859e-8eddee84cab6" />

`댓글 추가` 를 예시로 

`내가 추가한 댓글을 서버에 보낸후` 에 정상적으로 처리가 된다면은 ` 서버에서 변환된 값을 받아 업데이트` 를 하는것이 흐름인데

여기서 `React-Query setQueryData` 를 사용해 `"comments", "postId"` 를 기준으로 반환된 값을 업데이트를 해줍니다. 

만약에 `똑같은 데이터에 접근`하였는데 바뀐점이 없다면은 `기존에 저장되어있던 Cache값` 을 사용, 만약 값이 바뀌었다면은 `addCommentToCache` 에서 `새로운 값을 업데이트`  해줍니다.

사용자가 `해당 comments, postId` 에 대한 값을 접근을 한다면은 `저장되어 있는 Cache 에서 값을 사용하도록 구현하였습니다.


## React-Query Optimistic Updates

Optimistic Update 자료 : https://tanstack.com/query/v3/docs/framework/react/guides/optimistic-updates

원래 저의 의도는 위의 자료에 나와있는것처럼 무조건 성공한다는 가정 하에 사용자에게는 성공 화면을 보여준 다음, 서버에서 실패할 경우 원래 상태로 되돌리는 것을 목표로 진행을 하려고 하였습니다.

```javascript
useMutation(updateTodo, {
  // When mutate is called:
  onMutate: async newTodo => {
    // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries('todos')

    // Snapshot the previous value
    const previousTodos = queryClient.getQueryData('todos')

    // Optimistically update to the new value
    queryClient.setQueryData('todos', old => [...old, newTodo])

    // Return a context object with the snapshotted value
    return { previousTodos }
  },
  // If the mutation fails, use the context returned from onMutate to roll back
  onError: (err, newTodo, context) => {
    queryClient.setQueryData('todos', context.previousTodos)
  },
  // Always refetch after error or success:
  onSettled: () => {
    queryClient.invalidateQueries('todos')
  },
})
```

```javascript
    onError: (err, data: Comment, context) => {
      queryClient.setQueryData("comments", context.previousComment)
    },
```

하지만 이번 과제에서의 `서버 성공 응답값`이 제가 `변경을 진행한 응답값으로 내려오지 않았기 때문`에 

`Local에서만 변화된 값`을 확인하도록 진행을 하였습니다.

```javascript
export const useLikeComment = () => {
  const queryClient = useQueryClient()

  const updateLikeInCache = (updatedComment: Comment, oldData: CommentsResponse) => ({
    ...oldData,
    comments:
      oldData?.comments?.map((comment) =>
        comment.id === updatedComment.id ? { ...comment, likes: comment.likes + 1 } : comment,
      ) || [],
  })

  const { mutate: likeComment } = useMutation({
    mutationFn: likeCommentApi,
    onSuccess: (data: Comment) => {
// 변경된 값으로 response가 내려오지않음 -> 로컬에서만 변화되도록
      queryClient.setQueryData(["comments", data.postId], (oldData: CommentsResponse) =>
        updateLikeInCache(data, oldData),
      )
    },
// 원래 나의 의도 -> 실패시 기존 데이터 사용
    onError: (err, data: Comment, context) => {
      queryClient.setQueryData("comments", context.previousComment)
    },
    })
  return { likeComment }
}
```


## user Cache
<img width="526" alt="스크린샷 2025-05-02 오후 2 20 00" src="https://github.com/user-attachments/assets/85f13e87-93f3-4b94-b334-77e460b9bae9" />

```javascript
export const getUserByIdApi = async (userId: number): Promise<User> => {
  try {
    return await apiFetch(`/users/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("사용자 조회 오류:", error)
    throw new Error(`사용자 조회 오류: ${error}`)
  }
}
```

유저에 대한 정보를 `getUserByIdApi` 를 호출하여 사진에 나온것처럼 응답값을 받게 되는데

이를 `id값을 기준으로 받아온 값을 Cache` 에 저장을 하게 합니다.

```jsx
export const userCache = (() => {
  const cache = new Map<number, User>()

  const hasUser = (id: number) => cache.has(id)

  const getUser = (id: number) => (cache.has(id) ? cache.get(id) : null)

  const updateUser = (user: User) => cache.set(user.id, user)

  const setUser = (users: User[]) => users.forEach((user) => cache.set(user.id, user))

  return {
    users: [...cache.values()],
    hasUser,
    getUser,
    updateUser,
    setUser,
  }
})()

export const useQueryPostAuthor = (userId: number) => {
  const { data: author } = useQuery<User>({
    queryKey: ["author", userId],
    queryFn: async () => {
      if (userCache.hasUser(userId)) {
        return userCache.getUser(userId) as User
      } else {
        const userData = await getUserByIdApi(userId)
        userCache.updateUser(userData)
        return userData
      }
    },
    initialData: authorValue.initial,
  })

  return { author }
}

```

`기존 유저인경우 cache값` 을 사용하도록 하여 불필요한 서버 재호출을 막았고, `새로 받아온 User 정보` 는 `getUserByIdApi` 을 통해 받아오도록 하였습니다.

## 리뷰 받고 싶은 내용이나 궁금한 것에 대한 질문

- userCache 와 React-Query 캐싱을 둘다 진행을 해보았는데, 이 데이터가 fresh한 데이터인지 아닌지에 대한 판단을 어떻게 해야할지 궁금합니다! 캐시가 되어있는 데이터를 사용자가 사용할텐데 이것이 오래된 데이터인지 아닌지에 대한 판단 -> 이를 어떻게 새로운 데이터로 갈아줄건지 staleTime 기준이나 다른 판단 방법이 궁금합니다

- 이미지 같이 큰 용량의 데이터를 보관하거나 사용하는 방법(캐싱 전략)? 이 궁금합니다. 과거 사이드프로젝트를 진행할때 이미지를 AWS Presigned URL 통해 업로드, 불러오기를 하였는데 적은사용자였는데 요금이 많이 나왔던 기억이..ㅎㅎ... 


## 리뷰내용

안녕하세요 신규님!
각각의 폴더에 대한 역할 정의를 무척 잘 해주셨네요 ㅎㅎ
전부다 납득이 가는 내용이라서 좋았습니다.

---

> 상태 관리 라이브러리를 활용하면 이러한 개별 상태들을 하나의 관심사로 통합할 수 있습니다.

상태관리 라이브러리를 왜 써야 하는지 이 문장을 토대로 정의할 수 있다고 생각해요! 제가 가려워 하는 부분을 신규님께서 시원하게 긁어주셨네요 ㅋㅋ 감사합니다!

---

> userCache 와 React-Query 캐싱을 둘다 진행을 해보았는데, 이 데이터가 fresh한 데이터인지 아닌지에 대한 판단을 어떻게 해야할지 궁금합니다! 캐시가 되어있는 데이터를 사용자가 사용할텐데 이것이 오래된 데이터인지 아닌지에 대한 판단 -> 이를 어떻게 새로운 데이터로 갈아줄건지 staleTime 기준이나 다른 판단 방법이 궁금합니다

캐시 갱신에 대한 판단은 사실 클라이언트 개발자가 스스로 하기 어려운 부분이 있습니다. 서버 개발자와 합의가 되어야 해요!

가령, 저는 이전에 포털 서비스를 개발했는데요, 포털 서비스의 경우 실시간으로 데이터가 갱신되는게 중요하진 않았어요. 주기적인 갱신이 중요했습니다. 다만 주기적이라는 것도 가져다 쓰는 API 마다 차이가 있어서, 갱신 주기를 몇 가지 설정한 다음에 그 범위 내에서 선정했었습니다 ㅎㅎ

어떤 데이터는 60초마다 갱신이 필요했고, 어떤 데이터는 1시간마다 갱신이 필요했죠.
이런 전략은 프론트엔드에서 스스로 선정해야 하는게 아니라 다양한 개발자 + 기획자와 의견을 나눠서 진행해야 한다고 생각해요.

어쨌든, 그럼에도 불구하고 fresh한 데이터에 대해 판단하는 몇 가지 방법을 소개해드리자면

#### TanStack Query의 staleTime과 cacheTime 활용

```tsx
useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 5 * 60 * 1000, // 5분
  cacheTime: 30 * 60 * 1000 // 30분
})
```

- staleTime: 데이터가 "신선"하다고 간주되는 시간입니다. 이 시간 동안은 재요청이 발생해도 캐시된 데이터를 즉시 반환하고 백그라운드에서 refetch하지 않습니다.
- cacheTime: 데이터가 캐시에 남아있는 총 시간입니다. 이 시간이 지나면 캐시에서 데이터가 제거됩니다.

#### 데이터 신선도에 따른 전략적 접근

1. 시간 기반 전략: 데이터 유형별로 적절한 staleTime 설정
   - 자주 변경되는 데이터(게시글 조회수, 좋아요): 짧은 staleTime (30초~1분)
   - 비교적 안정적인 데이터(사용자 프로필): 긴 staleTime (5분~30분)

2. 이벤트 기반 갱신: 특정 액션 발생 시 캐시 무효화
```tsx
// 사용자 수정 후 캐시 무효화
const queryClient = useQueryClient();
queryClient.invalidateQueries(['users']);
```

3. 하이브리드 접근: userCache와 React Query 연동
```tsx
// userCache 업데이트 시 타임스탬프 추가
const updateUser = (user: User) => {
  cache.set(user.id, { 
    ...user, 
    _lastUpdated: Date.now() 
  });
}

// 사용 시 신선도 확인
const getUserWithFreshnessCheck = (id: number, maxAge = 5 * 60 * 1000) => {
  const cachedUser = cache.get(id);
  if (cachedUser && Date.now() - cachedUser._lastUpdated < maxAge) {
    return cachedUser;
  }
  return null; // null 반환 시 새로 fetch
}
```

4. userCache와 React Query 통합
```tsx
export const useQueryPostAuthor = (userId: number) => {
  const maxAge = 10 * 60 * 1000; // 10분
  
  const { data: author } = useQuery<User>({
    queryKey: ["author", userId],
    queryFn: async () => {
      const cachedUser = userCache.getUser(userId);
      const now = Date.now();
      
      if (cachedUser && cachedUser._lastUpdated && 
          now - cachedUser._lastUpdated < maxAge) {
        return cachedUser;
      } else {
        const userData = await getUserByIdApi(userId);
        userCache.updateUser({...userData, _lastUpdated: now});
        return userData;
      }
    },
    staleTime: maxAge,
  });

  return { author };
}
```

이런식으로 작업할 수 있을 것 같네요!

---

> 이미지 같이 큰 용량의 데이터를 보관하거나 사용하는 방법(캐싱 전략)? 이 궁금합니다. 과거 사이드프로젝트를 진행할때 이미지를 AWS Presigned URL 통해 업로드, 불러오기를 하였는데 적은사용자였는데 요금이 많이 나왔던 기억이..ㅎㅎ...

제일 보편적인게 CDN이라고 생각해요. 나머지는... 캐싱전략이라기보단 로딩 전략 혹은 용량 최적화 전략이라고 볼 수 있을 것 같네요 ㅋㅋ

몇 가지 소개드리자면 다음고 같습니다.

#### 1. CDN 활용
- AWS CloudFront, Cloudflare 등의 CDN을 사용하여 이미지 전송 비용 절감
- 원본 이미지는 S3에 저장하되, 접근은 CloudFront를 통해 제공

#### 2. 이미지 최적화
- 서빙 전 이미지 압축 및 리사이징 (AWS Lambda@Edge 활용 가능)
- WebP와 같은 최신 포맷 활용하여 용량 감소
- 반응형 이미지 적용 (브라우저 크기에 맞는 이미지 제공)

#### 3. 클라이언트 측 캐싱 전략
- 브라우저 캐시 활용을 위한 적절한 캐시 헤더 설정
  ```
  Cache-Control: max-age=86400, must-revalidate
  ```

- Service Worker를 이용한 이미지 캐싱
  ```tsx
  // Service Worker 등록
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
  
  // sw.js에서 이미지 캐싱
  self.addEventListener('fetch', event => {
    if (event.request.url.match(/\.(jpg|jpeg|png|gif|webp)/i)) {
      event.respondWith(
        caches.match(event.request).then(response => {
          return response || fetch(event.request).then(res => {
            return caches.open('images').then(cache => {
              cache.put(event.request.url, res.clone());
              return res;
            });
          });
        })
      );
    }
  });
  ```

#### 4. 이미지 로딩 최적화
- 지연 로딩(Lazy loading) 구현
  ```tsx
  <img 
    src="placeholder.jpg" 
    data-src="actual-image.jpg" 
    loading="lazy" 
    className="lazy-image"
  />
  ```

- 화질이 낮은 썸네일로 렌더링 후, 로딩 후에 원본 화질로 렌더링하기
  ```tsx
  const ProgressiveImage = ({ thumbnailSrc, mainSrc }) => {
    const [src, setSrc] = useState(thumbnailSrc);
    
    useEffect(() => {
      const img = new Image();
      img.src = mainSrc;
      img.onload = () => {
        setSrc(mainSrc);
      };
    }, [mainSrc]);
    
    return <img src={src} alt="Progressive image" />;
  };
  ```
