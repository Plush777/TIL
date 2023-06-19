# 리액트에서 레이아웃 만들 때 쓰는 JSX 문법 3개

## App.js

App.js가 여러분의 메인페이지 입니다. <br>
여기 이미 채워져있던 쓸데없는 html들은 싹 비우고 시작합니다. <br>
`<div>` 하나만 남기면 됩니다.

```js
import './App.css';

function App() {
    return <div className="App"></div>;
}

export default App;
```

<br>

## 블로그 상단 nav 제작

웹 페이지 레이아웃은 그냥 옛 방식 그대로 똑같이 `<div>` 떡칠해서 짜면 됩니다.

```js
function App() {
    return (
        <div className="App">
            <div className="black-nav">
                <h4>블로그임</h4>
            </div>
        </div>
    );
}
```

```css
.black-nav {
    background: black;
    width: 100%;
    display: flex;
    color: white;
    padding: 20px;
}
```

<br>

## JSX 문법 1. html에 class 넣을 땐 className

잘보면 평소에 짜던 html/css와 다른 부분이 있습니다. <br>
스타일을 주기위한 class명 넣을 때 `class=""` 가 아니라 `className=""` 이렇게 쓰는 부분이 좀 다른데 <br><br>

왜냐면 실은 App.js에 짜고 있는건 html이 아니라 JSX라고 부르는 언어라서 그렇습니다. <br>

JSX는 일종의 자바스크립트라서 <br>
자바스크립트에서 사용하는 예약어인 class라는 키워드를 막 사용하면 안됩니다. <br>
그래서 class 넣고 싶으면 `className` 이라고 써야합니다.

<br><br>

## JSX 문법 2. 변수를 html에 꽂아넣을 때는 { 중괄호 }

자바스크립트 변수 같은 곳에 있떤 자료를 html 중간에 꽂아서 보여주고 싶을 때가 많습니다. 어떻게 할까요.

```js
function App() {
    let post = '강남 우동 맛집';
    return (
        <div className="App">
            <div className="black-nav">
                <div>블로그임</div>
                <div>여기에 저 변수에 있던거 꽂고 싶으면?</div>
            </div>
        </div>
    );
}
```

일단 위에 post 라는 변수를 만들어서 잠깐 문자를 저장해놨습니다. <br>
변수가 뭐냐구요? <br>
변수는 길고 복잡한 자료를 잠깐 한 단어에 저장해서 쓸 수 있는 고마운 문법이고 var let const 키워드로 아무데나 만들면 됩니다. <br>

아무튼 저 let post 안에 있던 자료를 `<div>` 안에 꽂아넣고 싶으면 어떻게하죠? <br>
옛날 자바스크립트 문법을 쓰면 innerHTML 어쩌구 해서 쓰겠지만 리액트에서는 더 쉽게 할 수 있습니다.

<br>

```js
function App() {
    let post = '강남 우동 맛집';
    return (
        <div className="App">
            <div className="black-nav">
                <div>블로그임</div>
                <div>{post}</div>
            </div>
        </div>
    );
}
```

중괄호 안에 데이터 바인딩하고 싶은 변수명만 담으시면 됩니다. <br><br>

```js
function App() {
    var data = 'red';
    return (
        <div className="App">
            <div className="black-nav">
                <div>개발 blog</div>
                <div className={data}>안녕하세요</div>
            </div>
        </div>
    );
}
```

온갖 곳에 중괄호 열어서 변수들을 집어넣을 수 있습니다. <br>
href , id , className , src 등 여러가지 html 속성들에도 가능합니다. <br>

참고로 변수에 있던걸 html에 꽂아넣는 작업을 있어보이는 말로 데이터 바인딩 이라고 합니다.

<br> <br>

## JSX 문법 3. html에 style 속성 넣고 싶으면

`<div style="color : blue>` 이런걸 넣고 싶으면 <br>
JSX 상에서는 `style={}` 안에 {} 자료형으로 집어 넣어야합니다.

```js
<div style={{ color: 'blue', fontSize: '30px' }}> 글씨 </div>
```

이렇게 넣으면 됩니다. <br>

-   {속성명 : '속성값'} 이렇게 넣으면 됩니다.
-   근데 font-size 처럼 속성명에 대쉬 대신 카멜케이스로 바꿔야합니다.
