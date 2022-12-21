import React,{useContext,useRef,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./context/UserState";

const Checkout = () => {
  const { user} = useContext(UserContext);
  let navigate = useNavigate();
  const handleClick = ()=>{
    if(user?.price>0){
      navigate('/payment');
    }
  }
  return (
    <div>
      <div className='pt-4'><span className={`btn btn-${user?.price>0?'success':'secondary'}`} onClick={handleClick}>Checkout</span> price: {user.price}</div>
    </div>
  )
}

export default Checkout