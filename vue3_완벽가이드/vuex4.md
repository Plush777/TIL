# Vuex 4 : mapState를 사용하면 편리할 수도 있음

state를 vue파일에서 꺼내쓸 때 $store.state.name 이런 식으로 꺼내썼는데

이게 길고 귀찮으면 mapState라는 함수를 써보십시오.

그 전에 computed 라는 항목에 대해 알아야합니다. 

<br/>

## 잠깐 알아보는 computed

함수만들 때 methods : {} 안에 만들라고 했는데

실은 computed : {} 안에 만들 수도 있습니다. 

```js
computed : {
  now2(){
    return new Date()
  }
}, 
methods : {
  now(){
    return new Date()
  }
}
```
똑같은 기능의 함수를 2개 만들어봤는데 차이점은

methods 안에 만든 함수는 함수를 부를 때마다 안의 코드가 실행됨

computed 안에 만든 함수는 함수를 불러도 안의 코드가 실행안됨

이런 차이가 있습니다. computed는 그냥 컴포넌트로드시 한번 실행되고 그 값을 계속 저장해서 씁니다.

computed는 일종의 계산결과 저장공간이라고 보시면 됩니다. 

 

- computed 함수는 return 안쓰면 안됩니다.

- computed 함수를 가져다가 쓸 때는 소괄호없이 함수명만 쓰면 됩니다.

참고로 알아두셈 다시 Vuex로 돌아갑시다. 

<br/>

## computed 쓰면 state 꺼내는 코드 짧아짐

맨날 $store.state.name 이렇게 하면 코드가 얼마나 길고 더러워지겠습니까.

데이터가 좀만 복잡해도 `$store.state.name.name2[0].name3` 이런 식으로 써야합니다. 

아이디러 

그럴 땐 자주 꺼내쓰는 state를 computed에 넣어놓으면 나름 짧게 사용가능합니다. 

methods 이런데 넣어도 되지만 그냥 computed가 적절한듯 

```js
computed : {
  name(){
    return this.$store.state.name
  }
}
```
(`<script>`태그 안에서 $store쓰려면 this.$store 입니다)

그러면 이제 위에가서 {{name}} 이렇게 쉽게 state를 꺼내쓸 수 있는 것입니다. 

이제 HTML이 안디러움 

<br/>

## mapState 쓰면 computed 코드 짧아짐

하지만 꺼낼 state가 100개 있으면 computed도 100개 만들어야하네요? 그것도 드러울듯

그렇다면 mapState라는걸 꺼내쓰시면 됩니다. 

그러면 알아서 computed 에다가 state를 등록해줌

```js
import {mapState} from 'vuex'

computed : {
  ...mapState(['state이름1', 'state이름2'])
}
```
이러면 끝입니다. 위에서 import 해와야 쓸 수 있습니다. 이제 정말 안더러움 

<br/>

```js
import {mapState} from 'vuex'

computed : {
  ...mapState({ 작명 : 'state이름1'})
}
```
혹은 object 자료형을 넣으면 state가져올 때 이름변경도 가능합니다.

<br/>

```js
import {mapState, mapMutations} from 'vuex'

computed : {
  ...mapState(['state이름1', 'state이름2']),
  ...mapMutations([ '좋아요', 'setMore' ])
}
```
이러면 mutations 함수도 쉽게 가져다 쓸 수 있습니다.

이제 $store.commit('좋아요') 이게 아니라

좋아요() 이렇게 쓸 수 있는 것임 