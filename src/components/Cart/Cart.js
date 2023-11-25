import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Cart = ({ cart, setcart }) => {
  const [total, settotal] = useState(0)

  const navigate = useNavigate();

  // cart.map((v) => {
  //   return 
  // })

  useEffect(() => {
    let totals = 0

    cart.map((value) => {
      return (totals += value.price[0])
    })
    settotal(totals)

  }, [])

  console.log(total)


  return (
    <div className='h-100' style={{ backgroundColor: 'f1f3f6' }}>

      <div className='col-md-8 col-12 m-auto mt-3  '>

        {cart.map((value, index) => {

          return (

            <div className=' mb-4 btn d-flex border border-2 shadow col-md-10 py-5  bg-white' key={value.id}
              onClick={() => navigate(`/card/${value.id}`)}   >
              <div className='col-3 btn' >

                <img alt='' className='w-50 h-100' src={`/images/products/${value.img}`}></img>

              </div>
              <div className='col-8'>
                <p className='text-start'>{value.short_des}</p>
                <div className='d-flex align-items-center mt-2  '>
                  <p className='h6 card-title text-white py-0 px-2 bg-success bg-gradient rating '>{value.rating[0]}
                    <img className='ratingstar pb-1' src='/images/star.svg' alt='' /> </p>
                  <p className='mt-2 ms-2 '> {'('}{value.rating[1]}{')'} Ratings</p>
                </div>
                <div className='d-flex gap-1 align-items-center '>
                  <p className='h5 card-title '>{value.price[0]}</p>
                  <p className='h6 card-title text-d text-decoration-line-through  text-secondary'>{value.price[1]}</p>
                  <p className='h6 card-title text-success  '>{value.price[2]}</p>
                </div>
                <div>

                </div>

              </div>


            </div>
          )
        })}
      </div>
      <div className='col-md-8 col-12 mb-5  d-flex m-auto   
        justify-content-around '>
        <p className='h4 ms-md-3 '>Total Items In cart = {cart.length}</p>
        <p className='h4 me-md-3'>Total = {total.toLocaleString()}</p>


      </div>

    </div>

  )
}

export default Cart