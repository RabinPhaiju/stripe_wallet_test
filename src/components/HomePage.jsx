import React,{useContext,useRef,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./context/UserState";

const HomePage = () => {
  let navigate = useNavigate();
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const price = [5,10,15,20,25,30,35,40,45,50]
  const { user,updateprice,addUser,setUser} = useContext(UserContext);

  const handleClick = ()=>{
    if(user?.price>0){
      navigate('/checkout');
    }
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    let username = nameRef.current.value;
    let email = emailRef.current.value;
    let price = 0;
    addUser({username,email,price})
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/user", {
      method: "GET",
    }).then((res) => res.json()).then((data) => setUser(data[0]))
  }, []);

  return (
    <div>
    <div className='py-1'>
      {
        user?.username?<div>
        <span> <h4 className='p-0 d-inline'>{user.username}</h4> balance: {user.amount}</span>
      </div>:
      <div>
        <form onSubmit={handleSubmit}>
        <section className='m-1'>
          <label>name:</label>
          <input ref={nameRef} type="text" placeholder='enter usename' />
        </section>
        <section className='m-1'>
          <label>email :</label>
          <input ref={emailRef} type="email" placeholder='enter email' />
        </section>
        <section className='ms-5'>
          <button type='submit' className='m-0 w-50'>Submit</button>
        </section>
        </form>
      </div>
      }
    </div>
    <span>Select price to continue</span>
    <div className='d-flex gap-2'>
      {
        price.map(item=>{
          return <div className='btn btn-primary' onClick={()=>updateprice(item)} key={item} >{item}</div>
        })
      }
    </div>
      <div className='pt-4'><span className={`btn btn-${user?.price>0?'success':'secondary'}`} onClick={handleClick}>Checkout</span> price: {user.price}</div>
    </div>
  )
}

export default HomePage