# state 변경함수 사용할 때 주의점 : async

## 자바스크립트 sync / async 관련 상식

자바스크립트는 일반적인 코드를 작성하면 synchronous 하게 처리됩니다. 번역하면 동기방식 이런데.. <br>
코드 적은 순서대로 윗줄부터 차례로 코드가 실행된다는 뜻입니다. <br>
실은 거의 모든 프로그래밍 언어들은 무조건 위에서부터 한줄한줄 실행됩니다.

예를 들어

```js
console.log(1+1)
console.log(1+2)
console.log(1+3)
```
이런 코드는 그냥 위에서부터 한줄한줄 잘 실행됩니다. 그니까 콘솔 창에 2,3,4 순으로 출력된다는 소리입니다.

<br>

자바스크립트는 이상한 함수들을 사용하면 asynchronous 하게 코드 실행이 가능합니다. 번역하면 비동기적인데 <br>
ajax , 이벤트리스너 , setTimeout 이런 함수들을 쓸 때 그런 현상이 일어납니다.<br>
이런 함수들은 처리시간이 오래걸립니다. ajax로 예를 들면 인터넷 상황이 안좋으면 코드 실행이 오래걸리겠죠? <br>
그래서 ajax 요청하는 코드들은 순차적으로 실행되지 않고 **완료되면 실행됩니다.** <br>

예를들어
```js
console.log(1+1)
axios로 get요청하고나서 console.log(1+2) 실행해주셈~
console.log(1+3)
```
이런 코드는 2,4가 바로 출력되고 그 다음에 3이 출력됩니다. <br>
3을 출력하는 코드가 async 처리를 지원하는 코드라 그렇습니다. <br>
3을 출력할 때 오래걸리면 완료될 때까지 잠깐 보류했다가 다른 코드를 먼저 실행시킨다는 소리입니다. <br>
심지어 ajax 요청이 0.00초 걸려도 2,4가 먼저, 그 다음 3이 출력됩니다. <br>
물리적으로 잠깐 처리가 보류되어서 그렇습니다. <br>
자바스크립트라는 언어의 특징이자 장점이라고 볼 수 있겠습니다.

(asynchronous 처리를 지원하는 함수들을 써야 이런식으로 동작합니다)

<br><br>

## 리액트의 setState 함수 특징

리액트로 state 만들땐 이렇게 합니다.
```js
function App(){
  let [name, setName] = useState('kim')
}
```
그리고 이제 setName을 사용하시면 name이라는 state를 자유롭게 변경가능합니다. <br>
`setName('park')` 이런식으로 하면 변경된다는 겁니다. <br>
근데 문제는 setName() 같은 state 변경함수들은 **전부 비동기적으로 처리됩니다.** <br>
그니까 setName()이 오래걸리면 이거 제껴두고 다른 밑에 있는 코드들부터 실행한다는 겁니다. <br>
그래서 뭔가 예상치 못한 문제가 생길 수 있습니다.

<br>

## 예제 : 버튼을 누르면 2개 기능을 순차적으로 실행하고 싶습니다.

```js
unction App(){
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);

  return (
    <div>
      <div>안녕하십니까 전 {age}</div>
      <button>누르면한살먹기</button>
    </div>
  )
}
```
버튼을 누를 때마다 <br>
1. count 라는 state를 +1 해야합니다. (버튼 누른 횟수 기록용)
2. age라는 state도 +1 해야합니다.
3. 근데 count 가 3 이상이면 더 이상 age 라는 state를 1 더하지 말도록 코드를 짜보세요.

버튼 3번 이상 누르면 (count가 3이상이면) 나이를 그만 더하라는 기능입니다. 그니까 22살에서 멈춰야합니다.

<br>

근데 23까지 증가합니다. 뭔가 이상하죠. <br>
분명 count가 2일때까지만 age + 1 해주라고 했습니다. <br>
count가 1일 때 age + 1 <br>
count가 2일 때 age + 1 <br>
count가 3일 때 age + 1 하지마 이런 코드니까요. <br>
근데 지금은 count가 3일때도 age + 1를 해주고 있습니다. 왜그럴까요.

<br>

이유는 위에서 제가 말한 async 라는 특징 때문에 그렇습니다. <br>
**state 변경함수는 async 하게 처리되는 함수기 때문에** 완료되기까지 시간이 오래걸리면 제쳐두고 다음 코드를 실행해줍니다. <br>
그래서 코드를 해석해보자면

1. 버튼을 세번째 누르면 setCount(count+1) 이걸 실행해서 count를 3 만들어줍니다.
2. 근데 count를 3으로 만드는건 **오래 걸리니까 제껴두고** if (count < 3) 이걸 실행합니다.
3. 이 때 count는 아직 2라서 if문 안의 setAge(age +1) 이 잘 동작하고 있는겁니다.

<br>

이 모든문제는 setCount() 가 async 함수라서 그렇습니다. <br>
async 함수는 오래걸리면 제껴두고 다음줄 코드부터 실행하니까 그렇습니다.

<br>

그래서 저렇게 **state1 변경하고나서 state2를 변경하는 코드를 작성할 땐** 가끔 문제가 생깁니다. <br>
이걸 정호가히 sync스럽게, 순차적으로 실행하고 싶을 때 해결책은 useEffect 입니다. <br>
useEffect를 잘 작성하면 특정 state가 변경될 때 useEffect를 실행할 수 있다고 했었죠?

<br>

## 해결

App 컴포넌트 안에 useEffect를 만듭니다.

```js
useEffect(()=>{
    
}, [count]) 
```
useEffect는 컴포넌트가 렌더링/재렌더링될 때 실행되는 함수랬습니다. <br>
근데 뒤에다가 [] 대괄호안에 state 집어넣으면 <br>
**state가 변경되면 이 코드 실행해주세요~** 라는 뜻으로 사용가능합니다. <br>
그래서 이거 쓰면 아까 말했던 문제를 해결할 수 있습니다.

1. count 라는 state가 변경되고 나서
2. age도 변경해주세요~

이런식으로 순차적으로 실행이 가능합니다.

<br>

```js
<button onClick={()=>{

  setCount(count+1);

}}>누르면한살먹기</button> 
```
그래서 일단 버튼을 이렇게 count + 1만 되게 바꿉니다.

<br>

```js
useEffect(()=>{
  if ( count < 3 ) {
    setAge(age+1)
  }
 }, [count]) 
```
그 다음 나머지 age + 1하는 코드는 useEffect 안에 개발해놨습니다. <br>
그러면 useEffect는 count 라는 state가 변경되고나서 실행되며 <br>
그럼 if문으로 count라는 state 값을 제대로 의도대로 측정할 수 있습니다.

<br>

근데 문제는 useEffect가 저렇게 써도 처음 페이지 로드될 때도 한번 실행이 되기 때문에 의도치 않은 버그가 발생할 수 있습니다. <br>
그래서 처음 페이지 로드 시 useEffect 실행을 막아야합니다. <br>
아니면 count라는 state를 활용해서 count가 0일 때는 내부 코드를 동작시키지 않으면 될듯 하네요.

```js
useEffect(()=>{
  if ( count != 0 && count < 3 ) {
    setAge(age+1)
  }
 }, [count]) 
```
count가 0이 아닐때만 실행하라고 조건을 추가하면 이제 버튼 누르면 22살까지만 잘 증가합니다.