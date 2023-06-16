# Redux 4 : state 가 object/array 일경우 변경하는 법

## redux state가 array/object 인경우 변경하려면

대충 `{name: 'kim',age: 20}` 이렇게 생긴 자료를 state로 만들어봅시다. <br>
근데 저기서 kim -> park 이렇게 변경하고 싶으면 변경함수를 어떻게 만들어야할까요.

```js
let user = createSlice({
    name: 'user',
    initialState: { name: 'kim', age: 20 },
    reducers: {
        changeName(state) {
            return { name: 'park', age: 20 };
        },
    },
});
```

당연히 저렇게 쓰면 changeName() 사용시 변경됩니다. <br>
return 오른쪽에 적은걸로 기존 state를 갈아치워주니까요. <br>

```js
let user = createSlice({
    name: 'user',
    initialState: { name: 'kim', age: 20 },
    reducers: {
        changeName(state) {
            state.name = 'park';
        },
    },
});
```

근데 state를 직접 수정하라고 해도 변경 잘 됩니다. <br>
state를 직접 수정하는 문법을 사용해도 잘 변경되는 이유는 <br>
Immer.js 라이브러리가 state 사본을 하나 더 생성해준 덕분인데 Redux 설치하면 딸려와서 그렇습니다. <br>

그래서 결론은 array/object 자료의 경우 state 변경은 <br>
state를 직접 수정해버려도 잘 되니까 직접 수정하세요. <br>

+그래서 state 만들 때 문자나 숫자 하나만 필요해도 redux에선 일부러 object 아니면 array에 담는 경우도 있습니다. <br>
수정이 편리해지니까요.

<br>

## state 변경함수가 여러개 필요하면

+10 하고 가끔은 +100 하고 싶으면 어떻게하죠 <br>
+10 하는 함수 만들고 <br>
+100 하는 함수 만들고 <br>
그렇게 여러개를 미리 만들어놔도 되는데 <br>
근데 함수는 **파라미터 문법** 이용하면 비슷한 함수 여러개 만들 필요가 없다고 했습니다. <br>
state 변경함수에도 파라미터 문법 사용가능함

```js
let user = createSlice({
    name: 'user',
    initialState: { name: 'kim', age: 20 },
    reducers: {
        increase(state, a) {
            state.age += a.payload;
        },
    },
});
```

state 변경함수의 둘째 파라미터를 작명하면 이제 <br>
increase(10)<br>
increase(100) <br>
이런 식으로 파라미터 입력을 해서 함수 사용이 가능합니다. <br>
파라미터 자리에 넣은 자료들은 a.payload 하면 나옵니다.
<br>

그래서 위처럼 작성하면 <br>
increase(10) 이거 실행하면 +10 됩니다. <br>
increase(100) 이거 실행하면 +100 됩니다. <br>
여기서도 파라미터 문법 이용하면 비슷한 함숟르은 여러개 만들 필요가 없습니다.

<br>

(참고)

-   a 말고 action 이런식으로 작명 많이 합니다.
-   action.type 하면 state 변경함수 이름이 나오고
-   action.payload하면 파라미터가 나옵니다.
