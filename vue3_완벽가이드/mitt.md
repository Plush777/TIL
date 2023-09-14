# 멀리 있는 컴포넌트간 데이터전송할 땐 mitt

## mitt 라이브러리를 씁시다

우리가 먼 곳에 떨어진 컴포넌트에 데이터 전송할 일이 가끔 있습니다.

강의에선 FilterBox.vue 여기서 App.vue까지 데이터를 전송하고 싶은데

이거 상위 - 상위 컴포넌트 아닙니까. 그럴 경우 코드가 매우 길어집니다. 

 

그럴 때 mitt 라는 외부 라이브러리 쓰시면 쉽게 전송이 가능합니다. 

Vue 2버전에서는 EventBus라는걸 썼는데 이제는 그걸 못써서 

mitt라는 라이브러리를 따로 설치해주셔야합니다. 혹은 나중에 업데이트 될 수도 있겠네요. 

 

 

설치법은 그냥 npm install mitt

혹은 yarn add mitt 해주시면 됩니다. 

<br/>

mitt 셋팅은 main.js 파일을 이렇게 수정해주면 됩니다. 

```js
import { createApp } from 'vue'
import App from './App.vue'

import mitt from 'mitt'
let emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter;

app.mount('#app') 
```
혹은 차이점을 분석해서 잘 반영하시길 바랍니다. 

참고로 app.config.globalProperties 이 부분이 모든 컴포넌트에서 사용할 수 있는 변수같은걸 등록할 수 있게 도와주는 일종의 object 자료입니다.

글로벌 변수 보관함이라고 보시면 되겠네요.

이런 데다가 자주 쓰는 axios 이런 것도 보관하면 편리합니다. import 안해와도 axios.get 할 수 있음

다만 this.axios.get 이렇게 하셔야합니다. 

<br/>

## mitt 사용법

데이터 보내고 싶은 곳에서

```js
this.emitter.emit('이벤트명작명', '데이터')
```
이러면 전송가능합니다. 

<br/>

데이터 수신하고 싶은 곳에서

```js
this.emitter.on('이벤트명작명', (a)=>{
  데이터수신시 실행할 코드
  a는 출력해보면 데이터나옴 
})
```
이러면 수신가능합니다.

보통 수신하는 코드는 mounted() 안에 적습니다. 

뭔가 자바스크립트 이벤트 리스너랑 사용법이 비슷합니다. 