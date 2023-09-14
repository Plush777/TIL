# 심심할까봐 소개하는 Nested routes & push 함수

## 오늘은 nested routes라는걸 사용해볼건데 

/detail/0/author로 접속하면 

detail 페이지 내에 작가소개란을 보여주고

/detail/0/comment로 접속하면

detail 페이지 내에 댓글란을 보여주도록 합시다. 

 

특정 페이지 내에서 또 라우트를 나누는 경우인데 이걸 nested routes라고 합니다. 

UI만드는 법으로 모달창식으로 만들어도 똑같이 구현가능하긴 한데

저렇게 다른 URL로 나눠두면 장점이 뭐겠습니까.

뒤로가기 앞으로가기 버튼이 동작함 ㄷㄷ

<br/>

이걸 구현하려면 router.js에는 이런 식으로 코드를 짭니다.

```js
const routes = [
  {
    path : '/detail/:id',
    component : Detail,
    children : [
      { path : 'author', component : Author },
      { path : 'comment', component : Comment },
    ]
  }
]
```
children 이라는 항목을 개설하면 route들을 추가 가능한데 그러면 

/detail/:id/author

/detail/:id/comment

이 경로로 접속했을 때 보여줄 컴포넌트를 작성가능합니다. 

(당연히 Author Comment 이런 컴포넌트는 만들어놓고 import해서 집어넣으시길 바랍니다.)

 

그리고 마무리로 Detail.vue에 `<router-view></router-view>`라는 태그를 추가해주면

/detail/:id/author 로 접속했을 때 `<router-view>`자리에 Author 컴포넌트가 보입니다.

하지만 간단한 UI라면 이렇게 만들지 말고 탭기능 식으로 만드는게 나을 수 있습니다. 

<br/>

## 그리고 라우터 관련 개발시 팁인데

라우터관련 문법 에러들은 터미널에 표기되지 않고 

크롬 개발자도구 콘솔창에 쪼그만하게 warning으로 표기됩니다. 

(warning이라서 사이트가 멈추지 않습니다)

그래서 여러분 코드의 라우터관련 에러들은 콘솔창에서 확인하고 수정해보고 하시길 바랍니다. 

<br/>

## 페이지 이동을 간지나게 하고 싶다면 

```js
$router.push('/detail/0')
```
이런 코드를 이용하면 됩니다.

위 코드가 실행되면 /detail/0으로 이동됩니다.

HTML안에 넣거나 밑에 기능개발하는 곳에 넣거나 할 수 있습니다. 

`<router-link>`대신 쓸 수 있는데 장점은 변수도 집어넣을 수 있고 그렇겠죠? 

`$router.go(-1)`

이런 코드를 이용하면 뒤로가기 기능을 실행할 수 있습니다.

1이라고 쓰면 앞으로 갑니다.

-2라고 쓰면 두번 뒤로갑니다.

$router 변수를 잘 쓰시면 브라우저 방문기록을 들춰보거나 마음대로 조작도 할 수 있습니다.

<br/>

자세한 내용은 

https://next.router.vuejs.org/ Vue 라우터 4버전 공식 사이트를 참고하도록 합시다. 

이런거 외워봤자 다음날 다 까먹기 때문에 자잘한 내용은 필요할 때 찾아쓰는게 효율적입니다.  