import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Detail from './components/Detail';
import About from './components/About';
import Event from './components/Event';
import Cart from './components/Cart';
import data from './data';
import { createContext, useState } from 'react';
import GlobalStyle from './components/GlobalStyle';
import axios from 'axios';
import { useQuery }  from '@tanstack/react-query' ;

export let Context1 = createContext();

function App() {
    let navigate = useNavigate();
    let [shoes,setShoes] = useState(data);
    let [clickCount,setClickCount] = useState(0);
    let [stock] = useState([10, 11, 12]);

    const clickCounter = () => {
        setClickCount(clickCount + 1);
    }
    
    const getData1 = () => {
        clickCounter();
        axios.get('https://codingapple1.github.io/shop/data2.json').then((res) => {
            console.log('1번째 데이터 : ' , res.data);
            let copy = [...shoes , ...res.data];
            setShoes(copy);
        }).catch(() => {
            console.log('1번째 데이터 불러오기 실패')
        })
    }

    const getData2 = () => {
        clickCounter();
        axios.get('https://codingapple1.github.io/shop/data3.json').then((res) => {
            console.log('2번째 데이터 : ' , res.data);
            let copy = [...shoes , ...res.data];
            setShoes(copy);
        }).catch(() => {
            console.log('2번째 데이터 불러오기 실패')
        })
    }

    let result = useQuery(['query'], () => {
        return axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
            console.log('요청됨')
            return a.data;
        })
    })

    return (
        <div className="App">
            <GlobalStyle/>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => { navigate('/') }}>홈</Nav.Link>
                        <Nav.Link onClick={() => { navigate('/detail') }}>상세 페이지</Nav.Link>
                        <Nav.Link onClick={() => { navigate('/cart')}}>장바구니</Nav.Link>
                    </Nav>
                    <Nav className='ms-auto'>
                        <p style={{color:'white'}}>
                            {result.isLoading && '로딩중'}
                            {result.error && '에러남'}
                            {result.data && result.data.name}
                        </p>
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={
                    <>
                        <div className="main-bg"></div>
                        <div className="container">
                            <div className="row">
                                {shoes.map((data, index) => {
                                    return (
                                        <ShoesList shoes={data} key={index} />
                                        //shoes={data} 파라미터로 data 자체를 넘김
                                        //shoes=shoes[index] map 반복문 index 값을 찾아서 넘김
                                    );
                                })}
                            </div>
                        </div>

                        {
                            clickCount === 0 && <button className="btnMore" onClick={getData1}>더보기</button>
                        }
                        {
                            clickCount === 1 && <button className="btnMore" onClick={getData2}>더보기</button>
                        }
                    </>
                } />
                <Route path="/detail/:id" element={
                    <Context1.Provider value={{stock,shoes}}>
                         <Detail shoes={shoes}/>
                    </Context1.Provider>
                } />
                <Route path="*" element={<div>안돼 돌아가</div>} /> 
                <Route path="/about" element={<About/>}>
                    <Route path='member' element={<div>멤버임</div>}/>
                    <Route path='location' element={<div>위치정보임</div>}/>
                </Route>

                <Route path="/event" element={<Event/>}>
                    <Route path='one' element={<div>사실 없음 ㅎ</div>}/>
                    <Route path='two' element={<div>진짜 없음</div>}/>
                </Route>

                <Route path="/cart" element={<Cart/>}>
                
                </Route>
            </Routes>
        </div>
    );
}

function ShoesList({ shoes }) {
    const shoesData = shoes;

    return (
        <div className="col-md-4">
            <img src={shoesData.img} alt={shoesData.alt} width="80%" />
            <h4>{shoesData.title}</h4>
            <p>{shoesData.price}</p>
        </div>
    );
}

export default App;
