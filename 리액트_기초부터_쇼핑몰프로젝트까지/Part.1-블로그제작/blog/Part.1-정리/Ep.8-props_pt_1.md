# 자식이 부모의 state 가져다쓰고 싶을 때는 props!

자식 컴포넌트가 부모 컴포넌트에 있던 state 쓰고 싶으면 <br>
그냥 쓰면 안되고 **props** 로 전송해서 써야합니다. <br>

```js
function App() {
    let [글제목, 글제목변경] = useState(['남자코트 추천', '강남 우동맛집', '파이썬독학']);
    return (
        <div>
            <Modal></Modal>
        </div>
    );
}

function Modal() {
    return (
        <div className="modal">
            <h4>{글제목[0]}</h4>
            <p>날짜</p>
            <p>상세내용</p>
        </div>
    );
}
```

위 코드는 제대로 실행되지 않습니다. <br>
왜냐면 글제목 이라는 state 변수는 App 컴포넌트 안에는 있지만, Modal 컴포넌트에는 없기 때문이죠. <br>

자바스크립트에선 다른 함수에 있는 변수를 마음대로 가져다 쓸 수 없습니다. <br>

근데 컴포넌트 2개가 부모/자식 관계인 경우엔 가능합니다.
부모 컴포넌트의 state를 자식 컴포넌트로 전송해줄 수 있습니다. <br>

## props로 부모 -> 자식 state 전송하는 법

I. 자식 컴포넌트 사용하는 곳에 가서 `<자식컴포넌트 작명={state이름}/>`<br>
II. 자식 컴포넌트 만드는 function 으로 가서 props 라는 파라미터 등록 후 `props.작명` 사용

```js
function App() {
    let [글제목, 글제목변경] = useState(['남자코트 추천', '강남 우동맛집', '파이썬독학']);
    return (
        <div>
            <Modal 글제목={글제목}></Modal>
        </div>
    );
}

function Modal(props) {
    return (
        <div className="modal">
            <h4>{props.글제목[0]}</h4>
            <p>날짜</p>
            <p>상세내용</p>
        </div>
    );
}
```

I. 자식 컴포넌트 사용하는 곳에가서 `<자식 컴포넌트 작명={state이름}>`<br>
II. 자식 컴포넌트 만드는 곳에 가서 props 파라미터 등록 후 `props.작명` 사용!

<br>

참고 1 : props는 여러개 전송이 가능합니다. <br>
참고 2 : 꼭 state만 전송할 수 있는건 아닙니다. <br>
`<Modal 글제목={변수명}>` 일반 변수 , 함수 전송도 가능하고 <br>
`<Modal 글제목="강남우동맛집">` 일반 문자전송은 중괄호 없이 해도 됩니다. <br>

<br>

Modal -> App 처럼 자식 -> 부모 패륜방향 전송을 하거나 <br>
App -> Modal - Modal2 이런식으로 형제 컴포넌트 전송은 불가능합니다. <br><br>

## props는 함수 파라미터 문법이랑 똑같습니다

험수에 파라미터 같은거 왜 넣죠? <br>
_"함수 하나로 다양한 기능을 사용하기 위해서 쓰는게 파라미터 문법"_ 이라고 했었습니다. <br>
props도 실은 파라미터랑 똑같습니다.

<br>

```js
function Modal(props) {
    return (
        <div className="modal" style={{ background: 'skyblue' }}>
            <h4>{props.글제목[0]}</h4>
            <p>날짜</p>
            <p>상세내용</p>
        </div>
    );
}
```

갑자기 하늘색 배경의 모달창이 필요하면 저렇게 스타일 넣으면 됩니다. <br>
근데 여러가지 색의 모달창이 필요하면 어떡하나요.<br>

가장 쉬운 방법은 색상 별로 컴포넌트를 만들면 되긴 하겠지만, 내용은 똑같고 배경색만 다른데 굳이 같은 함수 여러개 만들 필요는 없겠죠. <br>

```js
function Modal(props) {
    return (
        <div className="modal" style={{ background: props.color }}>
            <h4>{props.글제목[0]}</h4>
            <p>날짜</p>
            <p>상세내용</p>
        </div>
    );
}
```

props.color 이런식으로 구멍을 뚫어놓으면 이제 컴포넌트 사용할 때 `<Modal color='skyblue'>` 이러면 하늘색 모달 창이 생성되고, skyblue 대신 orange를 넣으면 오렌지색 모달 창이 생성됩니다. <br>
