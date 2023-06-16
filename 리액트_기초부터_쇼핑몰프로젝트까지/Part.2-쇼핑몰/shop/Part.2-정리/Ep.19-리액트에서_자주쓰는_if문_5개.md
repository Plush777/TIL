# 리액트에서 자주쓰는 if문 작성패턴 5개

## I. 컴포넌트 안에서 쓰는 if/else

```js
function Component() {
    if (true) {
        return <p>참이면 보여줄 HTML</p>;
    } else {
        return null;
    }
}
```

컴포넌트에서 JSX를 조건부로 보여주고 싶으면 그냥 이렇게 씁니다. <br>
우리가 자주쓰던 자바스크립트 if문은 <br>
`return()` 안의 JSX 내에서는 사용 불가능합니다. <br>
`<div> if (어쩌구) {저쩌구} </div>` 이게 안된다는 소리입니다. <br>

그래서 보통 return + JSX 전체를 퉤 뱉는 if문을 작성해서 사용합니다.

<br><br><br>

(참고) 근데 이렇게 쓰면 else 생략이 가능합니다.

```js
function Component() {
    if (true) {
        return <p>참이면 보여줄 HTML</p>;
    }
    return null;
}
```

else 와 중괄호 하나 없애도 아까 코드와 똑같은 기능을 합니다. <br>
왜냐면 자바스크립트 function 안에선 return 이라는 키워드를 만나면 return 밑에 있는 코드는 더 이상 실행되지 않으니까요. <br>
그래서 else 가 필요없는 경우도 많으니 깔끔한 코드를 위해 한번 생략해보십시오 <br>
if -> else if -> else 이렇게 구성된 조건문도 if 두개로 축약가능 합니다.

<br><br><br>

## II. JSX 안에서 쓰는 삼항연산자

영어로 간지나게 ternary operator 라고 합니다. <br>
**`조건문 ? 조건문 참일 때 실행할 코드 : 거짓일 때 실행 할 코드`** <br>
이 형식에 맞춰 쓰면 끝입니다.

```js
function Component() {
    return <div>{1 === 1 ? <p>참이면 보여줄 HTML</p> : null}</div>;
}
```

JSX 내에서 if/else 대신 쓸 수 있고, JSX 안에서도 실행 가능하며 조건을 간단히 주고 싶을 때 사용합니다.

<br>

삼항연산자는 중첩 사용도 됩니다.

```js
function Component() {
    return <div>{1 === 1 ? <p>참이면 보여줄 HTML</p> : 2 === 2 ? <p>안녕</p> : <p>반갑</p>}</div>;
}
```

별로 좋은 코드는 아닙니다. 좀 복잡하네요.

<br><br><br>

## III. && 연산자로 if 역할 대신하기

### 자바스크립트에선 && 연산자 라는게 있습니다.

**그냥 왼쪽 오른쪽 둘 다 true 면 전체를 true로 바꿔주세요~** 라고 쓰고싶을 때 씁니다.

```js
true && false;
true && true;
```

맨 위는 false , 밑에는 true가 남습니다.

<br>

근데 자바스크립트는 && 기호로 비교할 때 true와 false 를 넣는게 아니라 자료형을 넣으면

```js
true && '안녕';
false && '안녕';
true && false && '안녕';
```

맨 위는 안녕이 남고, <br>
중간은 false, <br>
맨 아래는 false 가 남습니다. <br>

왜냐면 && 연산자를 잘 생각해보면 이해도 가능한데 이해 하기 싫으면 <br>
**자바스크립트는 그냥 &&로 연결 된 값들 중에 처음 등장하는 falsy 값을 찾아주고 그게 아니면 마지막 값을 남겨준다** <br>

이런 이상한 현상이 있다고 외우면 됩니다.

<br>

html 조건부로 보여줄 대 이런 경우가 많습니다. <br>
**만약에 이 변수가 참이면 `<p></p>` 를 이 자리에 뱉고 참이 아니면 null 뱉고** <br>
UI 만들 때 이런거 자주 씁니다. <br>
이걸 조금 더 쉽게 &&로 축약 가능합니다.

