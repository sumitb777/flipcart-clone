import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Links = () => {
  const navigate = useNavigate();
  const { type } = useParams('');
  const [typedata, settypedata] = useState([]);


  const gettypesm = async () => {
    try {
      let url = `http://localhost:3030/get-product-by-type/${type}`;
      let response = await fetch(url, { method: 'GET' });
      let data = await response.json()
      settypedata(data.result)

      console.log(typedata)

    } catch (error) {
      alert("server error")
    }

  }
  useEffect(() => {
    gettypesm()
  }, [])
  // console.log(typedata)

  return (

    <>
      {typedata !== null ? (




        <div className=' d-flex col-md-10 col-12 m-auto  flex-wrap  '>

          {typedata.map((value) => {
            return (
              <div className="card col-md-3 my-4 col-12 m-auto  align-items-center  flex-nowrap   border  border-2
                   justify-content-center btn "
                onClick={() => { navigate(`/card/${value.id}`) }}>
                <img src={`/images/products/${value.img}`} className="card-img-top cardimg" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{value.short_des}</h5>
                  <div className='d-flex align-items-center mt-2'>
                    <p className='h6 card-title py-0 px-2 bg-success bg-gradient  '>4.2
                      <img className='ratingstar' src='/images/star.svg' /> </p>
                    <p>(5,826)</p>
                  </div>
                  <p className="card-text"><div className='d-flex gap-1 '>
                    <p className='h6 card-title '>{value.price[0]}</p>
                    <p className='h6 card-title text-d text-decoration-line-through  text-secondary'>
                      {value.price[1]}</p>
                    <p className='h6 card-title '>{value.price[2]}</p>
                  </div>
                  </p>

                </div>
              </div>

            )
          })}

        </div>






      ) : null}

    </>
  )
}

export default Links