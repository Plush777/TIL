# 재랜더링 막는 memo , useMemo

## 테스트용 자식 컴포넌트 하나 만들어보기 

```js
function Child(){
  console.log('재렌더링됨')
  return <div>자식임</div>
}

function Cart(){ 

  let [count, setCount] = useState(0)

  return (
    <Child />
    <button onClick={()=>{ setCount(count+1) }}> + </button>
  )
}
```
Cart 컴포넌트 안에 Child 컴포넌트를 만들었습니다. <br>
그리고 버튼누를 때 Cart 컴포넌트가 재렌더링되게 만들어놨는데 <br>
이 경우 `<Child>` 이것도 재렌더링됩니다. <br>

평소엔 별 문제가 없겠지만 `<Child>` 얘가 렌더링이 2초정도 걸리는 느린 컴포넌트면 어쩌죠? <br>

그럼 버튼 누를 때 마다 버벅일듯요.

<br>

그럴 땐 memo라는 함수를 쓰면 <br>

"꼭 필요할 때만 `<Child>` 컴포넌트 재렌더링해주세요" 라고 코드를 짤 수도 있습니다. 

<br>

## memo() 로 컴포넌트 불필요한 재랜더링 막기

```js
import {memo, useState} from 'react'

let Child = memo( function(){
  console.log('재렌더링됨')
  return <div>자식임</div>
})

function Cart(){ 

  let [count, setCount] = useState(0)

  return (
    <Child />
    <button onClick={()=>{ setCount(count+1) }}> + </button>
  )
}
```

1. memo를 import 해와서
2. 원하는 컴포넌트 정의 부분을 감싸면 됩니다.

근데 컴포넌트를 `let 컴포넌트명 = function(){}` 이런식으로 만들어야 감쌀 수 있습니다. <br>
그럼 이제 Child로 전송되는 props 가 변하거나 그런 경우에만 재렌더링 됩니다.

<br>

### 어 그럼 memo는 좋은거니까 막써도 되겠네요

meomo로 감싼 컴포넌트는 헛된 재렌더링을 안시키려고 <br>
기존 props와 바뀐 props를 비교하는 연산이 추가로 진행됩니다. <br>
props가 크고 복잡하면 이거 자체로 부담이 될 수 있으니 꼭 필요한 곳에만 사용합시다.

<br>

## 비슷하게 생긴 useMemo

비슷한 useMemo 라는 문법도 있는데 이건 그냥 useEffect 와 비슷한 용도입니다. <br>
컴포넌트 로드 시 1회만 실행하고 싶은 코드가 있으면 거기 담으면 됩니다.

```js
import {useMemo, useState} from 'react'

function 함수(){
  return 반복문10억번돌린결과
}

function Cart(){ 

  let result = useMemo(()=>{ return 함수() }, [])

  return (
    <Child />
    <button onClick={()=>{ setCount(count+1) }}> + </button>
  )
}
```
1. 예를 들어서 반복문을 10억번 돌려야하는경우
2. 그 함수를 useMemo 안에 넣어두면 컴포넌트 로드 시 1회만 실행됩니다.
그럼 재렌더링마다 동작안하니까 좀 효율적으로 동작하겠죠? <br>
useEffect처럼 dependency도 넣을 수 있어서 <br>
특정 state , props가 변할 때만 실행할 수도 있습니다.

<br>

useEffect와 useMemo의 차이점은 useEffect는 html이 전부 로드가 끝나면 그 다음에 실행하는데, useMemo는 렌더링 될 때 실행됩니다. 실행 시점의 차이입니다.