# localStorage로 만드는 최근 본 상품 기능

새로고침하면 모든 state 데이터는 리셋됩니다. <br>
왜냐면 새로고침하면 브라우저는 html css js 파일들을 첨부터 다시 읽기 때문입니다. <br>
이게 싫다면 state 데이터를 서버로 보내서 DB에 저장하거나 하면됩니다. <br>
내가 서버나 DB 지식이 없다면 localStorage를 이용해도 됩니다. <br>
유저의 브라우저에 몰래 정보를 저장하고 싶을 때 쓰는 공간입니다.

<br>

![image](https://user-images.githubusercontent.com/87457620/189522115-e86120b7-e34f-421c-b71e-337f489b9c41.png)

크롬 개발자도구에서 Application 탭 들어가서 구경가능합니다.

- 사이트마다 5MB 정도의 문자 데이터를 저장할 수 있습니다.
- object 자료랑 비슷하게 key/value 형태로 저장합니다.

유저가 브라우저 청소를 하지않는 이상 영구적으로 남아 있습니다.

<br>

## localStorage 문법

그냥 js 파일 아무데서나 다음 문법을 쓰면 <br>
localStorage에 데이터 입출력할 수 있습니다.

```js
localStorage.setItem('데이터이름', '데이터');
localStorage.getItem('데이터이름');
localStorage.removeItem('데이터이름')
```
차례로 추가,읽기,삭제 문법입니다.

<br>

## localStorage에 array/object 자료를 저장혀려면

문자만 저장할 수 있는 공간이라 array/object 를 바로 저장할 수는 없습니다. <br>
강제로 저장하면 문자로 바꿔서 저장해주는데 그럼 array/object 자료가 깨져서 저장됩니다. <br>
그래서 편법이 하나 있는데 array/object -> JSON 이렇게 변환해서 저장하면 됩니다. <br>
JSON은 문자취급을 받아서 그렇습니다. <br>
JSON은 그냥 따옴표 친 array/object 자료입니다.

```js
localStorage.setItem('obj', JSON.stringify({name:'kim'}) );
```
`JSON.stringify()` 라는 함수에 array/object 를 집어넣으면 그 자리에 JSON으로 변환된걸 남겨줍니다. 

<br>

```js
var a = localStorage.getItem('obj');
var b = JSON.parse(a)
```
당연히 데이터를 다시 꺼내면 JSON이 나옵니다. <br>
JSON -> array/object 변환하고 싶으면 <br>
`JSON.parse()` 를 쓰면 되겠습니다.

<br><br>

## 최근 본 상품 UI 만들기

1. 누가 Detail 페이지 접속하면
2. 현재 페이지에 보이는 상품 id 가져와서
3. localStorage에 watch 항목에 있던 [] 추가

라고 한글로 써놓고 그대로 JS로 번역해봅시다.

```js
(Detail.js)

useEffect(()=>{
  console.log(찾은상품.id)
}, [])
```
1번 2번은 이렇게 하면 되겠군요. <br>
Detail.js 아무데나 useEffect() 하나 집어넣으면 1번 번역 끝이고 <br>
2번은 아마 예전에 만들어 둔 변수 쓰면 됩니다. <br>

3번 localStorage에 watch 항목에 추가는 <br>
localStorage에 있던 기존 데이터를 수정하고 그런건 불가능하다고 했습니다. <br>
입력/출력밖에 안됩니다.

<br>

그래서 watch에 있던 [] 빼서 <br>
찾은상품.id를 추가하고 <br>
다시 watch 항목으로 저장하는 식으로 코드짜면 됩니다. 

<br>

```js
(Detail.js)

useEffect(()=>{
  let 꺼낸거 = localStorage.getItem('watched')
  꺼낸거 = JSON.parse(꺼낸거)
  꺼낸거.push(찾은상품.id)
  localStorage.setItem('watched', JSON.stringify(꺼낸거))
}, [])
```
그래서 watched에 있던 [] 꺼내서 <br>
찾은상품.id 추가하고 <br>
다시 watched 이름으로 집어넣으라고 했습니다.

<br>

근데 같은 상품페이지 계속 접속하면 똑같은 상품 id가 계속 추가되는 현상이 발생하는군요.

<br><br>

## 중복 제거하기

상품 id가 이미 [] 에 있으면 추가하지 말아주세요 라고 추가만 하면 될 것 같은데 if 이런거 쓰기 귀찮으면 set 자료형 쓰면 됩니다. <br>
Set은 array와 똑같은데 중복을 알아서 제거해주는 array 입니다. <br>
그리고 array <-> Set 변환도 쉬워서 <br>
array -> Set -> array 이런 식으로 쓰면 array에서 중복 제거를 좀 쉽게 할 수 있습니다.

<br>

```js
(Detail.js)

useEffect(()=>{
  let 꺼낸거 = localStorage.getItem('watched')
  꺼낸거 = JSON.parse(꺼낸거)
  꺼낸거.push(찾은상품.id)

  //Set으로 바꿨다가 다시 array로 만들기
  꺼낸거 = new Set(꺼낸거)
  꺼낸거 = Array.from(꺼낸거)
  localStorage.setItem('watched', JSON.stringify(꺼낸거))
}, [])
```
그래서 Set으로 바꿨다가 다시 array로 변환해봤습니다. <br>
구글 찾아보니 new Set 하면 array를 Set으로 바꿀 수 있고 <br>
Array.form(Set자료) 하면 Set을 array로 바꿀 수 있다는군요.