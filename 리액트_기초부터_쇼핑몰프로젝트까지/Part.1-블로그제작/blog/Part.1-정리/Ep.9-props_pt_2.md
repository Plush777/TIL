d# props를 응용한 상세페이지 만들기

props를 응용해서 <br>
0번째 글을 누르면 모달 창 안에 0번째 글제목이 보이고,<br>
1번째 글을 누르면 1번째 글제목,<br>
2번째 글을 누르면 2번째 글제목이 보이는 UI를 만들어보겠습니다. <br>

이전에 했던 것 처럼 3step만 기억하면됩니다. <br>

1. html css 미리 디자인
2. 현재 UI 상태 state 만들어두고
3. state 종류에 따라서 UI가 어떻게 보일지 작성

<br>

## 1. html css로 미리 디자인

이미 다했으니 pass

<br>

## 2, 현재 UI 상태 state 만들어두고

```js
let [modalTitle, setModalTitle] = useState(0);
```

App 안에 state 하나 만들어서 순서대로 보이게 하는걸 표현하기 위하여 숫자로 해봤습니다. 표현하는건 자유입니다. 문자열로 해도되구요.

<br>

## 3. state에 따라서 UI가 어떻게 보일지 작성

```js
function App() {
    let [modalTitle, setModalTitle] = useState(0);
}

return (
    <div className="modal" style={{ backgroundColor: modalBackground }}>
        <h4>{listTitle[modalTitleProp]}</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button
            type="button"
            onClick={() => {
                let modalTitleModfiy = [...listTitle];
                modalTitleModfiy[0] = '모달창 타이틀도 수정됐어!';
                modalListTitle(modalTitleModfiy);
            }}
        >
            <span>✍️</span>
        </button>
    </div>
);
```

modalTitle === 0이면 props.글제목[0] <br>
modalTitle === 1이면 props.글제목[1] <br>
이런식으로 조건문 사용해서 해도 됩니다. <br>

근데 조건문은 넘 복잡하니까 `listTitle[modalTitleProp]` 이런식으로 해도 되겠네요. 인덱싱을 [0] 이렇게 하드 코딩하는게 아니라 아까 위에서 만든 state (modalTitle) 를 넣어주면 될듯하네요. <br><br>

## 이제 onClick 넣어주면 끝

이제 글을 클릭할 때 스위치만 바꿔주면 끝입니다. <br>
0번째 글을 클릭하면 state를 0으로 바꿔주고 <br>
1번째 글을 클릭하면 state를 1로 바꿔주고 <br>
2번째 글을 클릭하면 state를 2로 바꿔주고 ... <br>

```js
<h4
    onClick={() => {
        modalToggle();
        setModalTitle(i);
    }}
>
    {a}
</h4>
```

전에 만든 map 반복문에서 이런식으로 작성하면 state가 0 1 2 이런식으로 되겠군요. <br>

i를 넣어준 이유는 map 반복문할 때 정리한 내용으로, 2번째 파라미터인 i는 0 1 2 이런식으로 1씩 증가하는 정수라서 넣어준겁니다. <br>

<br>

### state를 자식 컴포넌트에 만들면 props 안해도 되지 않나요

지금 사용 중인 state가 자식 컴포넌트에서만 사용 된다면 그렇게 해도 상관은 없겠지만, 다양한 컴포넌트에서 쓰이는 state는 컴포넌트들 중 최고로 높은 부모에게 만들어놔야 합니다. <br>

왜냐면 state는 부모 -> 자식 전송만 가능하니까 그렇습니다.

<br>

### es6 구조 분해할당 문법으로 props 생략해서 쓰기

```js
//App

{
    modal && <Modal bgColor={'skyblue'} titleProp={title} modalProp={setTitle} modalTitleProp={modalTitle} />;
}
```

```js
//Modal

function Modal({ bgColor, titleProp, modalProp, modalTitleProp }) {
    const modalBackground = bgColor;
    const listTitle = titleProp;
    const modalListTitle = modalProp;

    return (
        <div className="modal" style={{ backgroundColor: modalBackground }}>
            <h4>{listTitle[modalTitleProp]}</h4>
            <p>날짜</p>
            <p>상세내용</p>
            <button
                type="button"
                onClick={() => {
                    let modalTitleModfiy = [...listTitle];
                    modalTitleModfiy[0] = '모달창 타이틀도 수정됐어!';
                    modalListTitle(modalTitleModfiy);
                }}
            >
                <span>✍️</span>
            </button>
        </div>
    );
}
```

props. 붙이는게 귀찮다면, es6의 구조 분해할당 문법을 쓰면 간략하게 표현할 수 있습니다. <br>

원래대로 표현하면

```js
function Modal(props) {
    return (
        <div className="modal">
            <h4>{props.titleProp[modalTitleProp]}</h4>
        </div>
    );
}
```

이런식으로 작성하거나

```js
function Modal(props) {
    const listTitle = props.titleProp;
    return (
        <div className="modal">
            <h4>{listTitle[modalTitleProp]}</h4>
        </div>
    );
}
```

이렇게 변수에 넣어서 작성을 할 수도 있습니다. 하지만 파라미터로 받아온 props 내부 값을 조회하면 `props.` 을 입력하고 있는데 객체 비구조화 할당이라는 문법을 사용하면 더욱 짧고 보기좋게 작성 가능합니다.

<br>

```js
const { bgColor, titleProp, modalProp, modalTitleProp } = props;
```

위 코드는 다음과 같습니다.

```js
props.bgColor
props.titleProp
props.modalProp
props.modalTitleprop

...
```

더 나아가서 파라미터 단계에서 객체 비구조화 할당을 할수도 있습니다.

```js
function Modal({ bgColor, titleProp, modalProp, modalTitleProp }) {
    const listTitle = titleProp;
    return (
        <div className="modal">
            <h4>{listTitle[modalTitleProp]}</h4>
        </div>
    );
}
```

이런식으로 앞에 props 를 안붙이고 사용이 가능합니다.
