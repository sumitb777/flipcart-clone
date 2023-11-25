import React from 'react'
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Row = () => {

  let navigate = useNavigate();
  const [typesm, settypesm] = useState([])
  const [typese, settypese] = useState([])
  const [typesc, settypesc] = useState([])
  const [id, setid] = useState('')

  const gettypesm = async () => {
    try {
      let url = `http://localhost:3030/get-product-by-type/mobile`;
      let response = await fetch(url, { method: 'GET' });
      let data = await response.json()
      settypesm(data.result)

      console.log()

    } catch (error) {
      alert("server error")
    }

  }
  const gettypese = async () => {
    try {
      let url = `http://localhost:3030/get-product-by-type/Electronics`;
      let response = await fetch(url, { method: 'GET' });
      let data = await response.json()
      settypese(data.result)

      console.log()

    } catch (error) {
      alert("server error")
    }

  }
  const gettypesc = async () => {
    try {
      let url = `http://localhost:3030/get-product-by-type/computer`;
      let response = await fetch(url, { method: 'GET' });
      let data = await response.json()
      settypesc(data.result)

      console.log(settypesc)

    } catch (error) {
      alert("server error")
    }

  }

  function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  useEffect(() => {
    gettypesm()
    gettypese()
    gettypesc()

    // console.log(value)
  }, [])

  return (

    <>
      < div className=' '>


        <div className='col-12 mx-md-3 mt-3  '>




          <div id="carouselExample" class="carousel slide">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div className='text-start mx-0 bg-light py-3 btn col-12'
                  onClick={() => { navigate(`card/29`) }}>
                  <img className='w-100' alt='' src='/images/products/acerbig.webp' />
                </div>
              </div>
              <div class="carousel-item">
                <div className='text-start mx-0 bg-light py-3 btn col-12'
                  onClick={() => { navigate(`card/30`) }}>
                  <img className='w-100' alt='' src='/images/products/ac-big.webp' />
                </div>
              </div>
              <div class="carousel-item">
                <div className='text-start mx-0 bg-light py-3 btn col-12'
                >
                  <img className='w-100' alt='' src='/images/products/planebig.webp' />
                </div>
              </div>
              <div class="carousel-item">
                <div className='text-start mx-0 bg-light py-3 btn col-12'
                >
                  <img className='w-100' alt='' src='/images/products/lapbig.webp' />
                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>



          <div className='text-start bg-light p-3  '>
            <h3>Shop Mobiles</h3>
          </div>
          <div className="scrolling-wrapper col-12 w-100 position-relative d-flex gap-3 bg-body-secondary ">

            {typesm.map((value, index) => {
              return (
                <div className='cardbox col-6  col-md-2 card d-flex  align-items-center  flex-nowrap bg-white 
                   border border-primary-subtle  border-2  justify-content-center btn' key={value.id}
                  // onClick={() => { navigate(`/card/${value.id}`) }}
                  onClick={() => { navigate(`card/${value.id}`) }}
                >
                  <img className='card-img-top img-fluid  cardimg pt-md-2 mb-md-3 ' src={`images/products/${value.img}`} alt='' />
                  <p className='h6 card-title mt-1'>{value.name}</p>
                  <div className='d-flex align-items-center mt-2'>
                    <p className='h6 card-title py-0 px-md-2 rating  text-white   '>{value.rating[0]}
                      <img className='ratingstar' src='/images/star.svg' /> </p>
                    <p className='mt-1' >{'('}{numberWithCommas(value.rating[1])}{')'}</p>
                  </div>
                  <div className='d-flex gap-1 '>
                    <p className='h6 card-title '>₹{numberWithCommas(value.price[0])}</p>
                    <p className='h6 card-title text-d text-decoration-line-through  text-secondary'>
                      ₹{numberWithCommas(value.price[1])}</p>
                    <p className='h6 card-title '>{value.price[2]}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className='col-12 mx-3 mt-3  m-auto '>
          <div className='text-start bg-light  p-3   '>
            <h3>Shop Electronics</h3>
          </div>
          <div className="scrolling-wrapper  gap-3  position-relative d-flex bg-body-secondary ">

            {typese.map((value, index) => {

              return (

                <div className='cardbox col-6  col-md-2 card d-flex  accordion border-primary-subtle bg-white
                align-items-center  flex-nowrap  border  border-2 justify-content-center btn ' key={value.id}
                  // onClick={() => { navigate(`/card/${value.id}`) }}
                  onClick={() => { navigate(`card/${value.id}`) }}
                >

                  <img className='card-img-top cardimg ' src={`images/products/${value.img}`} alt='' />
                  <p className='h6 card-title mt-1 '>{value.name}</p>

                  <div className='d-flex align-items-center mt-2  '>
                    <p className='h6 card-title py-0 px-2 rating  text-white '>{value.rating[0]}
                      <img className='ratingstar' src='/images/star.svg' /> </p>
                    <p className='mt-1'>{'('}{value.rating[1]}{')'}</p>
                  </div>
                  <div className='d-flex gap-1 '>
                    <p className='h6 card-title '>₹{numberWithCommas(value.price[0])}</p>
                    <p className='h6 card-title text-d text-decoration-line-through  text-secondary'>
                      ₹{numberWithCommas(value.price[1])}</p>
                    <p className='h6 card-title '>{value.price[2]}</p>
                  </div>



                </div>

              )
            })}
          </div>
        </div>


        <div className='col-12 mx-3 mt-3  m-auto '>
          <div className='text-start my- p-3  bg-light '>
            <h3>Shop Computers </h3>
          </div>
          <div className="scrolling-wrapper  position-relative d-flex  gap-3 bg-body-secondary ">

            {typesc.map((value, index) => {

              return (

                <div className='cardbox col-6  col-md-2 card d-flex  bg-white
                border-primary-subtle  align-items-center  flex-nowrap   border  border-2
                   justify-content-center btn ' key={value.id}
                  // onClick={() => { navigate(`/card/${value.id}`) }}
                  onClick={() => { navigate(`card/${value.id}`) }}
                >

                  <img className='card-img-top cardimg ' src={`images/products/${value.img}`} alt='' />
                  <p className='h6 card-title mt-1  '>{value.name}</p>
                  <div className='d-flex align-items-center mt-2'>
                    <p className='h6 card-title py-0 px-2 rating  text-white'>{value.rating[0]}
                      <img className='ratingstar' src='/images/star.svg' /> </p>
                    <p className='mt-1'>{'('}{value.rating[1]}{')'}</p>
                  </div>
                  <div className='d-flex gap-1 '>
                    <p className='h6 card-title '>₹{numberWithCommas(value.price[0])}</p>
                    <p className='h6 card-title text-d text-decoration-line-through  text-secondary'>
                      ₹{numberWithCommas(value.price[1])}</p>
                    <p className='h6 card-title '>{value.price[2]}</p>
                  </div>


                </div>

              )
            })}
          </div>
        </div>


      </div>
    </>
  )
}

export default Row