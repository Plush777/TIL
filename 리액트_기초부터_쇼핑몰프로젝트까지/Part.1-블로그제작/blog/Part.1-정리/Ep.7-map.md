# map : 많은 div들을 반복문으로 줄이고 싶은 충돌이 들 때

## 자바스크립트 map 함수 쓰는법

모든 array 자료 우측엔 map() 함수를 붙일 수 있습니다.

```js
var 어레이 = [2, 3, 4];
어레이.map(function () {
    console.log(1);
});
```

기능 1. array 안에 들어있는 자료갯수만큼 그 안에 있는 코드를 반복 실행해줍니다. <br>
실행하면 1이 3번 실행됨

<br>

```js
var 어레이 = [2, 3, 4];
어레이.map(function (a) {
    console.log(a);
});
```

기능 2. 콜백함수에 파라미터 아무렇게나 작명하면 <br>
그 파라미터는 어레이 안에있던 모든 자료를 하나씩 출력해줍니다. <br>
실행하면 2,3,4가 출력됨

<br>

```js
var 어레이 = [2, 3, 4];
var newArray = 어레이.map(function (a) {
    return a * 10;
});
console.log(newArray);
```

기능 3. return 오른쪽에 뭐 적으면 array로 담아줍니다. <br>
출력해보면 newArray는 [20,30,40] 이 출력됩니다.

<br>

## JSX 안에서 html을 반복 생성하고 싶으면

```js
function App() {
    return (
        <div>
            {[1, 2, 3].map(function () {
                return <div>안녕</div>;
            })}
        </div>
    );
}
```

array 뒤에다가 map을 붙이면 그 안에 있는 자료 개수만큼 map 내부 코드를 실행해준다는 뜻입니다. <br>
그래서 실행해보면 안녕이 3개가 생성되죠.

<br>

## 근데 반복된 HTML에 각각 다른 제목을 부여하고 싶다면

```js
function App() {
    return (
        <div>
            (생략)
            {글제목.map(function () {
                return (
                    <div className="list">
                        <h4>{글제목[0]}</h4>
                        <p>2월 18일 발행</p>
                    </div>
                );
            })}
        </div>
    );
}
```

위 코드는 지금 [0] 이라고 하드코딩 해놔서 0번째 제목만 계속 출력합니다. 반복문이 돌 때마다 0번째 글제목 , 1번째 글제목 , 2번째 글제목 이렇게 될려면 어떻게 해야할까요.

<br>

```js
function App() {
    return (
        <div>
            (생략)
            {글제목.map(function (a) {
                return (
                    <div className="list">
                        <h4>{a}</h4>
                        <p>2월 18일 발행</p>
                    </div>
                );
            })}
        </div>
    );
}
```

파라미터를 사용하면 됩니다. a라는 파라미터는 map이 반복될 때마다 array 자료 안에있던 하나하나의 데이터들을 의미합니다. <br>

그래서 출력해보면 반복문이 돌 때마다 차례로 데이터들이 돌아가게 됩니다. <br>

```js
function App() {
    return (
        <div>
            (생략)
            {글제목.map(function (a, i) {
                return (
                    <div className="list">
                        <h4>{글제목[i]}</h4>
                        <p>2월 18일 발행</p>
                    </div>
                );
            })}
        </div>
    );
}
```

실은 이렇게 해도 되는데 왜냐면 파라미터를 2개까지 작명 가능한데,<br>

첫째 파라미터 a는 array 안에 있던 자료 <br>
둘째 파라미터 i는 0부터 1씩 증가하는 정수 가 되어서 그렇습니다.
