# Props 싫으면 Context API 써도 됩니다

App에 있던 state를 TabContent 컴포넌트에서 사용하고 싶어지면 어떡하죠? <br>
App -> Detail -> TabContent 이렇게 props를 2번 전송해주면 됩니다.

<br>

![image](https://user-images.githubusercontent.com/87457620/187919542-addc4885-0b72-4bb2-8d51-1a8708449e17.png)

이게 귀찮으면 Context API나 Redux 같은 외부 라이브러리 쓰면 됩니다.

<br>

## Context API 문법으로 props 없이 state 공유하기

재고라는 state를 App 컴포넌트에 만듭니다. <br>
그리고 이 state를 TabContent 라는 자식 컴포넌트에서 쓰고싶다고 가정해봅시다. <br>
Context API 쓰면 props 전송 없이도 TabContent 컴포넌트가 쓸 수 있는데 이거 쓰려면 일단 셋팅부터 해야합니다.

```js
App.js;

export let Context1 = React.createContext();

function App() {
    let [재고, 재고변경] = useState([10, 11, 12]);

    생략;
}
```

일단 `createContext()` 함수를 가져와서 context 하나 만듭니다. <br>
context를 쉽게 비유하자면 **state 보관함** 입니다.

<br>

```js
App.js;

export let 재고context = React.createContext();

function App() {
    let [재고, 재고변경] = useState([10, 11, 12]);

    return (
        <Context1.Provider value={{ 재고, shoes }}>
            <Detail shoes={shoes} />
        </Context1.Provider>
    );
}
```

아까만든 Context1로 원하는 곳을 감싸고 공유를 원하는 state를 value 안에 다 적으면 됩니다. <br>
그럼 이제 Context1 로 감싼 모든 컴포넌트와 그 자식 컴포넌트는 state를 props 전송없이 직접 사용가능합니다.

<br>

## Context 안에 있던 state 사용하려면

1. 만들어둔 Context를 import 해옵니다.
2. useContext() 안에 넣습니다.
   그럼 이제 그 자리에 공유했던 state가 전부 남는데 그거 쓰면 됩니다.

```js
Detail.js;

import { useState, useEffect, useContext } from 'react';
import { Context1 } from './../App.js';

function Detail() {
    let { 재고 } = useContext(Context1);

    return <div>{재고}</div>;
}
```

예를 들어서 Detail 컴포넌트에서 Context에 있던 state를 꺼내 쓰려면

1. Context1을 import 하고
2. useContext()안에 담으면 됩니다. (Context 해체해주는 함수입니다)

그럼 그 자리에 공유했던 모든 state가 남습니다. <br>
변수에 담아서 가져다쓰거나 하면 됩니다.

심지어 Detail 안에 있는 모든 자식 컴포넌트도 useContext() 쓰면 자유롭게 재고 state 사용 가능합니다.

<br>

### props보다 불편한데요

그럼 props 쓰면 됩니다. 이건 중첩해서 사용한 컴포넌트가 많을 때 편리한 문법입니다.

<br><br>

## Context API 단점

실은 잘 안쓰는 이유는

1. state 변경 시 쓸데없는 컴포넌트까지 전부 재랜더링이 되고
2. useContext() 를 쓰고있는 컴포넌트는 나중에 다른파일에서 재사용할 때 Context를 import 하는게 귀찮아질 수 있습니다. <br>

그래서 이것보단 redux 같은 외부 라이브러리 많이 사용합니다.
