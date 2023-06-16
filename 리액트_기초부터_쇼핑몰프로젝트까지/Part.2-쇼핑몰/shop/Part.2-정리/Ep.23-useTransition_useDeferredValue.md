# useTransition , useDeferredValue

리액트 18버전 이후부터 <br>
렌더링 성능이 저하되는 컴포넌트에서만 쓸 수 있는 혁신적인 기능이 하나 추가되었습니다. <br>
`useTransition` 이건데 이걸로 오래걸리는 부분을 감싸면 렌더링 시 버벅이지 않게 해줍니다. <br>

실은 코드 실행시점만 조절해서 빨라보이게하는 방식임.

<br>

## 리액트 18버전부터 추가 된 기능 1 : 일관된 batching

automatic batching 이라는 기능이 있는데

```js
setCount(1) 
setName(2) 
setValue(3)   //여기서 1번만 재렌더링됨
```
state 변경함수를 연달아서 3개 사용하면 재렌더링도 원래 3번 되어야 하지만 <br>
리액트는 똑똑하게도 재렌더링을 마지막에 1회만 처리해줍니다. <br>
일종의 쓸데없는 재렌더링 방지 기능이고 batching 이라고 합니다.

```js
fetch().then(() => {
    setCount(1)   //재렌더링됨
    setName(2)   //재렌더링됨
}) 
```
근데 문제는 ajax요청 , setTimeout 안에 state 변경 함수가 있는 경우 batching이 일어나지 않습니다. <br>
리액트 17까진 그런 식으로 일관적이지 않게 동작했는데 <br>
18버전 이후 부터는 어디 있든간에 재 렌더링은 마지막에 1번만 됩니다.

<br>

batching 되는게 싫고 state 변경 함수 실행마다 재렌더링 시키고 싶으면 <br>
flushSync 라는 함수를 쓰면 됩니다.

<br><br>

## 리액트 18버전부터 추가된 기능 2 : useTransition

렌더링시간이 매우 오래걸리는 컴포넌트가 있다고 칩시다. <br>
버튼 클릭 , 타이핑할 때 마다 그 컴포넌트를 렌더링 해야한다면 <br>
이상하게 버튼 클릭 , 타이핑 반응속도도 느려집니다. <br>
사람들은 원래 클릭 , 타이핑 했을 때 0.3초 이상 반응이 없으면 불편함을 느끼기 때문에 개선 방법을 알아봅시다.

<br>

당연히 그 컴포넌트 안의 html 개수를 줄이면 대부분 해결되지만 그런게 안된다면 useTransition 쓰면 됩니다.

<br>

## 우선 재렌더링이 느린 컴포넌트 만들어보기

```js
import {useState} from 'react'

let a = new Array(10000).fill(0)

function App(){
  let [name, setName] = useState('')
  
  return (
    <div>
      <input onChange={ (e)=>{ setName(e.target.value) }}/>
      {
        a.map(()=>{
          return <div>{name}</div>
        })
      }
    </div>
  )
}
```
- 데이터가 1만개 들어있는 array 하나 만들고
- 그 개수만큼 `div` 생성하라고 했습니다.
- 그리고 유저가 타이핑할 수 있는 `input` 도 만들어봤습니다.

유저가 `input`에 타이핑하면 그 글자를 `div` 1만개 안에 집어넣어줘야 하는데 <br>
`div` 1만개 렌더링해주느라 `input` 도 많은 지연시간이 발생합니다.
<br>
타이핑 한 결과가 바로바로 반응이 안옵니다.

<br>

## useTransition 쓰면

```js
import {useState, useTransition} from 'react'

let a = new Array(10000).fill(0)

function App(){
  let [name, setName] = useState('')
  let [isPending, startTransition] = useTransition()
  
  return (
    <div>
      <input onChange={ (e)=>{ 
        startTransition(()=>{
          setName(e.target.value) 
        })
      }}/>

      {
        a.map(()=>{
          return <div>{name}</div>
        })
      }
    </div>
  )
}
```
- useTransition 쓰면 그 자리에 [변수,함수] 가 남습니다.
- 그 중 우측에있는 startTransition() 함수로 state 변경함수 같은걸 묶으면 **그걸 다른 코드들보다 나중에 처리해줍니다.**

그래서 `input` 타이핑 같이 즉각 반응해야하는걸 우선적으로 처리해줄 수 있습니다. <br>
타이핑해보면 아까보다 반응속도가 훨씬 낫습니다.

<br>

물론 근본적인 성능개선이라기 보단 특정 코드의 실행시점을 뒤로 옮겨주는 것일 뿐입니다.

<br>

## isPending 은 어디다 쓰냐면

startTransition() 으로 감싼 코드가 처리중일 때 true로 변하는 변수입니다.

```js
{
  isPending ? "로딩중기다리셈" :
  a.map(()=>{
    return <div>{name}</div>
  })
} 
```
그래서 이런 식으로 코드짜는 것도 가능합니다. <br>
위의 코드는 useTransition 으로 감싼게 처리완료되면 `div` 이게 보이겠군요.

<br>

## useDeferredValue 이것도 비슷함

startTransition() 이거랑 똑같습니다. <br>
근데 얘는 state 아니면 변수 하나를 집어넣을 수 있게 되어있습니다. <br>
그래서 그 변수에 변동사항이 생기면 그걸 늦게 처리해줍니다.

```js
import {useState, useTransition, useDeferredValue} from 'react'

let a = new Array(10000).fill(0)

function App(){
  let [name, setName] = useState('')
  let state1 = useDeferredValue(name)
  
  return (
    <div>
      <input onChange={ (e)=>{ 
          setName(e.target.value) 
      }}/>

      {
        a.map(()=>{
          return <div>{state1}</div>
        })
      }
    </div>
  )
}
```
이렇게 쓰면 아까랑 똑같은 기능을 개발가능합니다.

- useDeferredValue 안에 state를 집어넣으면 그 state가 변동사항이 생겼을 때 나중에 처리해줍니다. 그리고 처리결과는 let state에 저장해줍니다.
