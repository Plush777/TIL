# 라우터 : 셋팅이랑 기본 라우팅

## react-router-dom 설치

설치는 `npm install react-router-dom@6` <br>

셋팅은 index.js 파일로 가서

```js
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
```

import 하고 `<BrowserRouter>` 이걸로 `<App/>` 감싸면 끝!

<br>

## 라우터로 페이지 나누는법

다른 웹 사이트를 보면 naver.com/어쩌구로 접속하면 A 페이지를 보여주고 <br>
naver.com/저쩌구로 접속하면 B페이지를 보여줍니다. <br>
이런 식으로 url 경로마다 다른 페이지를 보여주고 싶으면
이렇게 작성합니다.

```js
(App.js)

import { Routes, Route, Link } from 'react-router-dom'

function App(){
  return (
    (생략)
    <Routes>
      <Route path="/detail" element={ <div>상세페이지임</div> } />
      <Route path="/about" element={ <div>어바웃페이지임</div> } />
    </Routes>
  )
}
```

-   우선 상단에서 여러가지 컴포넌트를 import 해오고
-   `<Routes>` 만들고 그 안에 `<Route>` 를 작성합니다.
-   `<Route path='/url경로' element={<보여줄 html>}` 이렇게 작성하면 됩니다. <br>

```js
<Route path="/" element={<div>메인페이지에서 보여줄거</div>} />
```

이 url 경로는 메인 페이지입니다.

<br>

```js
<Route
    path="/"
    element={
        <>
            <div className="main-bg"></div>
            <div className="container">
                <div className="row">
                    {shoes.map((a, i) => {
                        return <Card shoes={shoes[i]} i={i}></Card>;
                    })}
                </div>
            </div>
        </>
    }
/>
```

이러면 메인 페이지 접속 시에만 상품 목록이 보이고 <br>
나머지 페이지에선 안보이겠군요.

<br>

## 페이지 이동 버튼은

링크 만들고 싶으면 Link 컴포넌트 import 해오고 원하는 곳에서 <br> `<Link>` 쓰면 됩니다.

```js
<Link to="/">홈</Link>
<Link to="/detail">상세페이지</Link>
```
