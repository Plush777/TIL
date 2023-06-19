# 장바구니 페이지 만들기 & Redux 1 : Redux Toolkit 설치

## 장바구니 페이지 만들기

App.js가서 장바구니 페이지 만들기위해 라우터를 사용합니다.

```js
<Route path="/cart" element={<Cart />} />
```

`<Route>` 하나 추가해서 누가 /cart로 접속하면 해당 컴포넌트를 보여주도록 코드를 짰습니다.

<br>

## Redux 쓰면 뭐가 좋냐면

Redux는 props 없이 state를 공유할 수 있게 도와주는 라이브러리입니다.

![image](https://user-images.githubusercontent.com/87457620/188152893-919f6dfd-a29a-4fda-a4b9-8c13a78a9cbf.png)

이거 설치하면 js 파일 하나에 state를 보관할 수 있는데 <br>
그걸 모든 컴포넌트가 직접 꺼내쓸 수 있습니다. <br>
그래서 귀찮은 props 전송이 필요없어집니다. <br>
컴포넌트가 많아질수록 좋겠군요. <br>

그래서 사이트가 커지면 쓸 수 밖에 없어서 <br>
개발자 구인 시에도 redux같은 라이브러리 숙련도를 대부분 요구합니다.

<br>

## Redux 설치는

```bash
npm install @reduxjs/toolkit react-redux
```

터미널에 입력합니다. <br>
참고로 redux toolkit 이라는 라이브러리를 설치할건데 redux의 개선 버전이라고 보면됩니다.

<br>

근데 설치 전에 package.json 열어서 react , react-dom 항목의 버전을 확인합니다. <br>

둘 다 18.1.x 이상이면 사용가능합니다.

<br>

## redux 세팅은

```js
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
    reducer: {},
});
```

아무데나 store.js 파일 만들어서 위 코드 복붙합니다. <br>
이게 뭐냐면 아까 말했던 state 들을 보관하는 파일입니다.

<br>

```js
import { Provider } from 'react-redux';
import store from './store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
```

index.js 가서 Provider 라는 컴포넌트와 아까 작성한 파일을 improt 해옵니다. <br>
그리고 밑에 `<Provider store={import해온거}>` 이걸로 App을 감싸면 됩니다. <br>
그럼 이제 App과 그 모든 자식 컴포넌트들은 store.js에 있던 state를 맘대로 꺼내쓸 수 있습니다.
