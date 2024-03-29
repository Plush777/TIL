# 서버로 ajax 요청하는 더보기 버튼 만들기

강의에서 사용할 URL : https://codingapple1.github.io/vue/more0.json

여기로 GET요청하면 더보기용 게시물을 하나 줍니다. 

<br/>

## 일단 서버가 뭐냐면 

서버는 그냥 요청하면 데이터주는 간단한 프로그램일 뿐입니다.

예를 들어 네이버 웹툰 서버는 뭐겠습니까. 웹툰 달라고 하면 주는 프로그램일 뿐입니다. 

 

근데 서버에게 데이터를 요청하려면 GET 요청 / POST 요청 이라는 방법을 꼭 써야합니다.

GET은 데이터를 가져올 때 사용하며 서버가 요구하는 URL을 적어야합니다. 

POST는 서버로 데이터를 보낼 때 사용하고 역시 서버가 요구하는 URL을 적어야합니다. 

 

그래서 우리도 더보기 버튼을 누르면 서버로 추가 게시물을 요청할건데

제가 임시로 서버를 하나 만들어왔습니다. 

위에 적은 URL로 GET 요청을 하면 추가 게시물을 보내줍니다. 

그게 제가 만든 서버 전부임 

<br/>

## Ajax 요청을 하려면 axios를 씁시다

fetch라는 자바스크립트 기본함수를 써도 되는데 호환성 때문에 

axios를 자주 쓰게 될 것입니다. 

빨리 터미널 켜서 npm install axios를 입력합시다.

뭔가 안되면 yarn 있으면 yarn add axios를 입력합시다.

(미리보기 띄우던 터미널은 끄고 설치하시길 바랍니다)

```js
import axios from 'axios';

axios.get('서버URL').then( 결과 => {
  GET요청 성공시 실행할 코드~~
  console.log(결과);
})
```
이렇게 쓰면 원하는 URL로 GET요청을 할 수 있습니다.

그리고 .then() 안에 function(){} 콜백함수를 추가해주면 되는데

그 안에는 GET요청 성공시 실행할 코드를 적으시면 됩니다. 

GET요청으로 가져온 데이터는 저기 그 결과라는 파라미터에 담겨있습니다.

<br/>

```js
import axios from 'axios';

axios.get('서버URL').then( 결과 => {
  GET요청 성공시 실행할 코드~~
}).catch( ()=>{
  실패시 실행할 코드
})
```
ajax요청이 실패시 특정 코드를 실행하고 싶으면 .catch 안에 적으면 됩니다.

URL을 잘못 쓰거나 서버가 다운되거나 그러면 ajax 요청이 실패할 수 있습니다.  

```js
import axios from 'axios';

axios.post('서버URL', '보낼데이터').then( 결과 => {
  POST요청 성공시 실행할 코드~~
}).catch( ()=>{
  실패시 실행할 코드
})
```
POST 요청을 보낼 수도 있습니다.

POST 요청은 서버로 원하는 데이터를 전송할 수 있습니다. 문자, object 다 가능합니다.

<br/>

아무튼 제가 만들어놓은 서버로 GET 요청을 하셔서 게시물을 하나 더 가져와보시길 바랍니다.

그리고 가져온 그걸로 `<Post>`를 하나 더 생성해주면 되겠습니다.

`<Post>`를 하나 더 생성 어떻게 하냐고요?

`<Post>`는 반복문 돌려놨던 기억이 납니다. 게시물이라는 데이터 갯수만큼 반복문 돌려서 생성하라고 해놨는데

그럼 여러분이 코드로 짜야할 것은 "`<Post>`라는 HTML 하나 추가해주세요~"가 아니라

"게시물 데이터를 하나 증가시켜주세요~" 입니다.

Vue는 항상 데이터중심적으로 개발합니다. 

<br/>

버튼을 한번 더 누르면 두번째 게시물을 가져와서 보여주도록 코드를 짜오십시오.

https://codingapple1.github.io/vue/more1.json으로 GET 요청하면 둘째 게시물을 줍니다. 

<br/>

그냥 버튼을 한번 누르면 more0.json

두번 누르면 more1.json으로 요청을 하라고 코드를 짰습니다.

근데 그러려면 당연히 버튼 누른 횟수를 어디다 기록해둬야하지 않을까요?

그래서 데이터로 만들어서 적어뒀습니다. 

```js
data(){
    return {
        게시물 : postdata,
        더보기 : 0,
    }
}, 
```

그 다음 more() 함수를 이렇게 바꿨습니다. 

```js
more(){
      axios.get(`https://codingapple1.github.io/vue/more${this.더보기}.json`)
      .then( 결과 => {
        this.게시물.push(결과.data);
        this.더보기++;
      })
 } 
```
더보기라는 데이터가 0이면 more0.json

더보기라는 데이터가 1이면 more1.json 이런 URL로 GET요청하라고 써놨고

ajax요청 성공시 더보기라는 데이터를 ++ 해버렸다고 합니다. 

끝!