
import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Header from './components/Header/Header';

import Card from './components/ProductCard/Card';
import Footer from './components/Footer/Footer';
import Links from './components/TypeLinks/Links';
import { useState } from 'react';
import Cart from './components/Cart/Cart';
import { jwtDecode } from 'jwt-decode';



function App() {



  let userdata = () => {

    let token = localStorage.getItem('token')
    if (token === null) {
      return null
    }
    else {
      let data = jwtDecode(token)
      return data
    }
  }

  let [user, setuser] = useState(userdata());
  const [cart, setcart] = useState([]);
  return (

    <div className='body container-fluid col-12 g-0'>
      <Header cart={cart} setcart={setcart} user={user} />

      <Routes>
        <Route path='/' element={<Homepage cart={cart} setcart={setcart} user={user} />} />
        <Route path='card/:id' element={<Card cart={cart} setcart={setcart} user={user} />} />
        <Route path='link/:type' element={<Links cart={cart} setcart={setcart} user={user} />} />
        <Route path='/cart/' element={<Cart cart={cart} setcart={setcart} user={user} />} />

      </Routes>
      <Footer />

    </div>

  );
}

export default App;
