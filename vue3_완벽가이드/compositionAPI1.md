# Composition API 사용법 (팔로워 페이지 만들기)

follower.json에 들어갈 데이터

```json
[
  { "id" : 0, "name" : "_Limvely", "image" : "https://picsum.photos/200?r=0" },
  { "id" : 1, "name" : "salmon_X", "image" : "https://picsum.photos/200?r=1" },
  { "id" : 2, "name" : "360noscope", "image" : "https://picsum.photos/200?r=2" },
  { "id" : 3, "name" : "Jeony_1", "image" : "https://picsum.photos/200?r=3" },
  { "id" : 4, "name" : "mihyeon", "image" : "https://picsum.photos/200?r=4" }   
]
```

<br/>

.vue 파일이 좀 길어지면 단점이 있을 수 있습니다.

안에 데이터 100개 methods 200개 computed 300개 있으면

특정 데이터와 관련된 기능을 찾으려면 멀리 여러곳을 이동해야한다는 단점이 있습니다.

age라는 데이터를 다루는 곳을 찾고 싶으면 각각 150번줄 380번줄 670번줄을 찾고 이래야 하는 것이지요. 

이게 싫으시면 Vue 3버전 부터는 코딩스타일을 하나 더 제공합니다.

Composition API 라는 건데 computed, methods, watch, data() 이런걸로 파일을 쪼갤 필요 없이

그냥 관련 기능을 한 곳에서 쭉 코드짜고 싶으면 사용하시길 바랍니다.

이걸 쓰면 기존 방식보다 문법이 약간 귀찮을 순 있습니다. 

<br/>

## 마이페이지를 만들어봅시다

그냥 내 팔로워 목록을 보여주는 간단한 페이지 만들어보며 Composition API를 배워봅시다. 

빨리 MyPage.vue를 만드시고

```html
<template>
<div style="padding : 10px">
  <h4>팔로워</h4>
  <input placeholder="?" />
  <div class="post-header">
    <div class="profile"></div>
    <span class="profile-name">사용자명</span>
  </div>
</div>
</template>
```
HTML 부분에 이걸 채워넣으시길 바랍니다. 그럼 vue 파일 완성 
 

그리고 Container.vue에는 

```html
<div v-if="step == 3">
  <MyPage/>
</div>
```
이렇게 컴포넌트를 사용해보시길 바랍니다.

당연히 이렇게 사용하려면 import 해오고 components에 등록하고 쓰십시오.

<br/>

그리고 App.vue는 

```js
data(){
  return {
    step : 3
  }
}
```
step이라는 데이터항목을 3으로 강제로 변경시켜줍시다. 

<br/>

## Composition API 식으로 데이터만드는 법

팔로워 이름들을 저장할 곳이 필요합니다. 그래서 array 데이터를 하나 만들고 싶어졌습니다.

이전엔 data(){} 여기 집어넣었는데 이거랑은 약간 다릅니다.

일단 기본적으로 setup() 이라는 hook 같은걸 만들고 항상 그 안에 코드짜면 됩니다.

```js
(MyPage.vue script태그안에 들어갈 내용)

import { ref } from 'vue'
export default {
  name : 'mypage',
  setup(){
    let follower = ref([]);
    
    return { follower }
  },
}
```
이렇게 적어주시면 follower : [] 이라는 데이터를 만든거랑 똑같은 효과입니다.

ref() 라는 함수를 import 해와서

var 데이터이름 = ref(데이터) 안에 항상 데이터를 저장해줘야합니다.

안그러면 데이터 변경시 실시간 재렌더링이 안됨

그리고 마지막에 return { 데이터이름 } 이렇게 퉤 뱉어주셔야

위에 HTML란에 가서 {{데이터이름}} 이렇게 사용이 가능합니다. 

안그러면 데이터바인딩 못함 

<br/>

## 최근 업데이트 사항 

```js
<script setup>
import { ref } from 'vue'
let follower = ref([1,2,3])
</script>

<template>
  <div>{{ follower }}</div>
</template> 
```
요즘은 `<script setup>` 이런거 하나 주변에 더 만들고 거기에 코드짜도 됩니다.  

- 그럼 setup() 안에 작성하는거랑 똑같음 

- 변수들 return 안해도 html에서 바로 사용가능 

<br/>

## Ajax 요청 & 데이터 변경하는 법 

Composition API라고 ajax 요청하는 법이 다른건 아니고 똑같습니다. axios 대충 쓰셈

근데 데이터 수정하는 법은 살짝 이상합니다.

```js
import { ref } from 'vue'
import axios from 'axios'

export default {
  name : 'mypage',
  setup(){
    let follower = ref([]);
    
    axios.get('/follower.json').then((a)=>{
      follower.value = a.data
    })
    
    return { follower }
  },
}
```

get요청으로 아까 저장한 json 파일을 가져옵시다.

그러면 a.data 안에 그 [{},{},{},{},{}] 이렇게 생긴 데이터가 딸려오는데

그걸 follower라는 곳에 저장하고 싶으면 

follower = a.data가 아니라

follower.value = a.data 라고 써주셔야합니다.
 

굳이 설명하자면 ref() 이걸로 데이터를 만드는게 object자료형 이런걸로 데이터를 싸매는 행위기 때문에

.value로 object 안의 데이터를 수정해주셔야하는 것인데 

이해할 필요는 없고 그냥 그렇게 쓰라고 되어있으니 쓰도록 합시다.

<br/>

## Lifecycle hook 쓰는 법

컴포넌트가 부착될 때, 업데이트될 때 뭔가 실행하고 싶으면

created() mounted() beforeUpdate() 이런거 쓸 수 있다고 했습니다.

Composition API 안에서는 이거 함수명이 약간 다릅니다.

```js
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name : 'mypage',
  setup(){
    let follower = ref([]);

    onMounted(()=>{
      axios.get('/follower.json').then((a)=>{
        follower.value = a.data
      })
    })
    
    return { follower }
  },
}
```

1. onMounted() 이런 훅을 import 해오시고

2. onMounted(()=>{ 마운트후에 실행할 코드 }) 이렇게 작성합니다.

그래서 저는 ajax 요청을 mount 후에 실행하고 싶어서 이렇게 작성한 것입니다. 끝 

 

여기서의 lifecycle 함수명은 그 원래 이름 앞에다가 on만 붙이면 됩니다.

beforeUpdate() 이런건 예를 들어서 onBeforeUpdate() 이렇게 사용하시면 됩니다.

 

(참고) created() 이건 onCreated() 이렇게 쓰면 안됩니다. 이런 함수 없음

왜냐면 setup() 이 공간 자체가 그냥 created() 이거랑 매우 유사하다고 생각하시면 되겠습니다.

거기다가 코드짜면 그냥 created() 안에 코드 짠거랑 비슷하게 동작함 

 
<br/>
 

(오늘의 교훈)

이전 시간까지 우리가 썼던 문법이 Options API입니다. 

데이터끼리, 함수끼리, 컴포넌트끼리 모아서 정리해두고 싶으면 Options API를 사용합시다.

자바스크립트 초보도 Options API를 사용합니다. 

반면 관련된 기능끼리 하나로 모으고 싶으면 Composition API를 사용합시다. 