```js
function Component() {
    return <div>{1 === 1 ? <p>참이면 보여줄 HTML</p> : null}</div>;
}

function Component() {
    return <div>{1 === 1 && <p>참이면 보여줄 HTML</p>}</div>;
}
```

그래서 위 예제 두개는 동일한 역할을 합니다. <br>
밑 예제를 보면 && 연산자로 조건식과 오른쪽 JSX 를 비교하고 있습니다. <br>
이 때, **왼쪽 조건식이 true면 오른쪽 JSX가 그 자리에 남습니다.** <br>
**왼쪽 조건식이 false면 false 가 남습니다.** <br>
(false가 남으면 HTML로 렌더링하지 않습니다.)
<br><br><br>

## IV. switch / case

이것도 기본 문법인데 if문이 중첩해서 여러개 달려있는 경우에 가끔 씁니다.

```js
function Component2() {
    var user = 'seller';
    if (user === 'seller') {
        return <h4>판매자 로그인</h4>;
    } else if (user === 'customer') {
        return <h4>구매자 로그인</h4>;
    } else {
        return <h4>그냥 로그인</h4>;
    }
}
```

if 문을 저렇게 연달아 여러개 써야하는 상황이 있으면 switch 문법으로 괄호를 조금 더 줄일 수 있습니다.

```js
function Component2() {
    var user = 'seller';
    switch (user) {
        case 'seller':
            return <h4>판매자 로그인</h4>;
        case 'customer':
            return <h4>구매자 로그인</h4>;
        default:
            return <h4>그냥 로그인</h4>;
    }
}
```

switch 문법 어떻게 쓰냐면

1. `switch (검사할 변수){}` 이거부터 작성하고
2. 그 안에 `case 검사할 변수가 이거랑 일치하냐 :` 를 넣어줍니다.
3. 그래서 이게 일치하면 case 밑에 있는 코드를 실행합니다.
4. `default:` 는 그냥 맨 마지막에 쓰는 else 문과 동일합니다.

<br><br><br>

## V. object/array 자료형 응용

"경우에 따라서 다른 html 태그들을 보여주고 싶은 경우"
<br>
if문 여러개 혹은 삼항연산자 여러개를 작성해야겠죠? 근데 이렇게 작성할 수도 있습니다.

<br>

예를 들면 쇼핑몰에서 상품설명부분을 탭으로 만든다고 합시다. <br>

현재 state가 info면 `<p>상품정보</p>` <br>
현재 state가 shipping이면 `<p>배송정보</p>` <br>
현재 state가 refund 면 `<p>환불약관</p>` <br>
이런걸 보여주자는 겁니다.

<br>

일단 state 하나 만들어놓고 if문으로 state 검사하는 문법을 써야할 것 같지만 <br>
이번엔 if문이 아니라 자바스크립트 object 자료형에 내가 보여주고 싶은 HTML을 다 담습니다.

```js
function Component() {
  var 현재상태 = 'info';
  return (
    <div>
      {
        {
           info : <p>상품정보</p>,
           shipping : <p>배송관련</p>,
           refund : <p>환불약관</p>
        }[현재상태]
      }

    </div>
  )
```

원래 JSX 상에서 html 태그들은 저렇게 object에 담든, array에 담든 아무 상관없습니다. <br>
암튼 이렇게 object 자료형으로 HTML 정리해서 담은 다음 <br>
마지막에 object{} 뒤에 [] 대괄호를 붙여서 **key값이 현재상태인 자료를 뽑겠습니다** 라고 써놓는 겁니다. <br>

그럼 이제 현재상태라는 변수의 값에 따라서 원하는 HTML을 보여줄 수 있습니다. <br>
만약에 **var 현재상태가 'info'면** info 항목에 저장된 `<p>`태그가 보여질 것이고 <br>
만약에 **var 현재상태가 'refund'면** refund 항목에 저장된 `<p>`태그가 보여지겠죠? <br>

혹은 변수에 저장해서 써도 깔끔해질 것 같긴 합니다

```js
var 탭UI = {
    info: <p>상품정보</p>,
    shipping: <p>배송관련</p>,
    refund: <p>환불약관</p>,
};

function Component() {
    var 현재상태 = 'info';
    return <div>{탭UI[현재상태]}</div>;
}
```
