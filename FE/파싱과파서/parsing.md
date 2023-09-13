# 파싱 (Parsing) & 파서 (Parser)

## 파싱 (구문 분석)

- 하나의 프로그램을 런타임 환경 (브라우저 내 자바스크립트 엔진) 이 실제로 행할 수 있는
내부 포맷으로 분석하고 변환하는 것을 의미.

⇒ 즉, 파싱은 문서의 내용을 **토큰** 으로 분석하고, 문법적 의미와 구조를 반영한 **파스트리** 를 생성하는 과정.
- 웹 상에서 주어진 정보를 내가 원하는 형태로 가공하여 서버에서 불러들이는 것
- 문서나 html 에서 내가 원하는 데이터를 특정 패턴이나 순서로 추출해 가공하는 것

토큰 : 언어가 사용하는 기본 단어를 말함. 토큰은 구문적으로 의미를 갖는 최소의 단위이며 우리가 작성하는 프로그램은 모두 이러한 토큰으로 이루어짐.

```java
public static void main(String [] args{ ... }
```

위 코드에서 토큰은 public , static , void main, (String, [], args , {} 등임.

공백문자 (스페이스 , 탭문자 , 개행문자 등) 들은 문자열 내에서 사용되는 경우가 아닌 이상 모두

**아무런 의미를 가지지 않음.**

파스트리 : 어떤 문장을 트리구조로 나타낸 것을 의미. 파스트리 , 파싱트리, 어원트리 등 모두 같은 말.

## 파서

- 컴파일러의 일부
- 파싱을 하는 프로세서 ⇒ 파서 (파서가 파싱 작업을 함.)

주로 문법적인 오류를 찾아내거나 입력된 데이터를 의미 있는 정보로 변환하는데 사용됨.
- 웹 개발에서의 파싱과 파서는 주로 HTML , XML , JSON 등의 형식으로 작성된 데이터를 처리하는데 사용.

### 참고

[https://hengbokhan.tistory.com/134](https://hengbokhan.tistory.com/134)

[https://velog.io/@iamhyunji/용어-파싱Parsing](https://velog.io/@iamhyunji/%EC%9A%A9%EC%96%B4-%ED%8C%8C%EC%8B%B1Parsing)

[https://solog4something.tistory.com/13](https://solog4something.tistory.com/13)

[https://blog.binple.net/98](https://blog.binple.net/98)

[https://velog.io/@bcl0206/용어정리-파싱Parsing-파서Parser](https://velog.io/@bcl0206/%EC%9A%A9%EC%96%B4%EC%A0%95%EB%A6%AC-%ED%8C%8C%EC%8B%B1Parsing-%ED%8C%8C%EC%84%9CParser)

[https://tilkoblet.tistory.com/105](https://tilkoblet.tistory.com/105)