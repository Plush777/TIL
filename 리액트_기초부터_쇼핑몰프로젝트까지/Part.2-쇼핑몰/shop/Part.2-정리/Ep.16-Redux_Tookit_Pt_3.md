# Redux 3 : store의 state 변경하는법

Redux의 state를 변경하고 싶으면 변경하는 법이 따로 있습니다.

1. store.js 에 state변경해주는 함수부터 만들고
2. export 해두고
3. 필요할 때 import 해서 쓰면 되는데 `dispatch()` 로 감싸서 써야합니다.

<br>

## store의 state 변경하는 법

큰 그림부터 그려보자면 <br>
state 수정함수부터 store.js 에 만들어두고 <br>
그걸 컴포넌트에서 원할 때 실행하는 식으로 코드를 짭니다. <br>

## I. store.js 안에 state 수정 함수부터 만듭니다.

```js
let user = createSlice({
    name: 'user',
    initialState: 'kim',
    reducers: {
        changeName(state) {
            return 'john ' + state;
        },
    },
});
```

slice 안에 `reducers : {}` 열고 안에 함수 만들면 됩니다.

-   함수 작명 맘대로 합니다.
-   파라미터 하나 작명하면 그건 기존 state가 됩니다.
-   return 우측에 새로운 state 입력하면 그걸로 기존 state 갈아치워줍니다.

이제 changeName() 쓸때마다 kim -> john kim 이렇게 변할듯.

<br>

## II. 다른 곳에서 쓰기 좋게 export 해둡니다.

```js
export let { changeName } = user.actions;
```

이런 코드 store.js 밑에 추가하면 됩니다. <br>
slice이름.actions 라고 적으면 state 변경 함수가 전부 그 자리에 출력됩니다. <br>
그걸 변수에 저장했다가 export 하라는 뜻일뿐입니다

<br>

## III. 원할 때 import 해서 사용합니다. 근데 dispatch() 로 감싸서 써야함

예를 들어서 Cart.js에 버튼 같은거 하나 만들고 <br>
그 버튼 누르면 state를 kim -> john kim 이렇게 변경하고 싶으면

```js
(Cart.js)

import { useDispatch, useSelector } from "react-redux"
import { changeName } from "./../store.js"

(생략)

<button onClick={()=>{
  dispatch(changeName())
}}>버튼임</button>
```

이렇게 코드 짜면 됩니다.

-   store.js 에서 원하는 state 변경함수 가져오면 되고
-   useDispath 라는 것도 라이브러리에서 가져옵니다.
-   그리고 `dispatch(state변경함수())` 이렇게 감싸서 실행하면 state 진짜로 변경됩니다.

<br>

## 그지같고 복잡한데요

store 안에 있는 state를 수정하고 싶으면

-   state 수정함수를 store.js 에 만들어두고
-   컴포넌트는 그걸 부르기만 하는 식으로 state 수정하게 되어 있습니다.

<br>

### 왜이렇게 복잡하고 그지같나요

Redux 만든 사람이 정한 문법일뿐이라 Redux 만든 사람에게 뭐라하면 됨.

<br>

### 컴포넌트에서 state 직접 수정하면 편하지 않나요

그럼 당장은 편한데 나중에 프로젝트가 커지면 심각한 단점이 있을 수 있습니다.

![image](https://user-images.githubusercontent.com/87457620/188277201-cf6d8895-00e9-444a-b7e3-b04ab9ff3e48.png)

컴포넌트 100개에서 직접 kim 이라는 state 변경하다가 <br>
갑자기 kim 이 123이 되버리는 버그가 발생하면 <br>
범인 찾으려고 컴포넌트 100개를 다 뒤져야합니다.

<br>

![image](https://user-images.githubusercontent.com/87457620/188277233-390a3ef9-d246-4f05-ad57-a704cd90fae4.png)

근데 state 수정함수를 store.js에 미리 만들어두고 <br>
컴포넌트는 **그거 실행해달라고 부탁만** 하는 식으로 코드를 짜놓으면 <br> kim이 123이 되버리는 버그가 발생했을 때 범인 찾기가 수월합니다. <br>
범인은 무조건 store.js에 있으니까요. (수정함수를 잘 만들어놨다면)
