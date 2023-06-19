# 서브메뉴 만들어보기와 classList 다루기

```js
document.getElementsByClassName('navbar-toggler')[0].addEventListener('click', function () {
    document.getElementsByClassName('list-group')[0].classList.add('show');
});
```

위 코드처럼 클래스를 선택하고 싶을 땐 getElementsByClassName을 사용하고, 클래스를 추가하고 싶을땐 `classList.add('클래스명')` 이라고 쓰면 됩니다.

반대로 제거하는법은 `classList.remove('클래스명')` 이 되겠죠.

쉽게 토글하려면 classList.toggle 이라고 쓰면 됩니다.

<br><br>

## querySelector , querySelectorAll

querySelector 와 querySelectorAll은 css 셀렉터 문법을 사용합니다.

querySelector는 맨 위 한개의 요소만 선택해주고, querySelctorAll은 해당되는걸 다 찾아줍니다.

그래서 뒤에 인덱스를 붙여서 n번째 요소를 찾을 수 있습니다.
