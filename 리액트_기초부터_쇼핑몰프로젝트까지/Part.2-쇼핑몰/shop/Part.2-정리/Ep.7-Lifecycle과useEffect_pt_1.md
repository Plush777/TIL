# Lifecycle과 useEffect 1

## 컴포넌트의 인생

컴포넌트도 인생 (Lifecycle)이 있습니다. <br>

컴포넌트는 <br>

1. 생성이 될 수도 있고 (mount)
2. 재렌더링이 될 수도 있고 (update)
3. 삭제가 될 수도 있습니다. (unmount)

컴포넌트 라이프 사이클을 알면 컴포넌트 중간중간에 코드를 실행시킬 수 있습니다.

<br>

## 인생에 간섭하는 방법

"Detail 컴포넌트 등장 전에 이것좀 해줘" <br>
"Detail 컴포넌트 사라지기 전에 이것좀 해줘" <br>
"Detail 컴포넌트 업데이트 되고나서 이것좀 해줘"<br>

이렇게 코드좀 실행해달라고 간섭할 수 있는데 <br>
간섭은 Hook (갈고리) 를 달아서 합니다. <br>

![image](https://user-images.githubusercontent.com/87457620/187029869-954f2c6a-1d00-4440-9323-785fc380333c.png)

갈고리를 달아서 코드를 넣어주면 됩니다. <br>
그럼 진짜 페이지 장착 시 , 업데이트 시 , 제거 시 코드 실행가능 <br>
저걸 Lifecycle hook 이라고 부릅니다. <br><br>

## 옛날 React에서 Lifecycle hook 쓰는법

```js
class Detail2 extends React.Component {
    componentDidMount() {
        //Detail2 컴포넌트가 로드되고나서 실행할 코드
    }
    componentDidUpdate() {
        //Detail2 컴포넌트가 업데이트 되고나서 실행할 코드
    }
    componentWillUnmount() {
        //Detail2 컴포넌트가 삭제되기전에 실행할 코드
    }
}
```

예전엔 class 문법으로 컴포넌트를 만들었습니다. <br>
안에 함수명을 저렇게 써주면 각각 특정 Lifecycle에서 코드를 실행할 수 있었습니다.

<br>

## 요즘 React

```js
import { useState, useEffect } from 'react';

function Detail() {
    useEffect(() => {
        //여기적은 코드는 컴포넌트 로드 & 업데이트 마다 실행됨
        console.log('안녕');
    });

    return 생략;
}
```

상단에서 useEffect import 해오고 <br>
콜백함수 추가해서 안에 코드 적으면 이제 그 코드는 컴포넌트가 마운트 & 업데이트 시 실행됩니다. <br>

그래서 이게 Lifecycle hook 입니다.

```js
import { useState, useEffect } from 'react';

function Detail() {
    useEffect(() => {
        //여기적은 코드는 컴포넌트 로드 & 업데이트 마다 실행됨
        console.log('안녕');
    });

    let [count, setCount] = useState(0);

    return (
        <button
            onClick={() => {
                setCount(count + 1);
            }}
        >
            버튼
        </button>
    );
}
```

버튼누르면 재렌더링 되면서 콘솔에 안녕이 찍힙니다.

<br>

## 근데 useEffect 밖에 적어도 똑같은데요

실은 useEffect 바깥에 적어도 똑같이 컴포넌트 마운트 & 업데이트 시 실행됩니다. <br>
컴포넌트가 마운트 & 업데이트 시 function 안에 있는 코드도 다시 읽고 지나가서 그렇습니다. <br>

무슨 차이가 있냐면, **useEffect 안에 적은 코드는 html 렌더링 이후에 동작합니다.** <br>

그럼 이제 useEffect가 뭔가 유용할 것 같지않나요. 예를 들어서 굉장히 시간이 오래걸리는 쓸데없는 코드가 필요하다고 가정해봅시다.

```js
function Detail(){

  (반복문 10억번 돌리는 코드)
  return (생략)
}
```

여기 적으면 반복문 돌리고 나서 하단의 html을 보여줍니다.

<br>

```js
function Detail(){

  useEffect(()=>{
    (반복문 10억번 돌리는 코드)
  });

  return (생략)
}
```

useEffect 안에 적으면 html 보여주고 나서 반복문 돌립니다.

<br>

이런 식으로 코드의 실행 시점을 조절할 수 있기 때문에 <br>
조금이라도 html 렌더링이 빠른 사이트를 원하면 <br>
쓸데없는 것들은 useEffect 안에 넣어보면 됩니다. <br>

그래서 이걸 알면 리액트 만든 사람이 이 함수를 useEffect 라고 작명한 이유도 알 수 있는데 <br>
함수 안에 이것저것 코드 짤 때 <br>
함수의 핵심기능 외에 쓸데없는 기능들을 프로그래밍 용어로 **side Effect** 라고 부릅니다. <br>

그래서 useEffect 도 거기서 따온건데 <br>
컴포넌트의 핵심 기능은 html 렌더링이라 <br>
**그거 외에 쓸데없는 기능들은 useEffect** 안에 적으라는 소리입니다. <br>
오래걸리는 반복연산 , 서버에서 데이터 가져오는 작업 , 타이머 다는거 리런건 useEffect 안에 많이 적습니다.
