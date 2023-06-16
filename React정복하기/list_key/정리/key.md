# React List와 Key의 중요성. 디버깅의 악몽을 피하자!

https://www.youtube.com/watch?v=QC3PtSlzp3s&t=148s

```js
const App = () => {
	const [inputValue,setInputValue] = useState('');
	const [list, setList] = useState(['리액트','리덕스']);

    const addToList = () => {
        setList((prevList) => {
            return [inputValue, ...prevList];
        });
        setInputValue('');
    }

  return (
    <>
		<input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={addToList}>추가</button>
        <ul>
            {list.map((item) => {
                return <li>{item}</li>
            })}
        </ul>
    </>
  );
}
```

사용자가 input을 통해 값을 입력하면 값이 inputValue state에 저장이 되고, 추가 버튼을 누르면 입력한 값을 가져와서 항목을 추가해주는 코드입니다.

map 함수를 이용해서 반복 시켜주는데, 여기서 우리는 한가지 에러를 마주하게 됩니다.

![image](https://user-images.githubusercontent.com/87457620/198014198-4bb132fc-98e6-4fa5-86b6-7eb3ec143b71.png)

map 함수 안에 있는 요소의 고유한 key값이 없어서 생기는 오류입니다. 근데 사실 오류가 떠도 작동은 잘 되니 별 문제없이 넘어가도 되겠지만, 성능 개선을 위해서라면 무조건 해결해야하는 오류입니다.


![image](https://user-images.githubusercontent.com/87457620/198016171-4414130d-3793-4d6e-bcf3-ec83214aa0ea.png)


key 값 없이 동작시키면 항목이 추가 될 때마다 위 처럼 li 전체가 렌더링이 되버립니다. 

이러한 이유는 key값을 부여해서 정확히 어떤 항목이 업데이트 됬는지 리액트한테 알려주어야 하는데, key가 없으니 어떤게 업데이트 됬는지 모르니까 그냥 전체 렌더링을 시켜버리는 것이죠.

이 리스트가 몇개만 있으면 상관 없겠지만, 1000개 아니 1만개가 있다고 가정한다면 상당한 비용을 요구를 하겠죠.

```js
<ul>
    {list.map((item) => {
        return <li key={item}>{item}</li>
    })}
</ul>
```

그래서 항상 map 함수 자식에는 key가 무조건 들어가야합니다.

<br>


![image](https://user-images.githubusercontent.com/87457620/198017107-ec6310ec-52f4-4dfe-a63a-64145e8a8de0.png)

key 값을 주고, 다시 확인해보면 위처럼 전체가 렌더링이 되지않고 추가한 항목만 정확히 렌더링이 되는걸 볼 수가 있죠.

<br>

## key값에 index값을 넣지마세요

map 함수는 두 개의 인자를 받을 수 있습니다.

첫 번째 인자는 배열에 들어있는 하나하나의 데이터,
두번째 인자는 0,1,2,3 이런식으로 1씩 증가하는 정수가 들어있죠.

```js
<ul>
    {list.map((item,index) => {
        return <li key={index}>{item}</li>
    })}
</ul>
```

위처럼 key값에 index값을 주게 되면 성능에 영향을 미치게됩니다. <br>
왜 그럴까요? 리액트 공식 문서에 따르면, index값을 key로
전달해주는 것을 최대한 지양하라고 나와있습니다.

key로 index값을 주고 실행을 해볼게요.


![image](https://user-images.githubusercontent.com/87457620/198018789-4f144522-162f-4551-834b-69ceed6056bb.png)

초기 화면에선 리액트의 key는 0 , 리덕스의 key는 1을 가지고 있겠죠. 이 상태에서 새로운 항목을 추가하면?

<br>

![image](https://user-images.githubusercontent.com/87457620/198019000-7d5a4346-120f-44c1-bbab-dc3f093b6651.png)

key값을 안줬을 때처럼 또 전체 렌더링이 되버립니다.
이러는 이유는 index라는 값은 안정적이지 않습니다.

![image](https://user-images.githubusercontent.com/87457620/198019425-e7b39c30-2b05-4dae-9088-4c0a24afa13a.png)

원래 리액트 항목의 key는 0이고 리덕스 항목의 key는 1이였는데, 항목을 추가해버리면 key값이 바뀌어버리는 것이죠.

이렇게 되면 <br>

리액트 (key 0) <br>
리덕스 (key 1)

에서

타입스크립트 (key 0) <br>
리액트 (key 1) <br>
리덕스 (key 2) <br>

이런식으로 key값이 고유 , 안정적이지 않고 계속 바뀌어버려서 어떤 항목이 업데이트 됬는지 정확히 알 수가 없기때문에 전체 렌더링을 해버리는거예요.

만약 리스트가 변경이 되지 않는 정적인 리스트면 key 값을 index로 주어도 상관이 없어요. 하지만 항목이 추가되거나 삭제되는 등, 동적인 리스트라면 key값은 무조건 고유한 값으로 넣어주어야 합니다.

<br>

## 값이 중복될 때

![image](https://user-images.githubusercontent.com/87457620/198020938-ac324a67-6d12-40c1-89f8-a59f310d55f8.png)

위와 같이 이름이 같은 항목을 추가해주었는데, 콘솔에 이상한 에러가 떴습니다.

![image](https://user-images.githubusercontent.com/87457620/198021080-58c3483f-545b-4c6a-8745-a8f0c47ef51e.png)

서로 중복 된 key 값이 있기 때문에 뜨는 오류인데요. key는 아까 말씀드렸다시피 고유해야 하기 때문에 중복이 되어서는 안됩니다.

그러면 어떻게 해야할까요?

<br>

## 객체 형태로 key 값을 전달해주자

```js
const App = () => {
	const [inputValue,setInputValue] = useState('');
	const [list, setList] = useState([
        {
            id: 1,
            value: '리액트'
        },
        {
            id: 2,
            value: '리덕스'
        }
    ]);

    const addToList = () => {
        setList(() => {
            return [{
                id: list.length + 1,
                value: inputValue
            },
            ...list,
        ]
        });
        setInputValue('');
    }

  return (
    <>
		<input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={addToList}>추가</button>
        <ul>
            {list.map((item) => {
                return <li key={item.id}>{item.value}</li>
            })}
        </ul>
    </>
  );
}
```

위처럼 객체 형태로 key 값을 전달해주면 됩니다. 한번 이렇게 수정하고, 다시 항목을 추가해보세요.

![image](https://user-images.githubusercontent.com/87457620/198022425-7cd8209b-2074-4f51-b752-13b9e828857c.png)

![image](https://user-images.githubusercontent.com/87457620/198022500-cc1e6065-8021-4827-952c-aa2c26084191.png)

위처럼 항목을 추가하면 추가한 항목만 렌더링이 되고, 값이 중복되도
오류가 나지 않는 것을 확인할 수가 있죠. 객체로 고유의 id를 key 값으로 넘겨주었기 때문에 그렇습니다.