# 라우터 2 : navigate , nested routes , outlet

## I. 페이지 이동기능을 만들고 싶으면 useNavigate() 씁시다

```js
function App(){
  let navigate = useNavigate()

  return (
    (생략)
    <button onClick={()=>{ navigate('/detail') }}>이동버튼</button>
  )
}
```

`useNavigate()` 쓰면 그 자리에 유용한 함수가 남습니다. <br>
페이지 이동 시켜주는 함수입니다. <br>
그럼 이제 navigate('/detail') 이런 코드가 실행되면 /detail 페이지로 이동가능 합니다. <br>

navigate(2) 숫자 넣으면 앞으로가기 , 뒤로가기 기능 개발도 가능합니다. history API 라고 생각하시면 될듯. <br>

-1 넣으면 뒤로 1번 가기 <br>
2 넣으면 앞으로 2번 가기 입니다.

<br>

## II. 404페이지

유저가 이상한 경로로 접속했을 때 "없는 페이지입니다" 이런거 보여주고 싶으면

```js
<Route path="*" element={<div>안돼 돌아가</div>} />
```

`<Route path="*">` 하나 만들어두면 됩니다. <br>
`*` 경로는 모든 겨오를 뜻해서 <br>
위에 만들어둔 `/detail` 이런게 아닌 이상한 페이지 접속시 \* 경로로 안내해줍니다.

<br>

## III. 서브경로 만들 수 있는 nested routes

`/about/member` 로 접속하면 회사멤버 소개 페이지 <br>
`/about/location` 로 접속하면 회사위치 소개 페이지 를 만들고 싶으면 어떻게 하나요.

```js
<Route path="/about/member" element={ <div>멤버들</div> } />
<Route path="/about/location" element={ <div>회사위치</div> } />
```

이렇게 따로 만들어도 되겠지만 <br>

```js
<Route path="/about" element={<About />}>
    <Route path="member" element={<div>멤버들</div>} />
    <Route path="location" element={<div>회사위치</div>} />
</Route>
```

이렇게 중첩해서 만들어도 됩니다. <br>

`<Route>` 안에 `<Route>` 를 넣을 수 있는데 이걸 **Nested routes** 라고 부릅니다. <br> 저렇게 쓰면

<br>

**/about/member** 로 접속시 `<About>` 이랑 `<div>멤버들</div>` 을 보여주고 <br>
**/about/location** 로 접속 시 `<About>` 이랑 `<div>회사위치</div>` 를 보여줍니다.

<br>

#### ? div는 안보이는데요

실은 위처럼 짜면 <br>
`/about/member` 로 접속시 `<About>` 안에 `<div>멤버들</div>` 을 보여줍니다. <br>
그래서 `<About>` 컴포넌트 안에 `<div></div>` 를 어디다 보여줄지 표기해야 잘 보여줍니다.

```js
<Route path="/about" element={<About />}>
    <Route path="member" element={<div>멤버들</div>} />
    <Route path="location" element={<div>회사위치</div>} />
</Route>
```

```js
function About() {
    return (
        <div>
            <h4>about페이지임</h4>
            <Outlet></Outlet>
        </div>
    );
}
```

위에서 import 해온 `<Outlet>` 은 nested routes 안의 element 들을 어디에 보여줄지 표기하는 곳입니다. <br>
그래서 이렇게 해두면 <br>
`/about/member` 로 접속 시 `<Outlet>` 자리에 아까의 `<div>` 박스들이 잘 보입니다. <br>

그래서 유사한 서브 페이지들이 많이 필요하면 이렇게 하면 됩니다. <br>
