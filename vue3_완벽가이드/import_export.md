# import / export

오늘은 실제 원룸 데이터를 HTML에 꽂아 보여주도록 합시다.

서버가 있으면 서버에서 데이터를 받아와서 보여주는게 일반적이지만 

우리는 그런게 없으니 가짜 데이터를 직접 준비했습니다. 

위의 코드를 data() 란에다가 보관한 후 {{데이터바인딩}} 하면 되겠습니다. 하지만 데이터가 상당히 길어보입니다. 

그대로 붙여넣으면 복잡해질 것 같으니 import/export 문법을 이용해서 다른 js파일에 보관한 뒤 가져오도록 합시다. 


<br/>

## export default / import 문법 

어떤 js 파일에서 만든 변수나 자료를 다른 js 파일에서 사용하고 싶은 경우 export와 import 문법을 씁니다.

일단 다른파일에서 export 하셔야 다른 파일에서 import를 할 수 있습니다. 

막번역을 하자면 수출을 해야 수입을 할 수 있습니다.

 

예를 들어서 oneroom.js 에 있는 변수를 App.vue 에서 쓰고 싶은 경우

```js
(oneroom.js)
var apple = 10;
export default apple
```

```js
(App.vue)
import 어쩌구 from './oneroom.js파일경로'
```

이렇게 씁니다. export default 옆에 내보낼 변수나 자료형입력하면 되고 

이걸 가져다가 쓰고싶으면 원하는 파일에서 import 작명 from 경로 적어서 사용하면 됩니다. 

작명한 변수는 출력해보면 oneroom.js에서 export 했었던 10이라는 데이터가 나옵니다.

 

- export default는 파일 맨마지막에 딱 한번 사용가능합니다.

- import시 작명은 자유롭게 가능

<br/>

## export {} / import 문법 

export 해야할게 많으면 export {} 문법을 사용합니다.

예를 들어서 oneroom.js 에 있는 변수들을 App.vue 에서 쓰고 싶은 경우

```js
(oneroom.js)
var apple = 10;
var apple2 = 100;
export { apple, apple2 }
```

```js
(App.vue)
import { apple, apple2 } from './oneroom.js파일경로'
```
이렇게 작성합니다. 

 

- export는 원하는 만큼 사용가능합니다. 

- 이걸 import 시엔 작명이 불가능하고 export 했던 변수명 그대로 적어야합니다.

그래서 위에 첨부해드린 긴 데이터를 oneroom.js 에 저장해두시고

그걸 App.vue의 데이터로 저장하려면 코드 어떻게 짭니까. 

알아서 해보시길 바랍니다. 

<br/>

```js
(oneroom.js)
export default 위에있던원룸데이터
```

```js
(App.vue)
import data from './oneroom.js파일경로'

data(){
  return {
    원룸들 : data
  }
}
```

이렇게 작성했습니다. 

원룸들이라는 이름으로 저장해뒀습니다.

이제 이걸 실제 상품명 자리에 집어넣고 싶으면 어떻게합니까.

데이터바인딩하면 됩니다. {{원룸들}} 이런 식이겠군요.


근데 원룸들이라는 데이터는 [ {}, {}, {}, {}, {}, {} ] 이렇게 생겼습니다.

왜냐면 제가 그렇게 만들었거든요

{} 하나마다 하나의 상품데이터가 들어있습니다. 상품명, 가격 이런 정보들이요.

그걸 꺼내서 첫째 상품에 집어넣으시면 됩니다.

예를 들어서 

```html
<div>
  <img src="">
  <h4>{{원룸들[0].title}}</h4>
  <p>{{원룸들[0].price}}</p>
</div>
```
이렇게 데이터바인딩하시면 첫째 상품의 제목이 잘 데이터바인딩됩니다.

중괄호 대괄호가 뭔지 모르겠다면 자세한 설명은 강의에 있다고합니다. 