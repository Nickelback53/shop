import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Link} from 'react-router-dom';

function OffCanvas(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var watched = JSON.parse(localStorage.getItem('watched'));

  return (
    <>
      <Button variant="outline-light" onClick={handleShow} >
        최근 본 상품
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement='end' scroll= {true} backdrop = {false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>최근 본 상품</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {
                watched.map((a, i)=>{
                    return <><Link to={'/detail/'+ watched[i]}><img src={process.env.PUBLIC_URL + '/img/coffee' + (watched[i] + 1) + '.webp'} width="80%" alt='i' /></Link>
                            <div>{props.name[watched[i]].title}</div>
                        </>
                })
            }
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}


function Recent(){
    var watched = JSON.parse(localStorage.getItem('watched'));
    console.log(watched);

    return <Link to={'/detail/'+ watched[0]}><img src={process.env.PUBLIC_URL + '/img/coffee' + (watched[0] + 1) + '.webp'} width="80%" alt='i' /></Link>
}

export default OffCanvas;