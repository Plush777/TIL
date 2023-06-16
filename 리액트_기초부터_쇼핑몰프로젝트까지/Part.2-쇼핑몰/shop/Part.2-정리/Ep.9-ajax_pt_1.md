# 리액트에서 서버와 통신하려면 ajax 1

## 서버란?

유저가 데이터 달라고 요청 하면 데이터를 보내주는 간단한 프로그램일 뿐입니다. <br>

네이버웹툰 서버 : 유저가 웹툰 달라고 하면 웹툰 보내주는 프로그램 <br>
유튜브 서버 : 유저가 영상 달라고 하면 영상 보내주는 프로그램 입니다. <br>

유저가 그냥 데이터 달라고 떼쓰면 서버가 보내주진 않습니다. <br>
서버에 데이터를 요청할 때는 정확한 규격에 맞춰서 요청해야하는데 <br>

1. 어떤 데이터인지 (url)
2. 어떤 방법으로 요청할지 (GET or POST)

잘 기재해야 데이터를 보내줍니다.

<br>

데이터를 가져올 땐 보통 GET 고르면 되고 <br>
데이터를 서버로 보낼 때는 POST 고르면 됩니다. <br>

그리고 어떤 데이터를 보고싶은지 URL만 잘 기재하면 되는데 <br>

예를 들어서 쇼미더럭키짱이라는 네이버웹툰을 보고싶으면 <br>
https://comic.naver.com/webtoon/list?titleId=783054 여기 URL로 GET요청하면 보내줍니다. <br>

독립일기라는 네이버 웹툰을 보고 싶으면 <br>
https://comic.naver.com/webtoon/list?titleId=748105 여기 URL로 GET요청하면 보내줍니다. <br>

url 어떻게 알았냐구요? <br>
url이 기재된 html 페이지 찾아보면 됩니다.

<br>

## GET/POST 요청하는법

get 요청 날리고 싶으면 가장 쉬운 방법은 브라우저 주소창입니다. <br>

거기에 url 아무거나 적으면 그 곳으로 GET 요청 날려줍니다. <br>

POST 요청 날리고 싶으면 <br>
`<form action="요청할url" method="post">` 태그 이용하면 됩니다. <br>
그럼 폼이 전송되었을 때 POST 요청 날려줍니다. <br>
근데 GET , POST 요청을 저렇게 날리면 단점이 **브라우저가 새로고침** 됩니다.

<br>

## AJAX란?

서버에 GET,POST 요청을 할 때 새로고침 없이 데이터를 주고받을 수 있게 해주는 <br>
간단한 브라우저 기능을 AJAX 라고 합니다. <br>
그거쓰면 새로고침 없이도 쇼핑몰 상품을 더 가져올 수도 있고 <br>
새로고침 없이도 댓글을 서버로 전송할 수도 있고 그럽니다.

<br>

AJAX로 GET/POST 요청하려면 방법 3개중 택 1 하면 됩니다.

1. XMLHttpRequest 라는 옛날 문법 쓰기
2. fetch() 쓰기
3. axios 같은 외부 라이브러리 쓰기

3번이 가장 편하니 3번을 해보겠습니다. <br>

`npm install axios` 로 라이브러리 설치합니다.

<br>

## AJAX 요청하는 법

버튼 누르면 서버에 AJAX 요청을 해봅시다. <br>
https://codingapple1.github.io/shop/data2.json 이 URL로 GET요청을 하면 상품 3개를 가져와줍니다.

```js
import axios from 'axios';

function App() {
    return (
        <button
            onClick={() => {
                axios
                    .get('https://codingapple1.github.io/shop/data2.json')
                    .then((결과) => {
                        console.log(결과.data);
                    })
                    .catch(() => {
                        console.log('실패함');
                    });
            }}
        >
            버튼
        </button>
    );
}
```

1. axios 쓰려면 상단에서 import 하고
2. axios.get(url) 이러면 그 url로 GET요청이 됩니다.
3. 데이터 가져온 결과는 결과.data 안에 들어있습니다.

그래서 위의 버튼 누르면 서버에서 가져온 데이터가 콘솔창에 출력됩니다.

4. 인터넷이 안되거나 url이 이상하면 실패하는데 실패 시 실행할 코드는 `.catch()` 안에 적으면 됩니다.
