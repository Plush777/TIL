import { useParams } from "react-router-dom";
import styled from 'styled-components';

const Container = styled.div`
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

const ProductsButton = styled.button`
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

function Detail({ shoes }) {
    const shoesData = shoes;

    let {id} = useParams();
    id = parseInt(id); //문자 -> 숫자로 변환
    let searchData = shoesData.find(x => x.id === id);

    return (  
        <Container>
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
                    </ProductsInfo>  
                </Item>
            </ItemRow>
        </Container>
    );
}

export default Detail;