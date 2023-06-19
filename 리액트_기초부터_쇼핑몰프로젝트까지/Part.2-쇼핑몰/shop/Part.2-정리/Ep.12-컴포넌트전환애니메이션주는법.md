# 멋있게 컴포넌트 전환 애니메이션 주는 법

애니메이션 만들고 싶으면

1. 애니메이션 동작 전 스타일을 담을 클래스 만들기
2. 애니메이션 동작 후 스타일을 담을 클래스 맏늘기
3. transiton 속성 추가
4. 원할 때 클래스 2번 탈부착

이게 끝입니다.

<br>

## 애니메이션 동작 전 , 동작 후 클래스 만들기

```css
.start {
    opacity: 0;
}
.end {
    opacity: 1;
}
```

동작전엔 투명도 0 , 동작 후엔 투명도 1이 되게 해줍니다.

<br>

## transition 추가

```css
.start {
    opacity: 0;
}
.end {
    opacity: 1;
    transition: opacity 0.5s;
}
```

부드러운 효과를 주기 위해 트랜지션 속성을 추가합니다.

<br>

## 4. 원할 때 end 부착

이제 버튼을 누를 때마다 end를 저기 부착해주세요 라고 코드 짜면 됩니다. <br>
버튼 누르면 end 부착하라고 코드 짜려면 버튼이 3개니까 3번이나 써야겠네요. <br>
그게 싫으면 useEffect 써도 됩니다. <br>

useEffect 쓰면 특정 state 아니면 props 가 변할 때 마다 코드 실행이 가능하다고 했습니다. <br>
그래서 **탭이라는 state가 변할 때 end를 저기 부착해주세요** 라고 짜면 되겠네요.

```js
function TabContent({ 탭 }) {
    let [fade, setFade] = useState('');

    useEffect(() => {
        setFade('end');
    }, [탭]);

    return <div className={'start ' + fade}>{[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭]}</div>;
}
```

탭이라는게 변할 때 end를 저기 부착하고 싶으면 동적인 UI 만드는법 떠올리면 됩니다.

-   fade state 하나 만들고
-   state에 따라서 className이 어떻게 보일지 작성하고
-   원할 때 fade를 변경했습니다.

이제 탭이라는 state가 변할 때마다 fade라는 state에 end가 추가되고, 그럼 className="start end" 이렇게 됩니다. <br>

### ? 안되는데요

end라는 클래스명을 부착한건 맞는데 실은 떼었다가 붙여야 애니메이션이 보입니다.

<br>

```js
function TabContent({ 탭 }) {
    let [fade, setFade] = useState('');

    useEffect(() => {
        setTImeout(() => {
            setFade('end');
        }, 100);
        return () => {
            setFade('');
        };
    }, [탭]);

    return <div className={'start ' + fade}>{[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭]}</div>;
}
```

떼었다가 부착하라고 짰습니다. <br>
clean up function 안에 fade라는 state를 공백으로 바꾸라고 했으니 useEffect 실행 전엔 end가 '' 로 바뀝니다.

<br>

### setTimeout 왜 쓰나요

리액트 18 이상 부터는 **automtic batch** 라는 기능이 생겼습니다. <br>
state 변경함수들이 연달아서 여러개 처리 되어야 한다면 <br>
state 변경함수를 다 처리하고 마지막에 한번만 재렌더링 됩니다. <br>
그래서 end로 변경하는거랑 '' 로 변경하는거랑 약간의 시간차를 두었습니다. <br>
찾아보면 flushSync() 이런거 써도 될듯합니다.

<br>

### 컴포넌트 로드 시 투명도가 0에서 1로 증가하는 애니메이션을 주려면?

```js
function Detail(props){

  let [fade2, setFade2] = useState('')

  useEffect(()=>{
    setFade2('end')
    return ()=>{
      setFade2('')
    }
  },[])

    return (
      <div className={'container start ' + fade2}>
    )
}
```
