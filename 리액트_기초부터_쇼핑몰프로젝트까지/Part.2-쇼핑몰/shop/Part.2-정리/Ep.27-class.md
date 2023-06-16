# class를 이용한 옛날 React 문법

컴포넌트 만들 때 function 쓰면 된다고 했는데 <br>
예전 리액트에선 class 문법을 사용했습니다. 옛날엔 어떻게 했는지 알아봅시다.

<br>

## class 문법으로 컴포넌트 만드는 법

```js
class Modal2 extends React.Component {
  constructor(){
    super()
  }

  render(){
    return (
      <div>안녕</div>
    )
  }

}
```
1. class 어쩌구 작성하고 컴포넌트 이름 작명합니다.
2. constructor,super,render 함수 3개 채워넣습니다. 기본 템플릿같은거임
3. 컴포넌트 길고 복잡한 html 축약할 때 쓴다고 했습니다. return 안에 축약할 html 적으면 됩니다.

그럼 이제 `<Modal2></Modal2>` 라고 쓸때마다 `<div>안녕</div>` 이게 남습니다. 근데 딱봐도 function 보다 채워야할게 많아서 귀찮습니다.

<br>

### class가 뭔데요

class는 변수, 함수 보관하는 통입니다. <br>
extends는 기존 class안에 있던 변수, 함수 복사해주는 문법입니다. <br>

React.Component라는 class안에 있던 변수와 함수들을 복사해야 컴포넌트라고 인정해주기 때문에 <br>
class 어쩌구 extends React.Component라고 쓰는 것입니다. 

<br><br>

## class 컴포넌트에서 state 만들려면

```js
class Modal2 extends React.Component {
  constructor(){
    super();
    this.state = {
      name : 'kim',
      age : 20
    }
  }

  render(){
    return (
      <div>안녕 { this.state.name }</div>
    )
  }

}
```
1. `this.state` 라는 변수 만들고 거기다가 object 형식으로 state 쭉 나열하면 됩니다. object는 자료 여러개를 `key: value` 형식으로 저장할 수 있는 자료형입니다. 
2. 그리고 state 사용하고 싶으면 `this.state.state이름` 쓰면 됩니다.

<br>

## class에서 state 변경은

```js
class Modal2 extends React.Component {
  constructor(){
    super();
    this.state = {
      name : 'kim',
      age : 20
    }
  }

  render(){
    return (
      <div>안녕 { this.state.age }
        <button onClick={()=>{ this.setState({age : 21}) }}>버튼</button>
      </div>
    )
  }
}
```
state 변경하고 싶으면 `this.setState` 라는 기본함수를 가져다가 씁니다. <br>
소괄호 안에 새로운 state 넣으면 그걸로 기존 state를 업데이트해줍니다. <br>
갈아치워주는건 아니고 차이점만 잘 변경해줍니다.

<br>

## class에서 props는

```js
class Modal2 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name : 'kim',
      age : 20
    }
  }

  render(){
    return (
      <div>안녕 { this.props.프롭스이름 }</div>
    )
  }
}
```
부모가 보낸 props를 출력하고싶으면
1. constrctor , super에 props 파라미터 등록하고
2. this.props 쓰면 props 나옵니다.


