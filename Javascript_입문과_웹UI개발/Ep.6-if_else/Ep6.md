# if else

조건부로 코드를 실행하고 싶으면 if 문법을 쓰면 됩니다.

```js
if (조건식) {
    //code
}
```

예를 들면 이러한 조건이 들어갑니다.

```js
if (3 > 1) {
    console.log('ㅎㅇ');
}
```

<br><br>

조건이 참일 때가 아닌 거짓일 때의 조건을 원하는 경우 else 를 사용합니다.

```js
if (3 > 1) {
    console.log('ㅎㅇ');
} else {
    console.log('ㅂㅇ');
}
```

<br><br>

if문 뒤에 조건을 연결해서 쓰고 싶으면 else if를 사용합니다.

```js
if (1 == 3) {
    console.log('맞아요1');
} else if (3 == 3) {
    console.log('맞아요2');
}
```

그게 아니면 만약에 라는 뜻으로, 위 코드에서는 1 == 3 비교해보고 아니면 3 == 3을 비교해서 맞으면 맞아요2를
출력합니다.

<br><br>

```js
if (1 == 3) {
    console.log('맞아요1');
} else if (3 == 3) {
    console.log('맞아요2');
}
```

```js
if (1 == 3) {
    console.log('맞아요1');
}
if (3 == 3) {
    console.log('맞아요2');
}
```

else if 안쓰고 if문 2개 써도 같은 동작을 합니다. 쓰고 안쓰고의 차이는 다음과 같습니다.

if문이 2개 => 위에 있는 if 문이 참이든 아니든 무조건 2개의 if문이 실행됩니다.

else if를 쓰면 => 위의 조건식이 참이면 else 부분은 실행하지 않습니다.
