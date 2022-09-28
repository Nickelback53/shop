import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {changeName, plusStock, changeAge, deleteCart} from '../store';

function Cart() {

    let state = useSelector((state) => { return state.stock })
    let user = useSelector((state) => { return state.user })


    let dispatch = useDispatch();



    return (
        <div>
            <h6>{user.name} 의 장바구니</h6>
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
                    {state.map((a, i) => {
                        return <tr>
                                    <td>{i + 1}</td>
                                    <td>{state[i].name}</td>
                                    <td>{state[i].count}</td>
                                    <td><button onClick={()=>{
                                        dispatch(plusStock(state[i].id));
                                    }}>+</button></td>
                                    <td><button onClick={()=>{
                                        //console.log(state[i]);
                                        dispatch(deleteCart(state[i].id))
                                    }}>삭제</button></td>
                                </tr>
                    })

                    }
                </tbody>
            </Table>
        </div>
    )
}


export default Cart;