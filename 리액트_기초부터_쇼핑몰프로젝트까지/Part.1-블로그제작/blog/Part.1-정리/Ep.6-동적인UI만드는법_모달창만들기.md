# 리액트 환경에서 동적인 UI 만드는 법 (모달창 만들기)

<br>

## 리액트에서 동적인 UI 만드는 step

1. html css로 미리 UI 디자인
2. UI의 현재 상태를 state로 저장
3. state에 따라서 UI가 어떻게 보일지 조건문 등으로 작성

<br>

## step 1. html css로 미리 디자인

알아서 뚝딱뚝딱 디자인한 후...

<br><br>

## step 2. UI의 현재 상태를 state로 저장

state 하나 만들고 현재 UI의 상태정보를 저장합니다.

```js
let [modal, setModal] = useState(false);
```

모달 창은 열림/닫힘 이 두개 상태밖에 없기 때문에 그거 2종류만 표현할 수 있는 자료형이면 됩니다.

<br>

```js
let [modal, setModal] = useState('닫힘');
let [modal, setModal] = useState(0);
```

아무렇게나 해도 상관없지만 그래도 Boolean이 직관적이니까 Boolean으로 표현하겠습니다.

<br><br>

## step 3. state 에 따라서 UI가 어떻게 보일지 작성

```js
function App (){

  let [modal, setModal] = useState(false);
  return (
    저 state가 true면 <Modal></Modal>
    false면 아무것도 보여주지마세요
  )
}
```

이런식으로 조건문 만들면 됩니다.

<br>

## JSX에서 조건문 쓰는법

조건문은 if else 쓰면 되는데 <br>
JSX 안에서는 안되기 때문에 대신 삼항연산자를 써야합니다.

<br>

```js
조건식 ? 조건식 참일 때 실행할 코드 : 조건식 거짓일 때 실행할 코드
```

형식은 이러합니다.

<br>

```js
function App() {
    let [modal, setModal] = useState(false);
    return (
        <div className="app">
            (생략)
            {modal == true ? <Modal></Modal> : null}
        </div>
    );
}
```

이렇게 하면 됩니다. null은 그냥 아무 html도 남기기 싫을 때 쓰는 자료입니다. null은 텅 비었다는 뜻.

<br>

## 글 제목 누르면 모달창 띄우기

```js
() => {
    setModal(true);
};
```

이런식으로 onClick 박아도 되고 아니면

```js
const modalToggle = () => {
    setModal((modal) => !modal);
};
```

위에서 따로 함수 만들어서 써도 됩니다.

위 코드의 의미는 modal 이라는 state의 이전값을 가져와서 값을 true로 바꾼다는 뜻입니다.

여기서 modal 이라는 state의 이전 값은 false가 되겠죠.
