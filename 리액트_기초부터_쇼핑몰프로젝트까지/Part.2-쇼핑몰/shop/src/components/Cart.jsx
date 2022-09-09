import {Table} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import {modifyCartData} from '../store'
import {useState,memo} from 'react'

//꼭 필요할 때만 재렌더링
let Child = memo(function(){
    console.log('재렌더링됨')
    return <div>자식임</div>
})

function Cart() {

    let cartStore = useSelector(state => state); //store에 있던 state를 전부 가져옴
    let dispatch = useDispatch() //store.js 로 요청보내주는 함수
    let [count, setCount] = useState(0)

    console.log(cartStore)

    return ( 
        <>
            <Child count={count}/>
            <button type='button' onClick={() => {setCount(count+1)}}>+</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartStore.cartData.map((a , i) => {
                            return (
                                <tr key={i}>
                                    <td>{a.id}</td>
                                    <td>{a.name}</td>
                                    <td>{a.count}</td>
                                    <td><button onClick={() => dispatch(modifyCartData(cartStore.cartData[i].id))}>+</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table> 
        </>
    );
}

export default Cart;