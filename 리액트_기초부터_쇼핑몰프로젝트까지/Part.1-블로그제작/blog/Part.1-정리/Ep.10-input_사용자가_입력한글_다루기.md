# input : 사용자가 입력한 글 다루기

## `<input>` 에 뭔가 입력 시 코드 실행하려면

```js
<input
    onChange={() => {
        실행할코드;
    }}
/>
```

onChange , onInput은 input에 유저가 뭔가 입력할 때마다 <br>
안에 있는 코드를 실행해줍니다.

<br>

## `<input>` 에 입력한 값 가져오는 법

```js
<input
    onChange={(e) => {
        console.log(e.target.value);
    }}
/>
```

e 라는 파라미터를 추가하고 <br>
`e.target.value` 라고 적으면 현재 `<input>`에 입력된 값을 가져올 수 있습니다. <br>

이벤트핸들러에 들어가는 함수에 저렇게 파라미터 e를 추가하면 <br>
e는 이벤트 객체 이런식으로 부르는데 <br>
현재 발생하는 이벤트와 관련한 유용한 기능들을 제공하는 일종의 변수입니다.

<br>

## 사용자가 input에 입력한 데이터 저장하기

사용자가 input에 입력한 데이터는 state 아니면 변수에 저장해서 쓰는게 일반적입니다. <br>

```js
function App() {
    let [입력값, 입력값변경] = useState('');
    return (
        <input
            onChange={(e) => {
                입력값변경(e.target.value);
                console.log(입력값);
            }}
        />
    );
}
```

state 하나 만들어주고 onChange 될 때마다 state에 현재 값 넣으라고 코드를 짰습니다. <br>
state에 문자를 저장하고 싶은데 일단 기본 값을 뭘 넣을지 모르겠으면 따옴표 2개만 치면 됩니다. <br>
따옴표 2개는 빈 문자를 뜻하니까요.
