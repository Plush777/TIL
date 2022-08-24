import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import data from './data';
import { Routes, Route, Link } from 'react-router-dom';
import Detail from './components/Detail';

function App() {
    let [shoes] = useState(data);

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
                    }
                />
                <Route path="detail" element={<Detail/>} />
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
