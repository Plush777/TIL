# 많은 div들을 한 단어로 줄이고 싶으면 Component

<br>

## html 짤 때 유의점

```js
return(
  <div></div>
  <div></div>
)
```

위처럼 return 태그 안에 html 태그 나란히 적기 이런거 안됩니다. <br> 하나의 태그로 시작해서 하나의 태그로 끝나야 합니다.

<br>

```js
return (
    <>
        <div></div>
        <div></div>
    </>
);
```

그래서 굳이 div 두개를 나란히 적고 싶으면 하나의 div로 또 감싸야합니다. <br>
의미 없는 div 싫으면 fragment 문법이라고 해서 <></> 로 감싸도 됩니다.

<br>

## 복잡한 html을 한 단어로 치환할 수 있는 component 문법

리액트는 긴 html을 한 단어로 깔끔하게 치환해서 넣을 수 있는 문법을 제공합니다. <br>
component 라고 합니다. <br>
이걸 이용하면 함수나 변수 맏늘듯 HTML을 깔끔하게 한 단어로 치환해서 원하는 곳에 꽂아넣을 수 있습니다.

```js
function App() {
    return (
        <div>
            (생략)
            <Modal></Modal>
        </div>
    );
}

function Modal() {
    return (
        <div className="modal">
            <h4>제목</h4>
            <p>날짜</p>
            <p>상세내용</p>
        </div>
    );
}
```

이렇게 하면 됩니다. <br>
줄이는 법은

1. function을 이용해서 함수를 하나 만들어주고 작명합니다.
2. 그 함수 안에 return() 안에 축약을 원하는 html을 담습니다.
3. 그럼 원하는 곳에서 `<함수명></함수명>` 사용하면 아까 축약한 html이 등장합니다.

이렇게 축약한 HTML 덩어리를 Component 라고 부릅니다.
`<div>` 뭉텅이보다 깔끔하게 `<Modal>` 이렇게 되어있으니

남이 봤을 때 & 미래의 내가 봤을 때 레이아웃을 바로 파악이 가능하니 나중에 관리하기도 좋겠죠.

<br>

## Component 만들 때 주의점

1. 컴포넌트 작명할 땐 영어 대문자로 보통 작명합니다.
2. return() 안엔 html 태그들이 평행하게 여러개 들어갈 수 없습니다.
3. function App() 내부에서 만들면 안됩니다. 컴포넌트 안에 컴포넌트는 만들어질 수 없습니다.
4. `<컴포넌트></컴포넌트>` 또는 축약해서 `<컴포넌트/>` 도 됩니다.

<br>

## arrow functon 써도 됩니다.

```js
function Modal() {
    return <div></div>;
}

let Modal = () => {
    return <div></div>;
};
```

<br>

## 어떤 html들을 component로 만드는게 좋을까

따로 기준은 없지만 관습적으로 어떤 부분을 컴포넌트화 하냐면

-   사이트에 반복해서 출현하는 html 덩어리들
-   내용이 매우 자주 변경될것 같은 html 부분
-   다른 페이지를 만들고 싶다면 그 페이지의 HTML 내용을 하나의 컴포넌트로 생성
-   또는 다른 팀원과 협업할 때 웹 페이지를 컴포넌트 단위로 나눠서 작업 분배

<br>
함수문법처럼 긴 코드 축약 , 다른 곳에서 재사용 , 복잡한 코드를 작은 기능으로 나눌 때 이럴 때랑 똑같습니다.

<br>

## Component 단점

html 깔끔하게 쓸려고 Component 수백개 만들면 그것만으로도 관리가 힘듭니다. <br>

예를 들어서 function modal 안에서 글제목 state 쓰고싶어서 {글제목} 이렇게 쓰면 잘 안되는데 왜냐면 당연히 자바스크립트에선 한 function 안에 있는 변수를 다른 function 에서 맘대로 쓸 수 없어서 그렇습니다. <br>

props 라는 문법을 이용해 state를 `<Modal>` 까지 전해줘야 비로소 사용이 가능합니다.
