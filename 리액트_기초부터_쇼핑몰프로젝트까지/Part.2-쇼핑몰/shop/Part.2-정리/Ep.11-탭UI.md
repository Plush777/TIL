# 리액트에서 탭 UI 만들기

## 1. html css로 탭 디자인 미리 완성하기

```js
<Nav variant="tabs"  defaultActiveKey="link0">
    <Nav.Item>
      <Nav.Link eventKey="link0">버튼0</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link1">버튼1</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link2">버튼2</Nav.Link>
    </Nav.Item>
</Nav>
<div>내용0</div>
<div>내용1</div>
<div>내용2</div>
```

eventKey는 버튼마다 마음대로 작명하고, defaultActiveKey는 페이지 로드 시 어떤 버튼에 눌린 효과를 줄지 결정하는 옵션입니다. (부트스트랩 옵션임)

<br>

## 2. UI의 현재 상태를 저장할 state 하나 만들기

```js
function Detail() {
    let [탭, 탭변경] = useState(0)(생략);
}
```

상단에 state 하나 만들었습니다. <br>
탭 UI의 상태는 0번 내용이 보이거나 / 1번 내용이 보이거나 / 2번 내용이 보이거나 <br>
셋 중 하나기 때문에 0,1,2 숫자로 상태를 표현해보겠습니다.

<br>

## 3.state에 따라서 UI가 어떻게 보일지 작성

state가 0 이면 0번내용 보여주세요~ <br>
1이면 1번 내용 보여주세요~ <br>
이렇게 코드짜면 됩니다.

```js
function Detail() {
    let [탭, 탭변경] = useState(0);

    return <TabContent />;
}

function TabContent() {
    if (탭 === 0) {
        <div>내용0</div>;
    }
    if (탭 === 1) {
        <div>내용1</div>;
    }
    if (탭 === 2) {
        <div>내용2</div>;
    }
}
```

삼항 연산자는 3개를 써야하니까 복잡하기 때문에 컴포넌트로 만들어서 넣어봤습니다. 근데 오류가 뜨는군요. <br>

```js
function Detail() {
    let [탭, 탭변경] = useState(0);

    return <TabContent 탭={탭} />;
}

function TabContent(props) {
    if (props.탭 === 0) {
        return <div>내용0</div>;
    }
    if (props.탭 === 1) {
        return <div>내용1</div>;
    }
    if (props.탭 === 2) {
        return <div>내용2</div>;
    }
}
```

부모에 있던 state를 자식으로 받아와야하니까 props로 전달을 해야합니다.

<br>

```js
<Nav variant="tabs" defaultActiveKey="link0">
    <Nav.Item>
        <Nav.Link
            onClick={() => {
                탭변경(0);
            }}
            eventKey="link0"
        >
            버튼0
        </Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link
            onClick={() => {
                탭변경(1);
            }}
            eventKey="link1"
        >
            버튼1
        </Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link
            onClick={() => {
                탭변경(2);
            }}
            eventKey="link2"
        >
            버튼2
        </Nav.Link>
    </Nav.Item>
</Nav>
```

완성이군요. 이제 state는 다 됬으니, 온클릭 걸어서 변경해주면 끝입니다.

<br>

## if 필요 없을 수도 있습니다

```js
function TabContent(props) {
    return [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.탭];
}
```

이렇게 하면 간단하게 처리가 될듯하네요. <br>
왜냐면 props.탭이 0이면 저 긴 array 자료에서 0번 자료를 꺼내줄테니까요.

<br>

## props 쉽게 쓰려면

```js
function TabContent({ 탭 }) {
    return [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭];
}
```

자식 컴포넌트에서 props라고 파라미터 하나만 작명하는게 아니라 <br> `{state1 이름 , state2 이름}` 이렇게 작성하면 <br>
`props.` 을 붙이지 않아도 됩니다.
