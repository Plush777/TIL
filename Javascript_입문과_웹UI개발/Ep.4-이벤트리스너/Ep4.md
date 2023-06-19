# 이벤트리스너

## getElementsByClassName

class로도 요소를 찾을 수 있습니다.

```html
<p class="title">타이틀</p>
<p class="title">타이틀</p>
<p class="title">타이틀</p>
```

```js
document.getElementsByClassName('title')[0].innerHTML = '안녕';
```

이렇게 작성하면 첫 p 태그의 내용이 안녕으로 바뀝니다.<br>
`getElementsByClassName('클래스명')[순서]` 이렇게 쓰면 됩니다.

<br>

[0] 이렇게 순서를 넣는 이유는 <br>
getElementsByClassName 셀렉터는 일치하는 class가 들어있는 모든 html 요소를 찾아주기 때문입니다. <br><br>

그래서 그 중에 몇번째 요소를 바꿀지 [순서] 를 꼭 뒤에 붙여줘야 합니다.

<br> <br>

## 이벤트 리스너

onclick 써서 스크립트를 길게 짰는데 보기싫으면
이벤트 리스너 문법을 사용하면 됩니다.

<br>

작성은 이렇게 하면 됩니다.

```js
document.getElementById('어쩌구').addEventListener('click', function () {
    //실행할 코드
});
```

<br><br>

## + 콜백 함수

```js
셀렉터.addEventListener('scroll', function () {});
```

이벤트 리스너 생김새를 잘 보면 함수 같이 생겼습니다. <br>
실은 뒤에 소괄호 붙으면 다 함수입니다. <br><br>

위처럼 함수 파라미터자리에 들어가는 함수를 전문용어로 콜백함수 라고 합니다. <br>
콜백함수는 뭔가 순차적으로 실행하고 싶을 때 많이 보이는 함수형태이며, 함수 안에 함수 넣으라고 하면 저건 콜백함수구나! 라고 알고있으면 됩니다.
