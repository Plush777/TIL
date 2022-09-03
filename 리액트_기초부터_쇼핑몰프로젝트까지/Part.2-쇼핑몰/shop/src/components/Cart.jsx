import {Table} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import {modifyCartData} from '../store'

function Cart() {

    let cartStore = useSelector(state => state);
    let dispatch = useDispatch()

    console.log(cartStore)

    return ( 
        <>
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
                                    <td><button onClick={() => dispatch(modifyCartData())}>+</button></td>
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