# Redux 5 : 장바구니 기능 만들기 숙제

## 숙제 1. 수량 +1 만들기

버튼 누르면 일단 state 수정해야하니까 state + 1 함수부터 만들었습니다.

```js
let cart = createSlice({
    name: 'cart',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 },
    ],
    reducers: {
        addCount(state, action) {
            state[action.payload].count++;
        },
    },
});
```

addCount 라는 함수 만들어놨습니다. <br>
addCount(0) 하면 0번째 상품이 + 1됩니다. <br>
addCount(1) 하면 1번째 상품이 +1 됩니다.

<br>

```js
(Cart.js)

<tbody>
  {
    state.cart.map((a, i)=>
      <tr key={i}>
        <td>{state.cart[i].id}</td>
        <td>{state.cart[i].name}</td>
        <td>{state.cart[i].count}</td>
        <td>
          <button onClick={()=>{ dispatch(addCount(i)) }}>+</button>
        </td>
      </tr>
     )
   }
</tbody>
```

장바구니 페이지에 있는 + 버튼 누르면 addCount() 하라고 코드 짰습니다. <br>
근데 addCount(i) 이렇게 i 변수를 넣어봤는데 이러면 <br>
0번째 버튼을 누르면 addCount(0) 실행해줍니다. <br>
1번째 버튼을 누르면 addCount(1) 실행해줍니다.

<br>

## 근데 좀 정확히 하고 싶으면

버튼 누르면 버튼 옆에 있는 상품 id 가져와서 이거랑 똑같은 id를 가진 상품을 state에 찾아서 그걸 +1 해주세요 라고 코드 짜는게 더 확실할 것 같군요. <br>

그럼 나중에 상품 순서가 이상하게 바뀌거나 그래도 잘 동작할듯 하니까요.

<br>

```js
dispatch(addCount(state.cart[i].id));
```

그래서 버튼 누르면 이렇게 옆에있던 상품 id를 payload로 전송하라고 해놨고

<br>

```js
let cart = createSlice({
    name: 'cart',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 },
    ],
    reducers: {
        addCount(state, action) {
            let 번호 = state.findIndex((a) => {
                return a.id === action.payload;
            });
            state[번호].count++;
        },
    },
});
```

payload와 같은 id를 가진 상품을 찾아서 +1 해주세요 라고 코드 짰습니다. <br>
array 자료에서 원하는 항목을 찾으려면 반복문 , find , findIndex 이런거 골라서 쓰면 됩니다.

<br>

findIndex() 는 array 뒤에 붙일 수 있는데

-   안에 콜백함수 넣고 return 뒤에 조건식도 넣으면 됩니다.
-   a 라는 파라미터는 array 안에 있던 하나하나의 자료입니다.
-   array에 있던 자료를 다 꺼내서 조건식에 대입해보는데 조건식이 참이면 그게 몇번째 자료인지 알려줍니다.

그래서 위의 코드는 a.id와 payload가 같으면 그게 몇번째 자료인지 변수에 저장하라는 소리입니다.

<br>

## 숙제2. 주문버튼 누르면 state에 새로운 상품 추가

상세페이지의 주문하기 버튼을 누르면 <br>
장바구니 state에 항목이 하나 추가되어야 합니다. <br>
이것도 state 변경함수 만들고 export 하고 import해서 사용합니다.

```js
let cart = createSlice({
    name: 'cart',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 },
    ],
    reducers: {
        addCount(state, action) {
            state[action.payload].count++;
        },
        addItem(state, action) {
            state.push(action.payload);
        },
    },
});
```

addItem 이라고 함수 만들어놨습니다. <br>
`addItem( {id : 2, name : 'Grey Yordan', count : 1} )` 이렇게 사용하면 `{id : 2, name : 'Grey Yordan', count : 1} ` 이 상품이 state에 추가됩니다.

<br>

```js
(Detail.js)

<div className="col-md-6">
  <h4 className="pt-5">{찾은상품.title}</h4>
  <p>{찾은상품.content}</p>
  <p>{찾은상품.price}원</p>
  <button className="btn btn-danger" onClick={()=>{
    dispatch(addItem( {id : 1, name : 'Red Knit', count : 1} ))
  }}>주문하기</button>
  </div>
</div>
```

상세페이지에서 주문 버튼 누르면 addItem() 이거 실행해달라고 짰습니다. <br>

그럼 이제 버튼 누를 때 ` {id : 1, name : 'Red Knit', count : 1}` 이런 상품이 추가됩니다.
