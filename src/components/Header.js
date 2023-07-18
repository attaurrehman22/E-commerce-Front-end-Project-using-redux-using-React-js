import React,{useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Badge from "@mui/material/Badge";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DLT } from "../redux/actions/action";

const Header = () => {

  const[price,setPrice]=useState(0);
  console.log("price",price)
  const dispatch=useDispatch();

const getdata=useSelector((state)=>state.cartreducer.carts)
console.log("header get data",getdata)

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt=(id)=>
  {
    dispatch(DLT(id))
  }

  const total=()=>
  {
    let price=0;
    getdata.map((ele,k)=>
    {
      price=ele.price*ele.qnty+price
    })
    setPrice(price);
  }

  useEffect(()=>
  {
    total();
  },[total])

  return (
    <Navbar bg="dark" data-bs-theme="light" style={{height:"60px"}}>
      <Container>
        <Nav.Link href="/" className="text-decoration-none text-light">
          Add To Cart
        </Nav.Link>
        <Badge badgeContent={getdata.length} color="primary"
         id="basic-button"
         aria-controls={open ? 'basic-menu' : undefined}
         aria-haspopup="true"
         aria-expanded={open ? 'true' : undefined}
         onClick={handleClick}
        >
          <i
            class="fa-solid fa-cart-plus text-light"
            style={{ fontSize: 25, cursor: "pointer" }}></i>
        </Badge>
      </Container>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

{
  getdata.length ?
  <div className="card_details" style={{width:"24rem",padding:10}}>
    <Table>
       <thead>
        <tr>
          <th>Photo</th>
          <th>REsturant Name</th>
        </tr>
       </thead>
       <tbody>
        {
          getdata.map((e)=>
          {
            return(
              <>
              <tr>
                <td>
                  <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                  <img src={e.imgdata} style={{width:"5rem",height:"5rem"}} alt=""/>
                  </NavLink>
                
                </td>
                <td>
                  <p>{e.rname}</p>
                  <p>Price : ₹  {e.price}</p>
                  <p>Quantity : {e.qnty}</p>
                  <p style={{color:"red",fontSize:20,cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                    <i className="fas fa-trash smalltrash"></i> 
                  </p>
                </td>
                <td className="mt-5" style={{color:"red",fontSize:20,cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                <i className="fas fa-trash largetrash"></i> 
                </td>
              </tr>
              </>
            )
          })
        }
        <p className="text-center"> Total : ₹  {price}</p>
       </tbody>
    </Table>
  </div>:
  <div className="card_details d-flex justify-content-center alighn-items-center" style={{width:"20rem",padding:10,position:"relative"}}>
        <i className="fas fa-close smallclose"
        onClick={handleClose}
        style={{position:"absolute",top:2,right:20,fontSize:23,cursor:"pointer"}}></i>
        <p style={{fontSize:22}}>Your Cart Is Empty</p>
        <img src="./cart.gif" alt="" className="emptycart_img" style={{width:"5rem",padding:10}}/>
       </div>
}


       
      </Menu>
    </Navbar>
  );
};

export default Header;