import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import {Context1} from './../App';

const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
`

const ItemRow = styled.div`
    display: flex;
    align-items: center;
`

const Item = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`

const ProductsInfo = styled.div`
    display: flex;
    flex-direction: column;
`

const ProductsName = styled.h4`
    font-size: ${props => props.fz};
    color: ${props => props.color};
`

const ProductsButton = styled.button.attrs({type: 'button'})`
    width: 100%;
    height: ${props => props.btnHeight};
    padding: 0 10px;
    color: ${props => props.btnColor};
    font-size: ${props => props.btnFz};
    border-radius: 4px;
    background-color: ${props => props.btnBackground};
    transition: .3s ease-in-out;
    
    &:hover{
        background-color: ${props => props.btnBackground === '#dc3545' ? '#bb2d3b' : ''};
    }
`

const Alert = styled.div`
    position: absolute;
    top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: 500px;
    height: 50px;
    color: #fff;
    border-radius: 4px;
    background-color: #000;
`

const AlertType02 = styled(Alert)`
    
`

const Input = styled.input.attrs({type:'text'})`
    height: 35px;
    margin-top: ${props => props.mt};
    border: 1px solid #ddd;
    background-color: #fff;
`

function Detail({ shoes }) {

    let [alert,setAlert] = useState(true);
    let [newAlert,setNewAlert] = useState(false);
    let [isNum,setIsNum] = useState('');
    let [tab,setTab] = useState(0);
    let [fade,setFade] = useState('');
    let {stock} = useContext(Context1);

    useEffect(() => {
        let timer = setTimeout(() => {
            setAlert(false);
        },2000)

        if (isNaN(isNum) === true){
            setNewAlert(true);
        }
        return () => {
            clearTimeout(timer);
        }
    }, [isNum,newAlert]);

    //tab state가 변경이 될 때 end 클래스 부착하기
    useEffect(() => {
        let animationTimer = setTimeout(() => {
            setFade('end') //fade state에 end 문자열을 추가해주세요
        },100)

        return(() => {
            clearTimeout(animationTimer);
            setFade('') //위 코드 실행 전에 fade state를 빈 공간으로 먼저 치워주세요
        })
    },[tab])

    const shoesData = shoes;

    let {id} = useParams();
    id = parseInt(id); //문자 -> 숫자로 변환
    let searchData = shoesData.find(x => x.id === id);

    const inputCurrent = (e) => {
        setIsNum(e.target.value);
    }

    return (  
        <>
            <Container>
                {
                    alert === true ? (<Alert>2초이내 구매시 할인</Alert>) : null
                }
                {
                    newAlert === true ? (<AlertType02>숫자만 입력해주세요.</AlertType02>) : null
                }
                <ItemRow>
                    <Item>
                        <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" alt="" />
                    </Item>
                    <Item>
                        <ProductsInfo>
                            <ProductsName color="#000" fz="1.5rem">{searchData.title}</ProductsName>
                            <ProductsName color="#000" fz="1.1rem">{searchData.content}</ProductsName>
                            <ProductsName color="#000" fz="1rem">{searchData.price}</ProductsName>
                            <ProductsButton btnHeight="38px" btnColor="#fff" btnFz="1rem" btnBackground="#dc3545">주문하기</ProductsButton>
                            <Input onChange={inputCurrent} mt="10px" placeholder="숫자만 입력하세요"/> 
                        </ProductsInfo>  
                    </Item>
                </ItemRow>
            </Container>
            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={() => {setTab(0)}}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={() => {setTab(1)}}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={() => {setTab(2)}}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            {/* html 중간에 변수 넣기 */}
            <div className={`cont ${fade}`}>
                <TabContent shoes={shoes} tab={tab}/>
            </div>
        </>
    );
}

function TabContent({tab}){
    const tabCont = tab;
    let {stock} = useContext(Context1);
    
    if(tabCont === 0){
        return <div>{stock[0]}</div>
    } else if(tabCont === 1){
        return <div>내용1</div>
    } else if(tabCont === 2){
        return <div>내용2</div>
    }
}

export default Detail;