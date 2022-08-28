# 리액트에서 서버와 통신하려면 ajax 2 : post , fetch

## 버튼 누르면 서버에서 데이터 가져와서 상품 3개 생성하기

```js
import axios from 'axios';

function App() {
    let [shoes, setShoes] = useState(어쩌구);
    return (
        <button
            onClick={() => {
                axios
                    .get('https://codingapple1.github.io/shop/data2.json')
                    .then((결과) => {
                        let copy = [...shoes, ...결과.data];
                        setShoes(copy);
                    })
                    .catch(() => {
                        console.log('실패함');
                    });
            }}
        >
            버튼
        </button>
    );
}
```

1. spread 문법으로 shoes의 사본을 만들었습니다.

근데 그 안에 ...결과.data 이것도 함께 뒤에 집어넣었습니다. <br>
결과.data 출력해보면 `[{4번상품},{5번상품},{6번상품}]` 이게 나오기 때문에 ...결과.data하면 `{},{},{}` 이것만 남겠네요.

<br>

그럼 이제 버튼 누르면 shoes 라는 state는 <br>
`[{},{},{},{},{},{}]` 이렇게 되겠네요.

<br><br>

## POST 요청하는법

```js
axios.post('URL', { name: 'kim' });
```

이거 실행하면 서버로 `{name : 'kim'}` 자료가 전송됩니다. <br>
완료 시 특정 코드를 실행하고 싶으면 이것도 역시 `.then()` 뒤에 붙이면 됩니다.

<br><br>

## 동시에 AJAX 요청 여러개 날리려면

```js
Promise.all([axios.get('URL1'), axios.get('URL2')]);
```

이러면 URL1,URL2 로 GET 요청을 동시에 해줍니다. <br>
둘 다 완료시 특정 코드를 실행하고 싶으면 `.then()` 뒤에 붙이면 됩니다. <br>

<br>

## 원래 서버와 문자자료만 주고받을 수 있음

object/array 이런거 못주고 받습니다. <br>
근데 방금만해도 array 자료 받아온 것 같은데 그건 어떻게 한거냐면 <br>
object/array 자료에 따옴표를 쳐놓으면 됩니다. <br>

`"{"name" : "kim"}"` <br>
이걸 JSON 이라고 부릅니다. <br>
JSON은 문자 취급을 받기 때문에 서버와 자유롭게 주고받을 수 있습니다. <br>

그래서 실제로 결과.data 출력해보면 따옴표 쳐진 JSON이 나와야하는데 <br>
axios 라이브러리는 JSON -> object/array 변환작업을 자동으로 해줘서 <br>
출력하면 object/array 가 나옵니다.

<br>

```js
fetch('URL')
    .then((결과) => 결과.json())
    .then((결과) => {
        console.log(결과);
    });
```

쌩자바스크립트 문법인 fetch() 를 이용해도 GET/POST 요청이 가능한데 <br> 그건 안바꿔줘서 직접 바꾸는 작업이 필요합니다.
