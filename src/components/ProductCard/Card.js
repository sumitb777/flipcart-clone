import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from '../Footer/Footer';


const Card = ({ cart, setcart }) => {

  const { id } = useParams();
  const [typedata, settypedata] = useState([]);
  const [amounts, setamount] = useState(0)


  const getcarddata = async () => {
    try {
      let url = `http://localhost:3030/get-product-by-id/${id}`;
      let response = await fetch(url, { method: 'GET' });
      let data = await response.json()
      settypedata(data.result)


      console.log(typedata)
      // console.log(amount)


    } catch (error) {
      alert("server error")
    }
    // console.log(typedata)
  }

  const addtocart = (item => {

    setcart([...cart, item])
    console.log("cart" + cart)
    toast.success("Item added on cart", {
      position: "top-right",
      autoClose: 1500,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,

    });


  })
  const total = (v) => {
    setamount(v.price[0])
    console.log(amounts)
  }

  let makePayment = async () => {
    let url = 'http://localhost:3030/get-order-id';
    let { data } = await axios.post(url, { amount: amounts });
    let { order } = data;


    var options = {
      key: "rzp_test_RB0WElnRLezVJ5", // Enter the Key ID generated from the Dashboard
      amount: amounts * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "flipcart Clone ",
      description: "Make Payment to get orders",
      image: "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo-700x394.png",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {

        try {


          let sendData = {
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
            order: [1]
          };
          let url = 'http://localhost:3030/confirmPayment'
          let { data } = await axios.post(url, sendData)
          if (data.status === true) {
            alert("Payment done successfully, order saved");
            window.location.assign("/");
          } else {
            alert("Payment fail");
          }


        } catch (error) {
          console.log(error)
        }


      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };



  useEffect(() => {
    getcarddata()



  }, [])
  // console.log(cart)



  return (
    <div className=' '>


      <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClickrtl={false}
        pauseOnFocusLoss pauseOnHover
      />
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Details</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label htmlFor="exampleFormControlInput1" class="form-label">Name</label>
                <input type="name" class="form-control" id="exampleFormControlInput1"
                  placeholder="abc" />
              </div>
              <div class="mb-3">
                <label htmlFor="exampleFormControlInput1" class="form-label">Contact</label>
                <input type="number" class="form-control" id="exampleFormControlInput1"
                  placeholder="832955****" />
              </div>
              <div class="mb-3">
                <label htmlFor="exampleFormControlInput1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleFormControlInput1"
                  placeholder="name@example.com" />
              </div>
              <div class="mb-3">
                <label htmlFor="exampleFormControlTextarea1" class="form-label">Adrress</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={makePayment}>MakePayment</button>
            </div>
          </div>
        </div>
      </div>


      <div className=''>
        <div className=' col-12 '>


          {/* model htmlFor payments */}



          {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  Launch static backdrop modal
                 </button> */}

          {/* <!-- Modal --> */}




          {typedata.map((value) => {

            return (



              <div className=' container-fluid d-flex flex-md-row flex-column col-12   px-md-5 bg-body-secondary mt-1  position-relative '
                key={value.id}>
                <div className='productimg col-md-5 col-12  p-md-4 bg-white border d-flex flex-column align-items-center   position-sticky  '>
                  <img className='productimage text-center img-fluid mt-md-3 mt-1 '
                    src={`/images/products/${[value.img]}`} alt='' />
                  <div className='d-flex col-12 gap-2 mt-md-5 ms-md-4 flex-column flex-md-row   '>

                    <div type='button' className='col-md-6  btn btn-lg
                         btn-warning rounded-0  d-flex justify-content-center align-items-center '
                      id="liveToastBtn" onClick={() => addtocart(value)}
                    >
                      <p className='text-center  mt-2 '>Add To Cart</p>
                    </div>


                    <div className='col-md-6 btn btn-lg rounded-0  buybutton d-flex justify-content-center align-items-center'>
                      <p className=' text-center mt-2 ' data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={() => total(value)}>Buy</p>
                    </div>
                  </div>
                </div>


                <div className='productd col-md-7 col-12  bg-white  '>

                  <div className='ms-md-4 mt-md-3 px-md-0 px-2'>
                    <div className=''>
                      <p className='text-black-50 '>Home {'>'} {value.product_type} {'>'} {value.name} </p>
                    </div>
                    <div className=''>
                      <p className='h3 '> {value.short_des} </p>
                    </div>

                    <div className='d-flex align-items-center mt-2  '>
                      <p className='h6 card-title text-white py-0 px-2 bg-success bg-gradient rating '>{value.rating[0]}
                        <img className='ratingstar pb-1' src='/images/star.svg' alt='' /> </p>
                      <p className='mt-2 ms-2 '> {'('}{value.rating[1]}{')'} Ratings</p>
                    </div>
                    <div className='d-flex gap-1 align-items-center '>
                      <p className='h5 card-title '>₹{value.price[0].toLocaleString()}</p>
                      <p className='h6 card-title text-d text-decoration-line-through  text-secondary'>
                        ₹{value.price[1].toLocaleString()}</p>
                      <p className='h6 card-title text-success  '>{value.price[2]}</p>
                    </div>
                    <div className='mt-3'>
                      <p className='h5 '>Available offers </p>
                      <p className=' '><img className=' offerimg' src='/images/offer.webp' alt='' />
                        Bank Offer10% off on Axis Bank Credit Card EMI Transactions, up to ₹1,500 on orders
                        of ₹5,000 and aboveT&C</p>
                      <p className=' '><img className=' offerimg' src='/images/offer.webp' alt='' />
                        Bank Offer10% off on Flipkart Axis Bank Credit Card EMI Transactions,up to
                        ₹1500 on orders of ₹5000 and aboveT&C </p>
                      <p className=' '><img className=' offerimg' src='/images/offer.webp' alt='' />
                        Bank Offer10% off on Citi Credit Card EMI Transactions, up to ₹1,500 on orders of
                        ₹5,000 and aboveT&C </p>
                      <p className=' '><img className=' offerimg' src='/images/offer.webp' alt='' />
                        Buy htmlFor 150 get ₹100 off your Next BuyT&C </p>

                    </div>
                    <div className='mt-3  d-flex '>
                      <div className='bg-white  p-2 '>
                        <img className='p-img' src={`/images/products/${[value.pimg]}`} alt='' />
                      </div>

                      <p className='p-2 '> {value.warranty} </p>
                    </div>

                    <div className='mt-3  d-flex  '>
                      <div className='bg-white  p-2 me-5  '>
                        <p className='p-2 fw-bold text-black-50'> Delivery </p>
                      </div>

                      <div className='bg-white d-flex mt-2 p-2 '>
                        <p className=' fw-semibold text-black  '> Delivery in 7 days | </p>
                        <p className='d-flex text-success '>{' '}Free
                          <p className=' text-decoration-line-through text-black-50 '> ₹40 </p> </p>

                      </div>
                    </div>

                    <div className='mt-3  d-flex  flex-md-row flex-column'>
                      <div className='bg-white  p-2 '>
                        <p className='p-2 fw-bold text-black-50'> Highlights </p>
                      </div>

                      <div className='bg-white d-flex mt-2 p-2 ms-2'>
                        <ul className=' fw-semibold text-black  '>
                          {value.highlights.map((v) => {
                            return (
                              <li>{v}</li>
                            )

                          })}
                        </ul>
                      </div>
                    </div>


                    <div className='mt-3  d-flex flex-md-row flex-column '>
                      <div className='bg-white  p-2 me-5  '>

                        <p className='p-2 fw-bold text-black-50 '> Seller </p>
                      </div>

                      <div className='bg-white  mt-2 pt-2  ms-3'>
                        <div className='d-flex ps-4'>
                          <p className=' fw-semibold text-black  '> TrueComRetail </p>

                        </div>
                        <ul className=' fw-semibold text-black ps-3 '>
                          <li>7 Days Service Center Replacement/Repair?</li>
                          <li>GST invoice available?</li>
                        </ul>

                      </div>
                    </div>

                    <div className='col-5'>
                      <img className='p-img w-100 h-100' src={`/images/supercoin.webp`} alt='' />
                    </div>


                    <div className='mt-3  d-flex flex-md-row flex-column '>
                      <div className='bg-white  p-md-2 '>
                        <p className='p-md-2 fw-bold text-black-50'>Description </p>
                      </div>

                      <div className='bg-white d-flex mt-2 pt-2 '>
                        <p className=' fw-semibold text-black ms-md-4   '> {value.description} </p>


                      </div>
                    </div>

                  </div>

                </div>

              </div>


            )
          })}


        </div >

      </div>

    </div>
  )
}

export default Card