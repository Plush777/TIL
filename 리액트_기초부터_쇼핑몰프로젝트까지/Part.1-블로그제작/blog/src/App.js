import { useState } from 'react';
import './App.css';

function App() {
    let [title, setTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
    let [thumbsUp, setThumbsup] = useState(0);

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
                <h4>{title[2]}</h4>
                <p>2월 17일 발행</p>
            </div>

            <Modal></Modal>
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
