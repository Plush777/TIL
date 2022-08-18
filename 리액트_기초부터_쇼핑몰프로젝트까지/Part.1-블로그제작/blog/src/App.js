import { useState } from 'react';
import './App.css';

function App() {
    let [title, setTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
    let [thumbsUp, setThumbsup] = useState(0);
    let [modal, setModal] = useState(false); //state 이전값

    const modalToggle = () => {
        setModal((modal) => !modal);
        /* modal state의 이전 값을 가져와서 modal state의 값을 반대로 바꿉니다.
        (false -> true)*/
        
        /* ---------------------------
        updater 함수를 전달하면 updater 함수 안에서 이전 state 값에 접근할 수 있습니다.
        setState 호출은 일괄적으로 처리되기 때문에 여러 업데이트 사항이 충돌 없이 차례대로
        반영되도록 합니다.

        https://ko.reactjs.org/docs/faq-state.html
        ----------------------------- */
    }

    return (
        <div className="App">
            <header className="black-nav">
                <h4>React Blog</h4>
            </header>
            <div className="list">
                <button onClick={() => {
                    let copy = [...title];
                    copy.sort();
                    setTitle(copy);

                }}>가나다순 정렬</button>
                <h4>
                    {title[0]}
                    <span
                        onClick={() => {
                            setThumbsup(thumbsUp + 1);
                        }}
                    >
                        👍
                    </span>
                    {thumbsUp}
                    <button onClick={() => {
                        let copy = [...title];
                        copy[0] = '여자코트 추천';
                        setTitle(copy);
                    }}>수정</button>
                </h4>
                <p>2월 17일 발행</p>
            </div>
            <div className="list">
                <h4>{title[1]}</h4>
                <p>2월 17일 발행</p>
            </div>
            <div className="list">
                <h4 onClick={() => modalToggle()}>{title[2]}</h4>
                <p>2월 17일 발행</p>
            </div>

            {
                modal === true ? <Modal/> : null
            }
        </div>
    );
}

function Modal(){
    return(
        <div className="modal">
            <h4>제목</h4>
            <p>날짜</p>
            <p>상세내용</p>
        </div>
    )
}

export default App;
