# styled-components 쓰면 CSS 파일 없어도 되는데

컴포넌트가 많은 경우 스타일링을 하다보면 불편함이 생기는데

1. class 만들어놓은걸 까먹고 중복해서 또 만들거나
2. 갑자기 다른 이상한 컴포넌트에 원하지않는 스타일이 적용되거나
3. CSS 파일이 너무 길어져서 수정이 어렵거나

이런 경우가 있습니다. <br>
그래서 스타일 바로 입혀서 컴포넌트를 만들 수도 있는데 <br>
styled-components 라는 라이브러리 설치해서 쓰면 됩니다.

<br>

## 설치부터

`npm install styled-components` 로 설치합니다.

```js
import styled from 'styled-components';
```

그리고 사용하고 싶은 컴포넌트 맨위에 이런걸 import 해와야합니다.

<br>

## styled-components 기본적인 사용법

이 라이브러리 사용하면 **컴포넌트 만들 때 스타일을 미리 주입해서** 만들 수 있습니다.

```js
import styled from 'styled-components';

let Box = styled.div`
    padding: 20px;
    color: grey;
`;
let YellowBtn = styled.button`
    background: yellow;
    color: black;
    padding: 10px;
`;

function Detail() {
    return (
        <div>
            <Box>
                <YellowBtn>버튼임</YellowBtn>
            </Box>
        </div>
    );
}
```

1. `<div>` 하나 만들고 싶으면 styled.div 라고 쓰면 됩니다.
2. 오른쪽에 벡틱기호 넣어서 CSS 스타일을 넣습니다.
3. 그럼 그 자리에 컴포넌트를 남겨주는데 변수에 저장해서 쓰면 됩니다.

장점 1 : JS에서 바로 스타일 넣을 수 있습니다. <br>
장점 2 : 여기 적은 스타일이 다른 JS 파일로 오염되지 않습니다. <br>
장점 3 : 페이지 로딩시간이 단축됩니다. <br>
왜냐면 저기 적은 스타일들은 html 페이지의 `<style>` 태그로 넣어줘서 그렇습니다. <br><br>

## 실은 일반 CSS도 오염방지 가능

그냥 CSS 파일에서도 다른 JS 파일에 간섭하지 않는 모듈화 기능을 제공하는데 <br>
`컴포넌트명.module.css` <br>
이렇게 작명하면 됩니다. <br>
그리고 컴포넌트명.js 파일에서 import 해서 쓰면 그 스타일들은 컴포넌트명.js 파일에만 적용됩니다.

<br>

## props로 재활용가능

여러가지 비슷한 UI가 필요하면 어떻게 하나요. <br>
예를 들면 지금 노란 버튼말고 오렌지색 버튼이 필요해지면? <br>

```js
import styled from 'styled-components';

let YellowBtn = styled.button`
    background: ${(props) => props.bg};
    color: black;
    padding: 10px;
`;

function Detail() {
    return (
        <div>
            <YellowBtn bg="orange">오렌지색 버튼임</YellowBtn>
            <YellowBtn bg="blue">파란색 버튼임</YellowBtn>
        </div>
    );
}
```

`${props => props.bg}` 이게 styled-components 에서의 props 뚫는 문법입니다. <br>
bg 부분은 자유롭게 작명하고 <br>
이제 컴포넌트 쓸 때 bg라는 props 를 입력가능합니다.

<br>

### ? 저거 ${ } 이건 무슨 문법임

자바스크립트 벡틱 따옴표 안에 적어도 문자를 만들 수 있는데 <br>
백틱으로 만든 문자 중간에 변수같은걸 넣고 싶을 때 `${변수명}` 이렇게 쓸 수 있습니다.

<br>

```js
let YellowBtn = styled.button`
    background: ${(props) => props.bg};
    color: ${(props) => (props.bg == 'blue' ? 'white' : 'black')};
    padding: 10px;
`;
```

위처럼 스타일 프로그래밍도 가능합니다.

<br>

## 물론 단점도 있습니다

단점1 : JS파일이 매우 복잡해집니다. <br>
그리고 이 컴포넌트가 styled인지 아니면 일반 컴포넌트인지 구분도 어렵습니다. <br>

단점2 : JS파일 간 중복 디자인이 많이 필요하면 어떡하나요. <br>다른 파일에서 스타일 넣은 것들 import 해서 쓰면 되는데 CSS 파일 쓰는거랑 별 차이가 없는 것 같네요<br>
