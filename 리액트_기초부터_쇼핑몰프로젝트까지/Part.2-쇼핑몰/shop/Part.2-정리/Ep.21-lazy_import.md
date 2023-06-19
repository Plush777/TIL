# 개발자도구 & lazy import

## 크롬 확장프로그램 : React Developer Tools

설치 시 개발자 도구에 Compotents 탭이 생기는데 <br>
개발 중인 리액트 사이트를 컴포넌트로 미리 볼 수 있습니다.

<br>

![image](https://user-images.githubusercontent.com/87457620/189123752-ec754cd2-1779-449b-b352-e2901e5ff1c2.png)

왼쪽에서 컴포넌트 구조 파악이 가능하고 <br>
왼쪽 상단 아이콘 눌러서 컴포넌트 찍어보면 <br>
거기 있는 state , props 이런거 조회 가능합니다.

<br>

## Profiler 탭에서 성능평가 가능

![image](https://user-images.githubusercontent.com/87457620/189123921-6295b22f-02cb-4259-96f6-6ea9f0deb7fe.png)

Profiler 탭 들어가서

-   녹화버튼 누르고
-   페이지 이동이나 버튼조작을 해보고
-   녹화를 끝내면

방금 렌더링 된 모든 컴포넌트의 렌더링 시간을 측정해줍니다.

<br>

이상하게 느린 컴포넌트가 있다면 여기서 범인을 찾을 수 있습니다.

<br><br>

## lazy import

리액트 코드 다 짰으면 npm run build 입력해서 <br>
짰던 코드들을 html css js 로 변환해야합니다. <br>
근데 리액트로 만드는 SPA 특징은 html,js 파일이 하나만 생성됩니다. <br>
그 안에 지금까지 만든 App / Detail / Cart 모든 내용이 들어있어서 파일 사이즈가 좀 큽ㄴ니다. <br>
그래서 리액트 사이트들은 첫 로딩이 매우 느릴 수 있습니다.

<br>

그게 싫다면 js 파일을 잘게 쪼개면 됩니다. <br>
쪼개는 방법은 import 문법을 약간 고치면 되는데 <br>
지금 메인페이지 보면 Detail , Cart 를 import 해서 쓰고 있습니다. <br>

근데 잘 생각해보면 Detail , Cart 컴포넌트는 메인 페이지에서 전혀 보이지 않고 있기 때문에 <br>
이런건 아래처럼 import 해놓으면 좋습니다.

```js
App.js;

import Detail from './routes/Detail.js';
import Cart from './routes/Cart.js';
```

```js
App.js;
import { lazy, Suspense, useEffect, useState } from 'react';

const Detail = lazy(() => import('./routes/Detail.js'));
const Cart = lazy(() => import('./routes/Cart.js'));
```

이렇게 바꾸라는 소리입니다. <br>
lazy 문법으로도 똑같이 import 가 가능한데 이 경우엔 <br>
Detail 컴포넌트가 필요해지면 import 해주세요 라는 뜻이 됩니다. <br>
그리고 이렇게 해놓으면 Detail 컴포넌트 내용을 다른 js 파일로 쪼개줍니다.

<br>

```js
<Suspense fallback={<div>로딩중임</div>}>
    <Detail shoes={shoes} />
</Suspense>
```

lazy 사용하면 당연히 Detail 컴포넌트 로드까지 지연시간이 발생할 수 있습니다. 그럴 땐

1. Suspense 라는거 import 해오고
2. Detail 컴포넌트 감싸면

Detail 컴포넌트가 로딩 중일 때 대신 보여줄 html 작성도 가능합니다. <br>
귀찮으면 Routes 전체 감싸도 됩니다.

https://www.daleseo.com/react-suspense/
