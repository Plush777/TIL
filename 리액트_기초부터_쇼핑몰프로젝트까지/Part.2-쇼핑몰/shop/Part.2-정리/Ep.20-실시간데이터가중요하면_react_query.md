# 실시간 데이터가 중요하면 react-query

설치

```
npm install @tanstack/react-query
```

<br>

import

```
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
```

<br>

useQuery 작명

```js
useQuery(['작명'],
```

<br>

ajax 요청 하다보면 이런 기능들이 가끔 필요해집니다. <br>

-   몇초마다 자동으로 데이터 다시 가져오게 하려면?
-   요청 실패 시 몇초 간격으로 재시도?
-   다음 페이지 미리 가져오기?
-   ajax 성공/실패 시 각각 다른 html을 보여주려면?

직접 개발해도 되겠지만 react-query 라는 라이브러리 설치해서 써도 됩니다. <br>
SNS , 코인거래소 같은 실시간 데이터를 보여줘야하는 사이트들이 쓰면 유용하고 나머지는 딱히 쓸데는 없습니다. <br>

## react-query 설치 및 셋팅

```js
import { QueryClient, QueryClientProvider } from 'react-query'; //1번
const queryClient = new QueryClient(); //2번

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>
        {' '}
        //3번
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </QueryClientProvider>
);
```

<br>

## react-query 로 ajax 요청하는법

그냥 ajax 요청해도 되는데 <br>
react-query 써서 ajax 요청 날리면 더 편리한 기능을 제공합니다.

```js
function App() {
    let result = useQuery('작명', () =>
        axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
            return a.data;
        })
    );
}
```

useQuery 라는걸 상단에서 import 하고 <br>
`useQuery()` 로 ajax 요청을 감싸면 됩니다.

<br><br>

## 장점 1. ajax 요청 성공/실패/로딩 중 상태를 쉽게 파악할 수 있습니다.

```js
function App() {
    let result = useQuery('작명', () =>
        axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
            return a.data;
        })
    );

    return (
        <div>
            {result.isLoading && '로딩중'}
            {result.error && '에러남'}
            {result.data && result.data.name}
        </div>
    );
}
```

result 라는 변수에 ajax 현재 상태가 알아서 저장됩니다.

-   ajax 요청이 로디 중일땐 `result.isLoading` 이 true가 됩니다.
-   ajax 요청이 실패 시엔 `result.error` 가 true 가 됩니다.
-   ajax 요청이 성공 시엔 `result.data` 안에 데이터가 들어옵니다.

그래서 <br>
ajax 로딩 중일땐 이거 보여주세요~ <br>
ajax 성공 시엔 이거 보여주세요~ <br>
해줄 수 있습니다.

<br><br>

## 장점2. 틈만나면 알아서 ajax 재요청해줍니다.

페이지 체류하고나서 일정 시간이 경과하거나 <br>
남들이 다른 창으로 갔다가 다시 페이지로 돌아오거나 <br>
다시 메인페이지로 돌아가거나 <br>
이런 여러 경우에 알아서 ajax 요청을 다시 해줍니다. <br>
당연히 재요청 끄는법 , 간격 조절하는 법도 있습니다.

<br><br>

## 장점 3. 실패 시 재시도 알아서 해줌

잠깐 인터넷이 끊겼거나 서버가 죽었거나 그러면 ajax 요청이 실패합니다. <br>
실패했을 땐 얘가 4번인가 5번 정도 재시도를 알아서 해줍니다.

<br><br>

## 장점4. ajax로 가져온 결과는 state 공유 필요없음

지금 App 컴포넌트에서 유저이름 가져오는 ajax 요청을 날리고 있습니다. <br>
근데 그 유저이름 결과가 Detail 컴포넌트에도 필요하면 어쩌죠? <br>
=> 유저 이름을 props 로 전송하면 됩니다. <br>

근데 실은 props 전송 필요없습니다. <br>
Detail 컴포넌트에다가 유저이름 ajax 요청하는 코드 똑같이 또 적으면 됩니다. <br>
react-query는 스마트하기 때문에 ajax 요청이 2개나 있으면 1개만 날려주고 <br>
캐싱기능이 있기 때문에 이미 같은 ajax 요청을 한 적이 있으면 그걸 우선 가져와서 씁니다.

<br>

react-query 가 주장하는 장점은 <br>
server-state (DB 데이터) 를 프론트엔드에서 실시간 동기화 해주는걸 도와준다고 합니다. <br>
근데 ajax 요청을 몇 초마다 계속 날려서 가져오는 방식이라 좀 비효율적일 수도 있습니다. <br>
실시간으로 서버에서 데이터를 자주 보내려면 웹소켓이나 Server-sent events 같은 가벼운 방식들도 있습니다. <br>

그래서 react-query는 ajax 관련 기능개발 편하게 할 수 있는데에 의의가 더 있습니다.

<br><br>

## RTK Query 라이브러리도 있음

Redux Toolkit 설치한 경우 RTK Query 라는것도 기본적으로 사용가능한데 <br>
비슷한 기능들을 제공합니다. <br>
다만 셋팅하는 코드가 좀 더럽습니다. <br>

RTK Query는 실은 다른 용도로도 많이 쓰는데 <br>
ajax 요청후 Redux state 변경을 하고 싶다면... <br>
원래 Redux state변경함수 안에선 ajax요청하면 안되어서 컴포넌트 안에서 해야합니다. <br>
근데 ajax 요청하는 코드가 다양하고 많으면 컴포넌트 안의 코드가 길어지고 관리도 귀찮은데 <br>
그런걸 Slice 안에서 관리가능하게 도와줍니다. <br>
그리고 ajax 요청하는 코드가 100만개 있으면 그걸 편리하게 관리할 수 있게 도와줍니다.
