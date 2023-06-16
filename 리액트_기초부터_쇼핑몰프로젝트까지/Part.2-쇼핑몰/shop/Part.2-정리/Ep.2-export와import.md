# import export 문법

<br>

## export default / import 문법

코드가 넘 길 땐 export default / import 문법으로 다른 파일에 보관해놨다가 다시 불러올 수 있습니다. <br>
예를 들어서 data.js 파일이 있는데 거기 있던 변수를 App.js에서 가져와서 쓰고 싶으면

```js
(data.js 파일)

let a = 10;
export default a;
```

export default 변수명; 이렇게 쓰면 원하는 변수를 밖으로 내보낼 수 있습니다.

<br>

```js
(App.js 파일)

import a from './data.js';
console.log(a)
```

export 했던 변수를 다른 파일에서 사용하고 싶으면 <br>
**import 작명 from './파일경로'** 하면 됩니다.

<br>

(유의점) <br>

-   변수,함수,자료형 전부 export 가능
-   파일마다 export default 라는 키워드는 하나만 사용가능
-   파일경로는 ./부터 시작

<br><br>

## export {} / import {}

여러개의 변수들을 내보내고싶으면 export default 말고 이런 문법을 씁니다.

```js
(data.js 파일)

var name1 = 'Kim';
var name2 = 'Park';
export { name1, name2 }
```

<br>

```js
(App.js 파일)

import { name1, name2 } from './data.js';
```

export {} 이걸로 내보냈으면 가져다가 쓸 때 import {} 문법을 씁니다. <br>

(유의점)

-   export { } 했던 것들은 import { } 쓸 때 자유작명이 불가능합니다. export 했던 변수명 그대로 적어야함!
