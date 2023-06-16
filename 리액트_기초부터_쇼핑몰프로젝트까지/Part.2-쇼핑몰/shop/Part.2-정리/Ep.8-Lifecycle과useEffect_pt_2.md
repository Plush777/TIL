# Lifecycle과 useEffect 2

## useEffect에 넣을 수 있는 실행조건

```js
useEffect(() => {
    실행할코드;
}, [count]);
```

useEffect의 둘째 파라미터로 [] 를 넣을 수 있는데 <br>
거기에 변수나 state 같은 것들을 넣을 수 있습니다. <br>
그렇게 하면 **[]에 있는 변수나 state가 변할때만** useEffect 안의 코드를 실행해줍니다. <br>
그래서 위의 코드는 count 라는 변수가 변할 때만 useEffect 안의 코드가 실행되겠네요. <br>

+[] 안에 state 여러개 넣을 수 있음

<br>

```js
useEffect(() => {
    실행할코드;
}, []);
```

아무것도 안넣으면 컴포넌트 mount (로드) 시 1회 실행하고 영영 실행해주지 않습니다. <br>

## clean up function

useEffect 동작하기 전에 특정 코드 실행하고 싶으면 <br>
`return() => { }` 안에 넣을 수 있습니다.

```js
useEffect(()=>{
  그 다음 실행됨
  return ()=>{
    여기있는게 먼저실행됨
  }
}, [count])
```

그럼 useEffect 안에 있는 코드를 실행하기 전에 <br>
`return ()=> { }` 안에있는 코드를 실행해줍니다. <br>
이 기능이 왜있냐구요?

<br>

복잡하고 어려운 숙제같은거 할 때 <br>
책상을 싹 치우고 하면 잘 되는 것처럼 <br>
useEffect 안에 있는 코드를 실행 할 때도 <br>
싹 치우고 깔끔한 마음으로 실행하는게 좋을 때가 있습니다. <br>

예를 들면 setTimeout() 쓸때마다 브라우저 안에 타이머가 하나 생깁니다. <br>
근데 useEffect 안에 썼기 때문에 컴포넌트가 mount 될 때마다 실행 되겠죠. <br>
그럼 코드 잘못 짜면 타이머가 100개 1000개 생길 수도 있겠네요. <br>

나중에 그런 버그를 방지하고 싶으면 useEffect에서 타이머 만들기 전에 기존 타이머를 싹 제거하라고 코드를 짜면 되는데 <br>

그런거 짤 때 `return ()=>{ }` 안에 짜면 됩니다.

<br>

```js
useEffect(() => {
    let a = setTimeout(() => {
        setAlert(false);
    }, 2000);
    return () => {
        clearTimeout(a);
    };
}, []);
```

타이머 제거하고 싶으면 clearTimeout(타이머) <br>
이렇게 코드짜면 됩니다. <br>
그래서 이렇게 하면 좀 더 안전한 코드가 되겠네요. 타이머 장착 하기 전에 기존 타이머가 있으면 제거해줍니다.

<br>

+clean up function에는 타이머제거, socket 연결요청제거, ajax 요청 중단 이런 코드를 많이 작성합니다. <br> +컴포넌트 unmount 시에도 clean up function 안에 있던게 1회 실행됩니다.

<br><br>

## 정리하자면

```js
useEffect(() => {
    실행할코드;
});
```

이러면 재 렌더링마다 코드를 실행합니다.

<br>

```js
useEffect(() => {
    실행할코드;
}, []);
```

이러면 컴포넌트 마운트 시 1회만 실행합니다.

<br>

```js
useEffect(() => {
    return () => {
        실행할코드;
    };
});
```

이러면 useEffect 코드 실행 전에 return 안에 있는 코드가 먼저 실행됩니다.

<br>

```js
useEffect(() => {
    return () => {
        실행할코드;
    };
}, []);
```

이러면 컴포넌트 언마운트 시 1회 실행됩니다.

<br>

```js
useEffect(() => {
    실행할코드;
}, [state1]);
```

이러면 state1이 변경될 때만 실행됩니다.
