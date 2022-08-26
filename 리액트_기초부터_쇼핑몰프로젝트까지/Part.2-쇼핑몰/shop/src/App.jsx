import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Detail from './components/Detail';
import About from './components/About';
import Event from './components/Event';
import data from './data';
import { useState } from 'react';
import GlobalStyle from './components/GlobalStyle';

function App() {
    let navigate = useNavigate();
    let [shoes] = useState(data);

    return (
        <div className="App">
            <GlobalStyle/>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => { navigate('/') }}>홈</Nav.Link>
                        <Nav.Link onClick={() => { navigate('/detail') }}>상세 페이지</Nav.Link>
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
                    </>
                } />
                <Route path="/detail/:id" element={<Detail shoes={shoes}/>} />
                <Route path="*" element={<div>안돼 돌아가</div>} /> 
                <Route path="/about" element={<About/>}>
                    <Route path='member' element={<div>멤버임</div>}/>
                    <Route path='location' element={<div>위치정보임</div>}/>
                </Route>

                <Route path="/event" element={<Event/>}>
                    <Route path='one' element={<div>사실 없음 ㅎ</div>}/>
                    <Route path='two' element={<div>진짜 없음</div>}/>
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
