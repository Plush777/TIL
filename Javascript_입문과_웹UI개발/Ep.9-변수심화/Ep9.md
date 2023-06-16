# 변수 심화

## 변수의 선언 , 할당 , 범위

변수 만드는건 선언 , 변수에 값을 집어넣는건 할당이라고합니다.

```js
var age;
var name;
```

이건 변수의 선언입니다.

<br>

```js
var age;
var name;
age = 20;
name = 'kim';
```

밑 2줄은 할당입니다. 선언만 따로 할당만 따로 할 수 있고 var 로 변수를 만들면 재선언 , 재할당도 가능합니다.

<br>

```js
function func() {
    var age = 20;
    console.log(age);
}

console.log(age); // X
```

변수는 사용가능한 범위가 있습니다.<br>
함수 안에서 변수를 만들었을 경우 함수 안에서만 사용가능합니다. 반대로, 함수 바깥에서 만든 변수는 전역 변수라고해서 함수 안에서 사용 가능합니다.

<br>

## var , let , const

```js
let color = 'black';
let color; // X
```

let , const는 재선언이 불가능합니다. (나중에 코드가 길어졌을 때 변수 이미 만든거 또 만들고하는 실수를 방지할 수 있습니다.)

<br>

```js
const string = 'abc';
string = 'def'; // X
```

const 는 재 할당도 불가능합니다. (값을 수정하면 큰일나는 변수들을 만들고싶을 때 유용합니다. 나중에 값을 변경하는 실수를 방지합니다.)

<br>

```js
if (true) {
    let name = 'kim';
}

console.log(name); // X
```

let과 const는 모든 중괄호가 범위로, 범위가 좁습니다.

<br>

## 정리

var : function-scoped / 재선언 O / 재할당 O <br><br>
let : Block-scoped / 재선언 X / 재할당 O <br><br>
const : Block-scoped / 재선언 X / 재할당 X
