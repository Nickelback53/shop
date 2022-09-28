import './App.css';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from "react";
//import cf from './img/rawCoffee.jpeg';
import data from './data';
import { Routes, Route, Link, useNavigate, Outlet, json } from 'react-router-dom';
import Detail from './routes/Detail'
import Cart from './routes/Cart'
import axios from 'axios';
import OffCanvas from './routes/recentItem';

function App() {

  useEffect(() => {
    if (!localStorage.getItem('watched')) {
      localStorage.setItem('watched', JSON.stringify([]));
    }

  }, [])

  let [coffee, setCoffee] = useState(data);

  let navigate = useNavigate();

  let [clicked, setClicked] = useState(false);


  return (
    <div className="App">


      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">RawCoffeeStand</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Notice</Nav.Link>
            <Nav.Link onClick={() => {
              navigate('/about')
            }}>About</Nav.Link>
            <Nav.Link onClick={() => {
              navigate('/cart')
            }}>Cart</Nav.Link>
          </Nav>
          <Nav>
            {
              JSON.parse(localStorage.getItem('exist')) == true ? <OffCanvas name={coffee} /> : null
            }
          </Nav>
        </Container>
      </Navbar>
      {/* 이미지 가져오는 다른 방법
       <div className="main-bg" style={{backgroundImage:'url('+cf+')'}}></div> */}

      {/* 컴포넌트 만들지 않고 map 이용해서 한번에 만드는법
      <Row>
      {
        coffee.map((a, i)=>{
        return (  
        <Col>
          <img src= {process.env.PUBLIC_URL + '/img/coffee'+(i+1)+'.webp'} width="80%" alt='1'/>
          <h4>{a.title}</h4>
          <p>{a.content}</p> 
          <p>{a.price}</p> 
        </Col>
        
        
        )
        })
      }
      </Row> */}

      <Routes>
        <Route path='/' element={
          <>
            <div className="main-bg"></div>
            <Container>
              <Row>
                {
                  coffee.map((a, i) => {
                    return (
                      <Card coffee={coffee[i]} i={i}></Card>

                    )
                  })
                }
              </Row>
            </Container>
            <button onClick={() => {
              if (!clicked) {
                setClicked(true);
                //axios: fetch 에서 json 전환 단계를 건너뛴 라이브러리       
                axios.get('https://raw.githubusercontent.com/Nickelback53/ExampleData/main/data.json')
                  .then((result) => {

                    var newShoes = [...coffee, ...result.data];
                    console.log(newShoes);
                    setCoffee(newShoes);

                  })
                  .catch(() => {
                    console.log('fail')
                  })
              }else{
                alert('더 이상 자료가 없습니다.')
              }

            }}>더 보기</button>
          </>
        } />
        <Route path='/detail/:id' element={<Detail coffee={coffee} />} />


        <Route path="/cart" element={<Cart />}></Route>

        <Route path='*' element={<div>없는 페이지</div>} />
      </Routes>
    </div>


  );

}

function About(props) {
  return (
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event(props) {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}


/**
 * 카드 컴포넌트
 * @param {*} props 
 * @returns 
 */
function Card(props) {
  return (
    <Col sm={4} className='mt-5'>
      <Link to={'/detail/' + props.coffee.id}><img src={process.env.PUBLIC_URL + '/img/coffee' + (props.coffee.id + 1) + '.webp'} width="80%" alt='i' /></Link>
      <h4>{props.coffee.title}</h4>
      <p>{props.coffee.price} 원</p>
    </Col>
  )
}



export default App;
