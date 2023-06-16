# 중요한 데이터는 변수말고 state에 담습니다

## state 만드는 법

리액트에선 변수 말고 state 만들어서 데이터를 저장해둘 수 있습니다. <br>

```js
import { useState } from 'react';
import './App.css';

function App() {
    let [a, b] = useState('남자 코트 추천');
    let posts = '강남 우동 맛집';
    return (
        <div className="App">
            <div className="black-nav">
                <div>개발 blog</div>
            </div>
            <div className="list">
                <h4>글제목</h4>
                <p>2월 17일 발행</p>
                <hr />
            </div>
        </div>
    );
}
```

맨 윗줄에 `import {useState} from 'react'` 하고 <br>
원하는 곳에서 `useState('보관할 자료')` 쓰면 state에 자료를 잠깐 저장할 수 있습니다. <br>

그리고 저장한 자료를 나중에 쓰고 싶으면 <br>
`let [a,b] = useState('남자 코트 추천');` <br>
a 자리에 state 이름을 자유롭게 작명한 다음 나중에 자유롭게 사용하면 됩니다.

<br><br>

### 자바스크립트 destructuring 문법

내가 array 안에 있는 데이터들을 변수로 쉽게 저장하고 싶으면 쓰는 문법입니다. <br>

예를 들어서 `['kim',20]` 이렇게 생긴 array 자료를 만들어놨는데 <br>
에서 Kim이랑 20이라는 자료를 각각 변수에 저장하고 싶으면

```js
let array = ['Kim', 20];

let name = array[0];
let age = array[1];
```

대충 이렇게 해도 되는데

```js
let [name, age] = ['Kim', 20];
```

요즘 사람은 이렇게 합니다. <br>

그럼 각각 `name = 'Kim'` , `age = 20` 이라는 변수가 생성됩니다. <br>
귀찮게 등호 여러번 쓸 필요없이 **왼쪽 오른쪽 형식을 똑같이 맞춰주시면** 자동으로 알아서 변수가 생성됩니다. <br>

이게 변수만들 때 쓰는 destructuring 문법입니다. <br>

useState() 를 쓰면 그 자리에 `[데이터1 , 데이터2]` 이렇게 생긴 이상한 array 가 남습니다. <br>
데이터 1 자리엔 '남자 코드 추천' 같은 자료가 들어있고 <br>
데이터 2 자리엔 state 변경을 도와주는 함수가 들어 있습니다. <br>

<br>

그 데이터들을 각각 변수로 빼고 싶으면 <br>
`let [a,b] = useState('남자 코트 추천')` 이러면 되는것입니다.

<br><br>

변수명을 약간 더 직관적으로 작명하면 <br>

```js
let [글제목, b] = useState('남자 코트 추천');
```

이렇게 하면 조금 더 직관적으로 이해할 수 있겠군요. <br>
글제목이라는 변수에는 '남자 코트 추천' 이라는 자료가 들어간댔으니 한번 html에 중괄호로 {글제목} 넣어보세요.

```js
function App() {
    let [글제목, b] = useState('남자 코트 추천');
    let posts = '강남 우동 맛집';
    return (
        <div className="App">
            <div className="black-nav">
                <div>개발 blog</div>
            </div>
            <div className="list">
                <h4>{글제목}</h4>
                <p>2월 17일 발행</p>
            </div>
        </div>
    );
}
```

이렇게 짜고 저장하면 글제목이 남자 코트 추천으로 진짜로 변경됩니다. <br>
결론은 리액트에선 일반 변수 대신 state 이용해도 자료를 잠깐 저장해둘 수 있다는겁니다.

<br><br>

## 변수 말고 state에 데이터 저장해서 쓰는 이유?

잘 생각해보면 state의 용도는 그냥 변수랑 똑같습니다. 자료 잠깐 보관하는게 끝인데 <br>
그럼 변수 쓰면되지 왜 굳이 state 쓰냐구요? <br>

state는 변동사항이 생기면 state 쓰는 html도 **자동으로 렌더링** 해주기 때문입니다.

```js
function App() {
    let post = '강남 우동 맛집';

    return <h4>{post}</h4>;
}
```

let post 변수에 있던걸 {post} 이렇게 데이터 바인딩 해놨다고 가정해봅시다. <br>
근데 갑자기 post 변수에 있던 데이터가 강남 우동 맛집 -> 강남 고기 맛집으로 바뀌었습니다. <br>
그 변경사항도 html에 반영되게 하고 싶으면 어떻게 하죠? <br>
쌩자바스크립트로는 "변수 내용 바뀌었으니까 html도 고쳐주세요" 라고 코드 짜야합니다.

<br><br>

```js
function App() {
    let [글제목, b] = useState('남자 코트 추천');

    return <h4>{글제목}</h4>;
}
```

이번엔 state 하나 만들어서 {글제목} 이렇게 데이터 바인딩을 했습니다. <br>
근데 갑자기 state에 있던 데이터가 남자 코트 추천 -> 여자 코트 추천으로 바뀌었습니다. <br>
그 변경사항도 html에 반영되게 하고 싶으면 어떻게 할까요? <br>

state는 그럴 필요 없습니다. 자동으로 html도 바뀝니다. <br>
state는 변경이 일어나면 state가 포함된 html을 **자동으로 재렌더링** 해줘서 그렇습니다.

<br><br>

### 그럼 블로그 로고 같은 데이터도 state로 만들까요?

<br>

그래도 되지만 블로그 로고명은 거의 바뀌지 않습니다. <br>
바뀌지 않는 데이터들은 굳이 state로 할 이유가 없어요. <br>
state의 가장 큰 장점은 변경 될 때마다 자동으로 state와 관련된 html이 재렌더링 된다는 것인데 <br>

로고명은 바뀌지 않으니 의미가 없겠죠. <br>
state는 상품명 , 글제목 , 가격 이런 것처럼 자주 변할 것 같은 데이터들을 저장하는게 좋습니다.

<br><br>

## 정리하자면

<br>
1. 자주 변경될 것 같은 데이터는 state로 저장 <br>
2. 굳이 html에 표기가 필요없는 데이터들은 변수에 저장
