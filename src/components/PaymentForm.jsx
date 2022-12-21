import React,{useState} from 'react'
import { CardElement,useElements,useStripe } from '@stripe/react-stripe-js'
import { useNavigate } from 'react-router-dom'

const CARD_OPTIONS = {
    iconStyle:"solid",
    style:{
        base:{
            iconColor:"#c4f0ff",
            color:"#000",
            fontWeight:500,
            fontFamily:"sans-serif",
            fontSize:'16px',
            fontSmoothing:"antialiased",
        },
        invalid:{
            iconColor:"#ffc7ee",
            color:"#ffc7ee"
        }
    }
}

function PaymentForm({clientSecret,user}) {
    let navigate = useNavigate();
    const [success,setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details:{
                email:user.email
              }
            }
          });

    if(result.error){
        console.log(result.error.message)
    }else{
        if(result.paymentIntent.status === 'succeeded'){
            setSuccess(true)
            setTimeout( navigate('/'),2000)
        }
    }
    }

  return (
    <>
        {!success?
            <form onSubmit={handleSubmit}>
                <fieldset className='FormGroup'>
                    <div className='FormRow'>
                        <CardElement options={CARD_OPTIONS}/>
                    </div>
                </fieldset>
                <button>Pay</button>
            </form>:
            <div>
                <h2>Your payment is success...</h2>
            </div>
        }
    </>
  )
}

export default PaymentForm