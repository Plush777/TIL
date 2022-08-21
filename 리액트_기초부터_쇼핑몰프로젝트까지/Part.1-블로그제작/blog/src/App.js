import { useState } from 'react';
import './App.css';

function App() {
    let [title, setTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
    let [thumbsUp, setThumbsup] = useState([0, 0, 0]);
    let [modal, setModal] = useState(false); //state 이전값
    let [modalTitle, setModalTitle] = useState(0);
    let [input, setInput] = useState('');

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

            {modal && <Modal bgColor={'skyblue'} titleProp={title} modalProp={setTitle} modalTitleProp={modalTitle}/>}

            {title.map((a, i) => {

                const titleModfy = () => {
                    let writingModfiy = [...title];
                    writingModfiy[i] = '수정됐어!';
                    setTitle(writingModfiy);
                }

                const addThumbsUp = () => {
                    let copy = [...thumbsUp];
                    copy[i]++;
                    setThumbsup(copy);
                }

                const titleDelete = () => {
                    let writingDelete = [...title];
                    writingDelete.shift();
                    setTitle(writingDelete);
                    console.log(title);
                }

                const today = () => {
                    let date = new Date();
                    let todayYear = date.getFullYear();
                    let todayMonth = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
                    let todayDate = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();

                    return todayYear + '년' + todayMonth + '월' + todayDate + '일';
                }

                return (
                    <div className="list" key={i}>
                        <div className="list-head">
                            <h4 onClick={() => {
                                modalToggle();
                                setModalTitle(i);
                            }}>{a}</h4>
                            <button type="button" className='btnThumbsUp' onClick={() => {addThumbsUp();}}>
                                <span>👍{thumbsUp[i]}</span>
                            </button>
                            <button type='button' className='btnModify' onClick={() => {titleModfy();}}>
                                <span>✍️</span>
                            </button>
                            <button type='button' className='btnDelete' onClick={() => {titleDelete();}}>
                                <span>🗑️</span>
                            </button>
                        </div>
                        <div className="list-bottom">
                            <p>{today().toString()}</p>
                        </div> 
                    </div>
                );
            })}

            <Input setInput={setInput} titleProp={title} inputProp={input} setTitleProp={setTitle}
            thumbsUpProp={thumbsUp} setThumbsupProp={setThumbsup}/>
        </div>
    );
}

//es6 구조분햐 할당 문법으로 굳이 앞에다가 props 안적어도 됨!
function Modal({bgColor, titleProp, modalProp, modalTitleProp}) {
    const modalBackground = bgColor;
    const listTitle = titleProp;
    const modalListTitle = modalProp;
    const modalTitle = modalTitleProp;

    return (
        <div className="modal" style={{backgroundColor: modalBackground}}>
            <h4>{listTitle[modalTitle]}</h4>
            <p>날짜</p>
            <p>상세내용</p>
            <button type='button' onClick={() => {
                let modalTitleModfiy = [...listTitle];
                modalTitleModfiy[0] = '모달창 타이틀도 수정됐어!';
                modalListTitle(modalTitleModfiy);
            }}>
                <span>✍️</span>
            </button>
        </div>
    );
}

function Input({ setInput , titleProp , inputProp , setTitleProp , thumbsUpProp , setThumbsupProp}){
    const textChange = setInput; //input state 변경함수
    const listTitle = titleProp; //App에서 title state
    const inputValue = inputProp; //App에서 input state
    const addTitle = setTitleProp; //App에서 title state 변경함수
    const currentThumbsUp = thumbsUpProp; //App에서 thumbsUp state
    const addThumbsUp = setThumbsupProp; //App에서 thumbsUp state 변경함수

    const inputOnChange = (e) => {
        textChange(e.target.value);
        console.log(textChange);
    }
    
    const inputOnSubmit = () => {
        if(inputValue === ''){
            alert('제목을 입력해주세요!');
            return;
        }

        let currentValue = [...listTitle];
        console.log(currentValue);
        currentValue.unshift(inputValue);
        console.log(currentValue);
        addTitle(currentValue);

        let thumbsUpValue = [...currentThumbsUp];
        thumbsUpValue.push(0);
        addThumbsUp(thumbsUpValue);

        textChange('');
    }

    return (
        <div className='inputGroup'>
            <input type='text' onChange={inputOnChange}/>
            <button type='button' className='btnSubmit' onClick={inputOnSubmit}>등록</button>
        </div>
    )
}

export default App;
