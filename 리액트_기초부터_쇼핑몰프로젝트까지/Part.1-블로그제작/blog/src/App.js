import { useState } from 'react';
import './App.css';

function App() {
    let [title, setTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
    let [thumbsUp, setThumbsup] = useState([0, 0, 0]);
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
    };

    return (
        <div className="App">
            <header className="black-nav">
                <h4>React Blog</h4>
            </header>
            {/* <button onClick={() => {
                    let copy = [...title];
                    copy.sort();
                    setTitle(copy);

                }}>가나다순 정렬</button> */}

            {modal === true ? <Modal /> : null}
            {title.map((a, i) => {
                return (
                    <div className="list" key={i}>
                        <div className="list-head">
                            <h4 onClick={() => {
                                if (i === 0) {
                                    modalToggle();
                                }
                            }}>{a}</h4>
                            <button type="button" className='btnThumbsUp' onClick={() => {
                                let copy = [...thumbsUp];
                                copy[i]++;
                                setThumbsup(copy);
                            }}>
                                <span>👍{thumbsUp[i]}</span>
                            </button>
                            <button type='button' className='btnModify' onClick={() => {
                                let writingModfiy = [...title];
                                writingModfiy[i] = '수정됐어!';
                                setTitle(writingModfiy);
                            }}>
                                <span>✍️</span>
                            </button>
                        </div>
                        <div className="list-bottom">
                            <p>2월 17일 발행</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function Modal() {
    return (
        <div className="modal">
            <h4>제목</h4>
            <p>날짜</p>
            <p>상세내용</p>
        </div>
    );
}

export default App;
