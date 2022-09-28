import styled from 'styled-components';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, plusStock, changeAge, addCart } from '../store';
import {Link} from 'react-router-dom';




function Detail(props) {

  
  let state = useSelector((state) => { return state.stock })

  let dispatch = useDispatch();

  let [alert1, setAlert1] = useState(true);
  let [num, setNum] = useState(1)
  let [tab, setTab] = useState(0)
  let [fade2, setFade2] = useState();

  let { id } = useParams();
  const coffee = props.coffee.find((x) => {
    return x.id == id;
  })

  useEffect(() => {

    var watched = JSON.parse(localStorage.getItem('watched'));
    watched.push(coffee.id); 
    watched = new Set(watched);
    watched = Array.from(watched);
    localStorage.setItem('watched', JSON.stringify(watched))

    localStorage.setItem('exist', true);

  }, [])

  useEffect(() => {
    setTimeout(() => { setAlert1(false) }, 2000)
  }, [])


  useEffect(() => {
    setTimeout(() => { setFade2('end'); }, 100);

    return () => {
      setFade2('');
    }
  }, [])


  useEffect(() => {
    if (isNaN(num) == true) {
      alert('숫자를 입력하세요')
    }
  }, [num])


  let [count, setCount] = useState(0);

 


  return (
    <Container className={'start ' + fade2}>
      {
        alert1 == true ? <div className='alert alert-warning'>
          2초이내 구매시 할인
        </div> : null
      }
      {/* {count}
        <button onClick={()=>{
            setCount(count+1);
        }}>버튼</button> */}
      {/* <YellowBtn bg="blue">button</YellowBtn> */}
      <Row className='mt-2'>
        <Col md={6}>
          <img src={process.env.PUBLIC_URL + '/img/coffee' + (coffee.id + 1) + '.webp'} width="80%" alt='i' />
        </Col>
        <Col className="mt-4" md={6}>
          <input type="text" placeholder="수량" onChange={(e) => { setNum(e.target.value) }}></input>
          <h4 >{coffee.title}</h4>
          <p>{coffee.content}</p>
          <p>{coffee.price}</p>
          <Link to='/cart/'><button  className="btn btn-danger" onClick={(e) => {
            var newOne = { id: coffee.id, name: coffee.title, count: Number(num) }
            
            dispatch(addCart(newOne));

          }}>주문하기</button></Link>
        </Col>
      </Row>
      <Nav variant='tabs' defaultActiveKey='link-0'>
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={() => {
            setTab(0);
          }}>버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={() => {
            setTab(1);
          }}>버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={() => {
            setTab(2);
          }}>버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </Container>
  )
}

function TabContent(props) {
  // if(props.tab ===0){
  //   return(
  //     <div>내용0</div>
  //     )
  // }
  // if(props.tab ===1){
  //   return(
  //     <div>내용1</div>
  //     )
  // }
  // if(props.tab ===2){
  //   return(
  //     <div>내용2</div>
  //     )
  // }
  let [fade, setFade] = useState();
  useEffect(() => {
    setTimeout(() => { setFade('end'); }, 100);

    return () => {
      setFade('');
    }
  }, [props.tab])

  return <div className={'start ' + fade}>
    {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.tab]}
  </div>
}

export default Detail;