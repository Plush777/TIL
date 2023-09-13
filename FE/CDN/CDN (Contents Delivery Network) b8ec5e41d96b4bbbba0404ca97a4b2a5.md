# CDN (Contents Delivery Network)

지리, 물리적으로 떨어져 있는 사용자에게 컨텐츠를 더 빠르게 제공할 수 있는 기술.

## CDN 동작 방식

### 캐싱의 종류

- 정적 캐싱: CDN에 미리 컨텐츠를 보내놓는다.
- 동적 캐싱 : 손님 방문 시 손님이 원하는 내용이 CDN에 없으면 보내기

### 여기서 컨텐츠란?

컨텐츠는 동적 컨텐츠와 정적 컨텐츠로 나눌 수 있다.

- 정적 컨텐츠 : HTML , 이미지 파일 , 동영상 등의 바이너리 데이터 고정 된 컨텐츠
- 동적 컨텐츠 : API 조회 결과 등 (게시판의 최신 글) 유동적인 컨텐

## 물리적 거리

서버가 한국에 있는 사이트에 한국 뿐 아니라 미국,호주,유럽 등 전세계 각지에서 사람들이 내 웹 사이트를 방문한다고 생각해보세요.

한국에서 접속하면 빠르겠지만, 미국이나 호주,유럽에서 접속하면 이미지가 늦게 뜨거나 로딩이 길거나 하겠죠.

이러한 부분들이 사용자 측면에서의 불편함이라면 서버는 또 서버 입장에서의 문제가 있습니다.

여기저기서 들어오는 수많은 요청들을 감당해야 하는것이죠.

그래서 글로벌한 사이트에서는 이런 요청들을 여러곳에다 분산 시켜서 처리해요. 여기에 쓰이는 대표적인 기술이 바로 CDN 입니다.

CDN은 컨텐츠 전달이라는 용도에 특화된 것이라고 보시면 됩니다.

어느 한 사이트가 한 CDN 업체의 서비스를 사용한다고 예시를 들어볼게요.

이 CDN 업체는 전세계 곳곳에 서버를 두고 있죠. 미국에 사는 존 이라는 한 백수가 우연히 해당 사이트에 접속하게 됩니다.

존의 컴퓨터는 이제 한국 서버가 아니라 북미에 있는 그 업체의 CDN 서버로 요청을 보내게 됩니다.

이 CDN 서버에는 해당 사이트의 각종 이미지나 기타 정적 요소들이 상당수 저장, 캐싱이 되어있죠.

존은 한국 서버까지 요청을 보내서 거기서 또 태평양 너머로 이미지를 받아오는 게 아니라 

북미지역에 있는 이 CDN 서버와 소통하기 때문에 보다 빠르게 해당 사이트를 이용할 수 있겠죠.

각 지역의 담당 CDN 서버, 체인점들이 커버를 해주니까 전에 비해 서버부담이 훨씬 덜 하기도 합니다.

※ 체인점과 같이 세계각지의 서버를 Edge 라고 부릅니다.

## 부하분산

사용자의 요청이 증가하고 트래픽이 갑자기 증가하거나 Contents양이 증가하는 경우 웹서버의 부하가 집중되어 서비스 안정성이 저해되고 장애가 발생할 가능성이 있습니다. 이떄 CDN도입을 통해 WebServer의 부하를 줄일 수 있습니다.

물리적 거리 뿐만 아니라 특정지역에 너무 많은 요청이오면 엣지들의 헬스 체크를해서 다른곳으로 요청을 보낼수도있다. 그래서 부하분산이 가능합니다.

## CDN 도입의 장점

### CDN 업체에 나가는비용도 있지만 본서버 돌리는 비용이 줄어든다.

서버로직접 요청되지 않기 때문에 **대역폭** 비용이 크게 절감된다.

즉 본사로 직접 요청이 오지않기떄문에 오리지날 서버로 가는길을 넓게 깔 필요가없다는것이다.

이런측면에서 서버호스팅 비용이절감됩니다.

🍧**대역폭이란?**

주어진 시간안에 데이터 얼마나 많이 실려지고 보내질수있는지이다.

컴퓨터 네트워크에서 데이터 빨리보내는지를 보려면 전송속도랑 대역폭이 얼마나되는지보는데

도로가있는데 전송속도는 이도로의 제한속도이고

대역폭은 차선이다.

대역폭이 넓다면 같은속도에서도 많은 데이터가 실려갈수있는것이다.

전송속도는 물리적거리를 얼마나 빠르게 이동하는가

대역폭은 동시에 얼마나 많은 데이터가 오고갈수있는가

### **가용성과 안전성도 증가된다.**

본서버가받는 부담이덜어지니까 과부하로인한 오류도줄어들고

하나의엣지가 이상이생겨도 다른엣지로 연결되기떄문에 보다 안정적인서비스를 제공할 수 있다.

※ 헬스체크 : 잘돌고있는지 꾸준히 관리를해준다.

**보안**

Ddos 공격 지정되는시간에 좀비 떼 들마냥 몰려가서 요청을 많이하면 서버가다운되지만

분산처리를 하기때문에 조금더 버틸수있고 또 CDN에 정상적인 요청과 비정상적인 요청을 구분해내어

특정시점의 요청수를 제한하거나 집중된요청을 분산시키는등 Ddos에대해 무력화 시킬 방법을가지고있다.

CDN이 탱커 역할을 해줍니다.

CDN 서비스 종류

- AWS CloudFront
- Azure
- 네이버 클라우드

## 참고

[https://cwangg897.tistory.com/93](https://cwangg897.tistory.com/93)

[https://www.youtube.com/watch?v=_kcoeK0ITkQ](https://www.youtube.com/watch?v=_kcoeK0ITkQ)