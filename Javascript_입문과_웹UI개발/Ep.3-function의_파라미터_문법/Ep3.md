# function의 파라미터 문법

함수 내에 구멍을 뚫어줄 수 있습니다.

```js
function alertOpen(e) {
    document.getElementById('alert').style.display = e;
}
```

<br>

구멍을 뚫는 이유는 뚫으면 함수를 업그레이드해서 사용할 수 있기 때문입니다.

<br>

구멍이 뚫려있으면 함수를 쓸 때 그냥 쓰는게 아니라 소괄호 내에 뭔가 문자나 숫자등을 입력해서 사용 가능합니다.

<br>

```js
function alertOpen(e) {
    document.getElementById('alert').style.display = e;
}

alertOpen('안녕');
alertOpen('바보');
```

업그레이드 된 함수를 사용할 때는 소괄호 구멍자리에 뭔가 내가 원하는 문자를 입력해줄 수 있습니다. 문자를 입력하면 아까 그 중괄호 내부의 구멍 자리에 문자가 들어가게 됩니다.

`alertOpen('안녕')` 이렇게 실행하면 `document.getElementById('alert').style.display = '안녕'; 이런 코드가 실행 된다는 것 입니다.

<br>

좀 더 실용적인 예시입니다.
`alertOpen('block')` 이렇게 실행하면 e 파라미터 자리에 'block' 문자가 들어갑니다.

그럼 알림창이 열리겠죠.

`alertOpen('none')` 이렇게 실행하면 e 파라미터 자리에 'none' 문자가 들어갑니다.

그럼 알림창이 닫히겠죠.

<br>

이렇게 하면 알림창 오픈 함수 , 알림창 클로즈 함수 해서 함수를 2개씩 만들 필요가 없겠죠.

비슷한 함수가 여러개 있으면 굳이 여러개 만들 필요 없이 하나가지고 구멍을 뚫어서 함수 하나 가지고 다양한 기능을 실행할 수 있게 되는 것입니다.

<br><br>

### 파라미터 예시 2

```js
function plus() {
    2 + 1;
}
```

코드를 짜다가 2 + 1 같은 어렵고 복잡한 수식을 함수로 축약해서 사용하고 있습니다. 근데 갑자기 2 + 2 도 필요하고 2 + 3도 필요한데 어떻게 해야할까요?

<br><br>

```js
function plus() {
    2 + 1;
}

function plus2() {
    2 + 2;
}

function plus3() {
    2 + 3;
}
```

이렇게 하면 될듯한데 비슷한 함수들은 굳이 많이 만들 필요가 없습니다. 구멍 (파라미터) 문법이 있기 때문이죠.

<br>

```js
function plus(구멍) {
    2 + 구멍;
}
```

가변적인 부분에 구멍을 뚫어주면 이제 함수 쓸 때마다<br>
plus(1) 하면 2 + 1 해주고,<br>
plus(2) 하면 2 + 2 해주니까<br>
함수 하나로 해결가능합니다.

그래서 쓰는 문법이 구멍 문법입니다.

<br><br>

### 파라미터 문법 특징

<br>

A. 파라미터는 자유롭게 작명이 가능합니다.

```js
function plus(a) {
    2 + a;
}
```

<br>

B. 파라미터는 2개 이상 사용가능합니다.

```js
function plus(a, b) {
    a + b;
}
plus(2, 5);
```

콤마로 구분하면 됩니다. <br>
그럼 함수 사용할 때도 자료 2개 입력가능!
