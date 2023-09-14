# Composition API 사용법 2 & 간단한 검색기능

## 실은 ref 말고 reactive도 있습니다.

데이터 만들 때 ref 쓰라고 했는데

그거 말고 reactive라는 함수도 똑같이 사용가능합니다. (import 해와야함)

```js
import { ref, reactive } from 'vue'

export default {
  setup(){
    let follower = ref([]);
    let test = reactive({name : 'kim'})

    return { follower }
  },
}
```
ref를 쓰든 reactive를 쓰든 똑같은 역할을 하는데

reactive는 object, array 같은 reference data type을 주로 담고

ref는 숫자, 문자같은 primitive data type을 담게 되어있습니다.

근데 실은 구분해서 쓰기 귀찮아서 전부 ref 씁니다.

ref라는 함수 까보면 "그냥 reactive 해주세요~" 그거밖에 없습니다 둘다 똑같은 함수입니다.

<br/>

## props 사용법

composition API를 써서 개발할 때 setup() 함수안에 코드짜면 된다고 했는데

안타깝게도 setup() 함수 안에서는 위에 등록된 props를 this.props 이런 식으로 가져다쓸 수 없습니다.

그래서 props 가져와서 뭔가 개발하고 싶을 땐 이렇게 쓰셔야합니다. 

```js
import { ref, toRefs } from 'vue'

export default {
  setup(props){
    let follower = ref([]);
    let { 프롭스명 } = toRefs(props)  
    console.log(프롭스명.value)
    return { follower }
  },
}
```

setup() 함수 안에 파라미터를 두개까지 집어넣을 수 있는데

첫째는 자동으로 props가 되고 둘째는 이상한 context라는게 됩니다. 둘째는 잘 안쓰니 한번 찾아보시고

아무튼 첫째 파라미터를 출력해보면 props가 다 담겨있습니다.

그걸 근데 그냥 쓰시면 안되고 ref 안에 담아 쓰셔야합니다. 

안담아쓰면 props가 바뀌어도 실시간 반영이 안됨

 
<br/>
 

근데 담아쓸 때는 toRefs라는걸 이용하는데 그냥 ref 여러번 해주는 함수입니다. (import 해와야함)

그리고 등호 왼쪽에 {props이름, props이름2 ~~} 이런 식으로 잘 적어주면 됩니다.

그럼 이제 props이름.value라고 찍으면 props 나옵니다. 이걸로 개발하시면 됩니다. 끝

그리고 까먹었을까봐 다시 강조하는데 props는 자식컴포넌트가 수정하시면 안됩니다.

<br/>

## watch 사용법

composition API를 써서 개발할 때 setup() 안에서 watch 같은 걸로 데이터변화를 감시하고 싶으면

```js
import { ref, watch } from 'vue'

export default {
  setup(props){
    let follower = ref([]);
    watch( 데이터명, ()=>{ 데이터 변화시 실행할 코드 } )
    return { follower }
  },
}
```
watch함수를 import 해와서 저렇게 쓰면 됩니다. 

그럼 이제 데이터 감시 잘해줌

props도 감시가능합니다. 

<br/>

## computed 사용법

이쯤되면 어떻게 써야할지 예상가능합니다. 

```js
import { ref, computed } from 'vue'

export default {
  setup(props){
    let follower = ref([]);
    let 어쩌구 = computed( ()=>{ return 10 } )
    console.log(어쩌구.value)
    return { follower }
  },
}
```
computed는 데이터 연산결과를 잠깐 저장하는 곳이라고 했습니다.

computed를 import 해온 뒤에 소괄호안에 함수 하나 집어넣으시면 되는데

그 함수는 연산결과를 return으로 퉤 뱉는 함수가 되면 됩니다. 

그걸 변수에 담아서 쓰십시오.  

computed도 일종의 데이터취급이라서 .value라고 찍어야 제대로 잘 출력됩니다. 

<br/>

## methods 사용법

그냥 일반 함수 만들고 싶을 땐 methods에 넣었는데

composition API에서는 

```js
import { ref } from 'vue'

export default {
  setup(props){
    let follower = ref([]);
    
    function hello(){
    
    }
    return { follower, hello }
  },
}
```
아무데나 함수 만드시면 그게 methods 입니다.

그리고 그걸 return 안에다가 적으시면 위에 HTML 란에서도 사용가능합니다.

<br/>

## Vuex store 사용법

setup함수에서 $store.state.name 이런거 어떻게 쓰냐면 

```js
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup(props){
    let follower = ref([]);
    let store = useStore();
    console.log(store.state.name)
    return { follower }
  },
}
```
1. useStore라는걸 vuex에서 import 해옵니다.

2. useStore()라고 쓰시면 이게 예전의 $store랑 똑같은 의미입니다.

이제 자유롭게 state 뽑든가 아니면 commit 하든가 dispatch 하든가 하시면 됩니다.

 
<br/>
 

(참고) mapState 그런건 setup 안에서 못씁니다.

나중에 Vuex 5버전 출시하면 그때 한번 설치해서 써보십시오.

지금 4버전과는 문법이 약간 달라질겁니다.