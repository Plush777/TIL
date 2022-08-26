# 라우터 3 : URL 파라미터로 상세 페이지 100개 만들기

<br>

## 상세 페이지 여러개 만들려면

상품이 3개니까 상세 페이지도 3개 필요할텐데 <br>
그럼 이렇게 짜는건 어떤가요. `<Route>` 쓰면 페이지 하나 만들 수 있다고 했으니까

```js
<Route path="/detail/0" element={ <Detail shoes={shoes}/> }/>
<Route path="/detail/1" element={ <Detail shoes={shoes}/> }/>
<Route path="/detail/2" element={ <Detail shoes={shoes}/> }/>
```

`<Route>` 를 3개 만드는겁니다. 그럼 페이지 3개 끝! <br>

근데 상품이 100만개면 `<Route>` 도 100만개 만드나요? 다른 방법을 써야합니다.

<br>

```js
<Route path="/detail/:id" element={<Detail shoes={shoes} />} />
```

페이지 여러개를 만들고 싶으면 **URL 파라미터** 라는 문법을 사용하면 됩니다. <br>
path 작명할 때 `/:어쩌구` 이렇게 사용하면 **"아무문자"** 를 뜻합니다. <br>

그래서 위의 `<Route>` 는 누군가 주소창에 **`/detail/아무거나`** 입력했을 때 `<Detail>` 컴포넌트 보여달라는 뜻입니다. <br>

이제 그럼 `/detail/0` , `/detail/1` , `/detail/2` <br>
이렇게 접속해도 잘 나오겠네요.

<br><br>

## 페이지마다 똑같은 내용 보여주기 싫은데요

페이지는 여러개 만들어놨지만 접속해보면 다 똑같은 0번째 상품명만 보여주고 있습니다. <br>
왜냐면 0번째 상품명만 보여달라고 하드코딩 했기 때문이죠.
<br>

```js
(Detail.js)

<h4 className="pt-5">{props.shoes[현재url에입력된숫자].title}</h4>
<p>{props.shoes[0].content}</p>
<p>{props.shoes[0].price}원</p>
<button className="btn btn-danger">주문하기</button>
```

이렇게 코드짜면 되지않을까요. <br>
0이라고 하드코딩 했던 자리에 **현재 url 파라미터에 입력된 숫자** 를 넣는겁니다. <br>
그럼 `detali/1` 로 접속하면 1번째 상품명을 보여줄 수 있겠네요. <br>

저런 숫자를 어디서 가져오냐구요?

<br>

```js
import { useParams } from 'react-router-dom';

function Detail() {
    let { id } = useParams();
    console.log(id);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{props.shoes[id].title}</h4>
                    <p>{props.shoes[0].content}</p>
                    <p>{props.shoes[0].price}원</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    );
}
```

useParams() 라는 함수를 쓰면 됩니다. <br>
이거 쓰면 현재 /:url 파라미터 자리에 유저가 입력한 값을 가져올 수 있습니다. <br>

변수에 저장해서 쓰든가 하면됩니다. <br>

그래서 위처럼 사용하면 <br>
누가 /detail/1 로 접속하면 id라는 변수에 1이 들어옵니다. <br>
누가 /detail/2 로 접속하면 id라는 변수에 2가 들어옵니다. <br>
그래서 props.shoes[id].title 이러면 아까 의도했던 기능이 완성이군요. <br>

페이지마다 각각 다른 상품명이 보입니다.

<br>

+path 작명 시 url 파라미터는 몇번이고 사용가능합니다. <br>
detail/:어쩌구/:저쩌구...

<br><br>

### ? 자료의 순서가 변경되면 상세페이지도 고장나는 문제는 어떻게 하나요

상품 순서를 가나다순으로 변경하는 버튼을 만들었다고 가정합시다. 그거 누르면 shoes라는 state 안의 상품이 가나다 순으로 정렬됩니다. <br>
그럼 Grey Yordan 이 0번 상품이 되겠군요. <br>

그럼 평소엔 /detail/0으로 접속하면 0번째 상품을 보여주니까 White and Black 이 뜰텐데, 정렬 후엔 /detail/0으로 접속하면 0번째 상품을 보여주니까 Grey Yordan 이 뜨겠군요.

<br>

이처럼 상세페이지 순서가 불규칙해지는 문제는 어떻게 하면 좋을까요.

<br>

### 상품 id를 활용합니다.

/detail/0 접속 시 0번째 상품말고 상품 id가 0인걸 보여주면 되지않을까요. <br>

```js
{
      id : 0,
      title : "White and Black",
      content : "Born in France",
      price : 120000,
      img: 'https://codingapple1.github.io/shop/shoes1.jpg',
      alt: '신발1'
    },
```

이게 가능한 이유는 data.js 에 보면 데이터 안에 id : 0 이런 영구번호가 있습니다. 이걸 활용하면 되겠군요. <br>

그래서 현재 **/:id 자리에 입력한 값**과 **영구번호가 같은** 상품을 찾아서 데이터 바인딩 해주면 되겠네요. <br>

자바스크립트엔 `find` 라는 문법이 있는데 이거 쓰면 array 자료 안에서 원하는 항목만 찾아올 수 있습니다. <br>
`array자료.find(() => { return 조건식 })` <br>
이렇게 쓰면 조건식에 맞는 자료를 찾아서 이 자리에 남겨줍니다. <br>

```js
Detail.js;

function Detail(props) {
    let { id } = useParams();
    let 찾은상품 = props.shoes.find(function (x) {
        return x.id == id;
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}원</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    );
}

export default Detail;
```

1. `find()` 는 array 뒤에 붙일 수 있으면 return 조건식 적으면 됩니다. 그럼 조건식에 맞는 자료를 남겨줍니다.
2. `find()` 콜백함수에 파라미터 넣으면 array 자료에 있던 하나하나의 자료들을 뜻합니다.
3. `x.id == id` 라는 조건식을 써봤습니다. 그럼 **array자료.id === url에 입력한번호** 이렇게 비교한 결과를 변수에 담아줍니다. 그럼 {상품 1개} 이런식으로 남겠네요.
4. 마지막으로 찾은 {상품 1개} 를 html에 데이터 바인딩 합니다.

더 짧게 쓰고 싶으면 <br>
`let searchData = shoesData.find(x => x.id == id);` <br>
이런식으로 es6 문법 써도 됩니다. <br><br>

### == 말고 === 쓰면 오류나는데요

당연한 결과입니다. 서로 타입이 다르기 때문인데요. <br>
![image](https://user-images.githubusercontent.com/87457620/186891171-f8358fb4-54ec-45d7-a653-e43dbe2ea35d.png)

useParams 변수에 마우스를 올려보면 변수의 타입을 알 수 있는데, string (문자열) 형식으로 되어있죠. <br>

![image](https://user-images.githubusercontent.com/87457620/186891408-47b41027-883a-4344-8ce3-470232ce4493.png)

data.js 에 있는 id는 number (숫자) 형식입니다. <br>

서로 타입이 달라서 오류가 생기는데, 이는 다음과 같이 해결할 수 있습니다. <br> +참고로 `===` 는 엄격한 비교로, 같은지만 비교하는게 아니라 object의 타입까지 비교한다고 했습니다.

<br>

```js
let { id } = useParams();
id = parseInt(id); //문자 -> 숫자로 변환
```

`parseInt()` 를 쓰면 해결할 수 있습니다. 문자 형식이었던 id를 숫자 형식으로 바꿔준다고 생각하면 됩니다. <br>
