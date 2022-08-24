import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import Detail from './components/Detail';
import Main from './components/Main';

function App() {
    return (
        <div className="App">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
						<Link to='/'>홈</Link>
						<Link to='/detail'>상세 페이지</Link>
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="detail" element={<Detail/>} />
            </Routes>
        </div>
    );
}

export default App;
