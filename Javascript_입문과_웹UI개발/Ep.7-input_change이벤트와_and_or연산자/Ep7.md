# input,change 이벤트와 and , or 연산자

## input 이벤트와 change 이벤트

```js
document.getElementById('email').addEventListener('input', function () {
    console.log('안녕');
});
```

input에 입력된 값이 변경될 때 input 이벤트가 발생합니다.

<br>

```js
document.getElementById('email').addEventListener('change', function () {
    console.log('안녕');
});
```

input에 입력된 값이 변경되고 커서를 다른 곳에 찍으면 change 이벤트가 발생합니다. 즉, input 포커스를 잃었을 때 발생한다는 의미입니다.

<br>

## true / false 자료

true는 참 , false는 거짓을 뜻하는 자료형입니다. 개발자스러운 말로 boolean 타입이라고 합니다.

++ 타입은 자료가 무슨 형식을 가지고 있는지 구분하기 위한 용어입니다. 123은 숫자타입, '123'은 문자타입 , true 는 boolean 타입이라고 부릅니다.

<br>

## 다른지 같은지 비교하고 싶으면?

```js
console.log(2 != 1);
```

다름을 비교하고 싶으면 != 쓰면 됩니다.

```js
console.log(2 == '2'); //true
console.log(2 === '2'); //false
```

== , === 둘 다 비교연산자이지만, === 는 엄격한 비교로 자료형의 타입까지 비교합니다.

<br>

## if문 안에서 true , false 역할을 하는 자료들

```js
0;
('');
null;
undefiend;
NaN;
```

이런 것들은 if문에서 false랑 같은 역할을 합니다.

```js
0제외 모든 숫자
'아무문자'
[]
{}
```

이런 것들은 if문에서 true랑 같은 역할을 합니다.

<br>

## and or 연산자

if문에서 조건식을 동시에 비교하고 싶을 때 아래처럼 && (and) 를 사용합니다.

```js
if (1 == 1 && 2 == 2) {
    console.log('안녕');
}
```

왼쪽과 오른쪽이 둘 다 참일경우에만 전체 true로 바꿉니다. 반대로, 둘 중에 하나라도 참이면 전체 true로 바꿔주는건 || (or) 를 씁니다.
