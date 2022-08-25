import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Detail from './components/Detail';
import Main from './components/Main';
import About from './components/About';
import Event from './components/Event';

function App() {
    let navigate = useNavigate();

    return (
        <div className="App">
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
                <Route path="/" element={<Main/>} />
                <Route path="detail" element={<Detail/>} />
                {/* 설정한 route 이 외에 경로 입력 시 안돼돌아가 가 출력됨! */}
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

export default App;
