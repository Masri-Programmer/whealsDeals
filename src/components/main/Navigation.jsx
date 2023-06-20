import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { logo } from '@images'
import '../../assets/images/lord-icon-2.1.0'
import { ModalAccount, UserTooltip } from '@index'
import styles from '@style';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { setShowModal } from '@slices';
import { useDispatch, useSelector } from 'react-redux';

const Navigation = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  const data = useSelector((state) => state.cars.cart);
  const boxDataLength = data?.length;

  return (
    <Navbar expand="md" className="h-[50px] !fixed align-content-center  align-middle w-100  !z-10">
      < Container fluid className='!bg-gray-800' >
        <Navbar.Brand as={Link} to={"/"}>
          <img
            src={logo}
            width="80"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Offcanvas
          placement="end"
        >
          <Offcanvas.Header closeButton className='!bg-gray-900'>
            <Offcanvas.Title className='font-mono text-white'>
              WheelsDeals
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className='!bg-gray-800'>
            <Nav className="justify-content-start flex-grow-1 d-flex items-center pe-3 me-auto">
              <Nav.Link as={Link} to={"/"} className={`${styles.nav_link}`}>Home</Nav.Link>
              <Nav.Link as={Link} to={"/buy"} className={`${styles.nav_link}`}>Buy</Nav.Link>
              <Nav.Link as={Link} to={"/rent"} className={`${styles.nav_link}`}>Rent</Nav.Link>
              <Nav.Link as={Link} to={"/about"} className={`${styles.nav_link}`}>About</Nav.Link>
              <Nav.Link as={Link} to={"/blog"} className={`${styles.nav_link}`}>Blog</Nav.Link>
              {isLoggedIn ? <Nav.Link as={Link} to={"/sell"} className={`${styles.nav_link}`}>Sell</Nav.Link> :
                <Nav.Link onClick={() => dispatch(setShowModal())} className={`${styles.nav_link}`}>Sell</Nav.Link>}
              <Nav className="justify-content-end  flex-grow-1 pe-3 me-auto">
                {!isLoggedIn ? (
                  <Nav.Link className={`${styles.button} m-0`}><button onClick={() => dispatch(setShowModal())}> Login</button></Nav.Link>
                ) : (<UserTooltip />)}
                <Nav.Link as={Link} to={"/whish-list"} className={`${styles.nav_link} d-flex justify-center align-middle flex-wrap align-items-center`}>
                  <div className="position-relative">
                    <AiOutlineShoppingCart className='fs-2 mx-2 align-items-center' />
                    {boxDataLength !== 0 && (<span className={`position-absolute top-0 end-0 purple-100 rounded-circle ms-1 bg-danger px-1`}>{boxDataLength}</span>)}
                  </div>
                </Nav.Link>
              </Nav>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container >
      <ModalAccount />
    </Navbar >
  );
}

export default Navigation